export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";

/* ================= INIT FIREBASE ADMIN ================= */
function initAdmin() {
  if (admin.apps.length) return;

  const cred = process.env.FIREBASE_ADMIN_CREDENTIALS;
  if (!cred) return;

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(cred)),
  });
}

initAdmin();

const db = admin.apps.length ? admin.firestore() : null;

/* ================= GET /api/admin/reviews ================= */
export async function GET(req) {
  try {
    if (!db) {
      return NextResponse.json({ success: true, data: [] });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "pending";

    const snap = await db
      .collection("reviews")
      .where("status", "==", status)
      .get();

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("ADMIN GET reviews error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load admin reviews" },
      { status: 500 }
    );
  }
}
