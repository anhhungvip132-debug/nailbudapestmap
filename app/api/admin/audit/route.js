export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";

import { getAdminDb } from "@/lib/firebaseAdmin";
import { checkAdminAuth } from "@/lib/checkAdminAuth";

/* =====================================================
   GET /api/admin/audit
   Read-only – auditLogs (production-ready)
   ===================================================== */
export async function GET(req) {
  const authError = await checkAdminAuth(req);
  if (authError) return authError;

  try {
    const db = getAdminDb();
    const { searchParams } = new URL(req.url);

    const limit = Math.min(
      Number(searchParams.get("limit") || 100),
      100
    );

    const type = searchParams.get("type");       // admin_action | cron | auth
    const action = searchParams.get("action");   // UPDATE_SALON_PLAN, DOWNGRADE_PLANS…
    const adminUid = searchParams.get("adminUid");

    let q = db
      .collection("auditLogs") // ✅ CHUẨN HOÁ COLLECTION
      .orderBy("createdAt", "desc")
      .limit(limit);

    /* ===== FILTER NHẸ (KHÔNG ÉP INDEX) ===== */
    if (type) {
      q = q.where("type", "==", type);
    }

    if (action) {
      q = q.where("action", "==", action);
    }

    if (adminUid) {
      q = q.where("adminUid", "==", adminUid);
    }

    const snap = await q.get();

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    console.error("ADMIN GET audit error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load audit log" },
      { status: 500 }
    );
  }
}
