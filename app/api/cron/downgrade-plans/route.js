export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";

import { getAdminDb } from "@/lib/firebaseAdmin";
import { isPlanExpired } from "@/lib/planUtils";
import { sendAdminEmail } from "@/lib/sendAdminEmail";
import { writeAuditLog } from "@/lib/auditLog";

/* ================= AUTH ================= */
function isAuthorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const h1 = req.headers.get("x-cron-secret");
  const h2 = req.headers.get("authorization"); // Bearer <secret>

  if (h1 && h1 === secret) return true;
  if (h2 && h2 === `Bearer ${secret}`) return true;

  return false;
}

/* ================= HELPERS ================= */

// YYYY-MM-DD (UTC)
function getUtcDateKey(ts) {
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
 * Phase 15 – Idempotent daily lock
 */
async function acquireDailyRunLock(db, runId, nowMs) {
  const ref = db.collection("cronRuns").doc(runId);
  const LOCK_MS = 10 * 60 * 1000;

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (snap.exists) {
      const data = snap.data() || {};
      if (data.status === "success") {
        throw new Error("CRON_ALREADY_RAN_TODAY");
      }
      if (data.status === "running" && data.lockedUntilMs > nowMs) {
        throw new Error("CRON_LOCKED_RUNNING");
      }
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
  } catch (_) {}
}

/* ================= GET ================= */
export async function GET(req) {
  const startedAt = Date.now();

  try {
    if (!process.env.CRON_SECRET) {
      return NextResponse.json(
        { ok: false, disabled: true, error: "Missing CRON_SECRET" },
        { status: 500 }
      );
    }

    if (!isAuthorized(req)) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
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

    let runRef = null;
    if (!dryRun) {
      runRef = await acquireDailyRunLock(db, runId, nowMs);
    }

    const updates = [];
    let premiumExpired = 0;
    let sponsoredExpired = 0;

    const snap = await db
      .collection("salons")
      .where("plan", "in", ["PREMIUM", "SPONSORED"])
      .get();

    for (const doc of snap.docs) {
      const data = doc.data() || {};
      if (!isPlanExpired(data.planExpiresAt)) continue;

      if (data.plan === "PREMIUM") premiumExpired++;
      if (data.plan === "SPONSORED") sponsoredExpired++;

      updates.push({
        ref: doc.ref,
        data: {
          plan: "FREE",
          planExpiresAt: null,
          "sponsored.enabled": false,
          "sponsored.expiresAt": null,
          updatedAt: nowTs,
        },
      });
    }

    const merged = Array.from(
      new Map(updates.map((u) => [u.ref.path, u])).values()
    );

    let committed = 0;
    if (!dryRun && merged.length) {
      committed = await commitInChunks(db, merged);
    }

    if (!dryRun && committed > 0) {
      await sendAdminEmail({
        subject: `⚠️ ${committed} salons downgraded (${dateKey})`,
        html: `
          <h2>Cron – Downgrade Plans</h2>
          <p><b>Date (UTC):</b> ${dateKey}</p>
          <p><b>Premium expired:</b> ${premiumExpired}</p>
          <p><b>Sponsored expired:</b> ${sponsoredExpired}</p>
          <p><b>Updated docs:</b> ${committed}</p>
          <p><a href="https://nailbudapestmap.com/admin/cron">Open admin cron</a></p>
        `,
      });
    }

    /* ================= AUDIT LOG ================= */
    await writeAuditLog({
      type: "cron",
      action: "DOWNGRADE_PLANS",
      target: { collection: "salons", id: "bulk" },
      meta: {
        dryRun,
        premiumExpired,
        sponsoredExpired,
        committed,
        dateKey,
      },
      req,
    });

    if (!dryRun && runRef) {
      await finalizeDailyRunLock(runRef, {
        status: "success",
        ok: true,
        committed,
        dateKey,
      });
    }

    return NextResponse.json({
      ok: true,
      dryRun,
      dateKey,
      found: { premiumExpired, sponsoredExpired },
      updatedDocs: dryRun ? 0 : committed,
      durationMs: Date.now() - startedAt,
    });
  } catch (err) {
    const message = err?.message || String(err);

    if (message === "CRON_ALREADY_RAN_TODAY") {
      return NextResponse.json({ ok: true, skipped: "already_ran_today" });
    }
    if (message === "CRON_LOCKED_RUNNING") {
      return NextResponse.json({ ok: true, skipped: "locked_running" });
    }

    try {
      const db = getAdminDb();
      await db.collection("cronLogs").add({
        type: "DOWNGRADE_PLANS",
        at: admin.firestore.Timestamp.now(),
        ok: false,
        error: message,
      });
    } catch (_) {}

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
