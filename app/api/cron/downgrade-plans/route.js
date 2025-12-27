// app/api/cron/downgrade-plans/route.js

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { sendAdminEmail } from "@/lib/sendAdminEmail";

/* ================= AUTH ================= */
function isAuthorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const h1 = req.headers.get("x-cron-secret");
  const h2 = req.headers.get("authorization"); // "Bearer <secret>"
  if (h1 && h1 === secret) return true;
  if (h2 && h2 === `Bearer ${secret}`) return true;
  return false;
}

/* ============ HELPERS ============ */
function getUtcDateKey(ts) {
  // YYYY-MM-DD theo UTC để ổn định với Vercel cron (UTC)
  return ts.toDate().toISOString().slice(0, 10);
}

async function commitInChunks(db, updates) {
  const BATCH_LIMIT = 450;
  let committed = 0;

  for (let i = 0; i < updates.length; i += BATCH_LIMIT) {
    const chunk = updates.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();
    for (const u of chunk) batch.update(u.ref, u.data);
    await batch.commit();
    committed += chunk.length;
  }

  return committed;
}

/**
 * Phase 15: Idempotent daily lock
 * - real run: chỉ chạy 1 lần/ngày
 * - có TTL lock để chống chạy song song / retry
 */
async function acquireDailyRunLock(db, runId, nowMs) {
  const ref = db.collection("cronRuns").doc(runId);
  const LOCK_MS = 10 * 60 * 1000; // 10 phút

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (snap.exists) {
      const data = snap.data() || {};
      const status = data.status;
      const lockedUntil = data.lockedUntilMs || 0;

      // Nếu đã chạy thành công hôm nay -> skip
      if (status === "success") {
        throw new Error("CRON_ALREADY_RAN_TODAY");
      }

      // Nếu đang chạy và lock chưa hết hạn -> skip
      if (status === "running" && lockedUntil > nowMs) {
        throw new Error("CRON_LOCKED_RUNNING");
      }

      // Nếu fail hoặc lock hết hạn -> cho phép chạy lại
    }

    tx.set(
      ref,
      {
        status: "running",
        lockedUntilMs: nowMs + LOCK_MS,
        startedAt: admin.firestore.Timestamp.now(),
      },
      { merge: true }
    );
  });

  return ref;
}

async function finalizeDailyRunLock(runRef, patch) {
  try {
    await runRef.set(
      {
        ...patch,
        lockedUntilMs: 0,
        finishedAt: admin.firestore.Timestamp.now(),
      },
      { merge: true }
    );
  } catch (_) {
    // ignore
  }
}

/* ================== GET ================== */
export async function GET(req) {
  const startedAt = Date.now();

  try {
    // Phase 15.2: nếu thiếu CRON_SECRET -> disable hẳn
    if (!process.env.CRON_SECRET) {
      return NextResponse.json(
        { ok: false, disabled: true, error: "Missing CRON_SECRET" },
        { status: 500 }
      );
    }

    if (!isAuthorized(req)) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized (missing/invalid CRON_SECRET)" },
        { status: 401 }
      );
    }

    const db = getAdminDb();
    const nowTs = admin.firestore.Timestamp.now();
    const nowMs = Date.now();

    const { searchParams } = new URL(req.url);
    const dryRun = searchParams.get("dryRun") === "1";

    const dateKey = getUtcDateKey(nowTs);
    const runId = `downgrade-plans_${dateKey}`;

    // Phase 15.1: chỉ lock + idempotent cho REAL RUN
    let runRef = null;
    if (!dryRun) {
      runRef = await acquireDailyRunLock(db, runId, nowMs);
    }

    const updates = [];
    let premiumExpiredCount = 0;
    let sponsoredExpiredCount = 0;

    // 1) PREMIUM hết hạn -> FREE
    // (cần composite index: plan + planExpiresAt, bạn đã tạo rồi)
    {
      const snap = await db
        .collection("salons")
        .where("plan", "==", "premium")
        .where("planExpiresAt", "<=", nowTs)
        .get();

      for (const doc of snap.docs) {
        premiumExpiredCount += 1;
        updates.push({
          ref: doc.ref,
          data: {
            plan: "free",
            planExpiresAt: null,
            "sponsored.enabled": false,
            "sponsored.expiresAt": null,
            updatedAt: nowTs,
          },
        });
      }
    }

    // 2) SPONSORED hết hạn -> tắt sponsored; nếu plan=sponsored thì FREE
    // (cần composite index: sponsored.enabled + sponsored.expiresAt, bạn đã tạo)
    {
      const snap = await db
        .collection("salons")
        .where("sponsored.enabled", "==", true)
        .where("sponsored.expiresAt", "<=", nowTs)
        .get();

      for (const doc of snap.docs) {
        const data = doc.data() || {};
        const currentPlan = data.plan;

        sponsoredExpiredCount += 1;

        const patch = {
          "sponsored.enabled": false,
          "sponsored.expiresAt": null,
          updatedAt: nowTs,
        };

        // nếu đang "sponsored" thì hạ về free
        if (currentPlan === "sponsored") {
          patch.plan = "free";
          patch.planExpiresAt = null;
        }

        updates.push({ ref: doc.ref, data: patch });
      }
    }

    // merge theo doc path để tránh update trùng
    const mergedByPath = new Map();
    for (const u of updates) {
      const key = u.ref.path;
      if (!mergedByPath.has(key)) mergedByPath.set(key, u);
      else {
        const prev = mergedByPath.get(key);
        mergedByPath.set(key, { ref: prev.ref, data: { ...prev.data, ...u.data } });
      }
    }
    const merged = Array.from(mergedByPath.values());

    let committed = 0;
    if (!dryRun && merged.length) {
      committed = await commitInChunks(db, merged);
    }

    // Phase 15: chỉ gửi email khi REAL RUN và có update
    if (!dryRun && committed > 0) {
      await sendAdminEmail({
        subject: `⚠️ ${committed} salons downgraded (${dateKey})`,
        html: `
          <h2>Cron Downgrade Plans</h2>
          <p><b>Date (UTC):</b> ${dateKey}</p>
          <p><b>Premium expired:</b> ${premiumExpiredCount}</p>
          <p><b>Sponsored expired:</b> ${sponsoredExpiredCount}</p>
          <p><b>Updated docs:</b> ${committed}</p>
          <p>Open admin cron log: <a href="https://nailbudapestmap.com/admin/cron">/admin/cron</a></p>
        `,
      });
    }

    // luôn ghi cronLogs để UI đọc
    await db.collection("cronLogs").add({
      type: "downgrade-plans",
      runId: dryRun ? `dry_${runId}_${nowMs}` : runId,
      dateKey,
      at: nowTs,
      dryRun,
      ok: true,
      found: {
        premiumExpired: premiumExpiredCount,
        sponsoredExpired: sponsoredExpiredCount,
      },
      updatedDocs: dryRun ? 0 : committed,
      durationMs: Date.now() - startedAt,
    });

    // finalize lock cho REAL RUN
    if (!dryRun && runRef) {
      await finalizeDailyRunLock(runRef, {
        status: "success",
        ok: true,
        found: {
          premiumExpired: premiumExpiredCount,
          sponsoredExpired: sponsoredExpiredCount,
        },
        updatedDocs: committed,
        dateKey,
      });
    }

    return NextResponse.json({
      ok: true,
      dryRun,
      dateKey,
      found: {
        premiumExpired: premiumExpiredCount,
        sponsoredExpired: sponsoredExpiredCount,
      },
      updatedDocs: dryRun ? 0 : committed,
      durationMs: Date.now() - startedAt,
    });
  } catch (err) {
    const message = err?.message || String(err);

    // Phase 15: Nếu đã chạy hôm nay hoặc đang lock -> trả ok:true (skip) để Vercel không retry vô ích
    if (message === "CRON_ALREADY_RAN_TODAY") {
      return NextResponse.json({ ok: true, skipped: "already_ran_today" });
    }
    if (message === "CRON_LOCKED_RUNNING") {
      return NextResponse.json({ ok: true, skipped: "locked_running" });
    }

    // ghi log lỗi (best effort)
    try {
      const db = getAdminDb();
      await db.collection("cronLogs").add({
        type: "downgrade-plans",
        at: admin.firestore.Timestamp.now(),
        dryRun: false,
        ok: false,
        error: message,
        durationMs: Date.now() - startedAt,
      });
    } catch (_) {}

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
