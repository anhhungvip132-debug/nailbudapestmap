export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";

import { getAdminDb } from "@/lib/firebaseAdmin";
import { checkAdminAuth } from "@/lib/checkAdminAuth";
import { calculatePlanUpdate } from "@/lib/planUtils";
import { writeAuditLog } from "@/lib/auditLog";

/* =====================================================
   GET /api/admin/salons/[id]
   ===================================================== */
export async function GET(req, { params }) {
  const authError = await checkAdminAuth(req);
  if (authError) return authError;

  try {
    const salonId = String(params.id);
    const db = getAdminDb();

    const snap = await db.collection("salons").doc(salonId).get();

    if (!snap.exists) {
      return NextResponse.json(
        { error: "Salon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: snap.id,
      ...snap.data(),
    });
  } catch (err) {
    console.error("GET salon error:", err);
    return NextResponse.json(
      { error: "Failed to load salon" },
      { status: 500 }
    );
  }
}

/* =====================================================
   POST /api/admin/salons/[id]
   → Update / extend plan + AUDIT
   ===================================================== */
export async function POST(req, { params }) {
  const auth = await checkAdminAuth(req);
  if (auth) return auth;

  try {
    const salonId = String(params.id);
    const { plan, days = 30 } = await req.json();

    if (!["free", "premium", "sponsored"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    const ref = db.collection("salons").doc(salonId);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { error: "Salon not found" },
        { status: 404 }
      );
    }

    const data = snap.data() || {};

    /* ================= PLAN CALC (GIỮ NGUYÊN) ================= */
    const result = calculatePlanUpdate({
      currentPlan: (data.plan || "free").toUpperCase(),
      currentExpiry: data.planExpiresAt || null,
      nextPlan: plan.toUpperCase(),
      days,
    });

    const nowTs = admin.firestore.Timestamp.now();

    const patch = {
      plan: result.plan.toLowerCase(),
      planExpiresAt: result.expiresAt || null,
      sponsored:
        result.plan === "SPONSORED"
          ? {
              enabled: true,
              expiresAt: result.expiresAt,
            }
          : {
              enabled: false,
              expiresAt: null,
            },
      updatedAt: nowTs,
    };

    await ref.set(patch, { merge: true });

    /* ================= AUDIT LOG (SAU KHI OK) ================= */
    await writeAuditLog({
      type: "admin_action",
      action: "UPDATE_SALON_PLAN",
      admin: {
        uid: auth?.uid || null,
        email: auth?.email || null,
      },
      target: {
        collection: "salons",
        id: salonId,
      },
      meta: {
        before: {
          plan: data.plan || "free",
          expiresAt: data.planExpiresAt || null,
        },
        after: {
          plan: patch.plan,
          expiresAt: patch.planExpiresAt,
        },
        days,
        action: result.action,
      },
      req,
    });

    return NextResponse.json({ ok: true, ...patch });
  } catch (err) {
    console.error("POST salon update error:", err);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}
