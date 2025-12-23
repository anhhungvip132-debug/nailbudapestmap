export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import admin from "firebase-admin";

/* ================= INIT FIREBASE ADMIN ================= */
function initAdmin() {
  if (admin.apps.length) return;

  const cred = process.env.FIREBASE_ADMIN_CREDENTIALS;

  if (!cred) {
    console.warn("⚠️ FIREBASE_ADMIN_CREDENTIALS missing – skip init");
    return;
  }

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(cred)),
  });
}

initAdmin();

const db = admin.apps.length ? admin.firestore() : null;

/* ================= GET /api/admin/bookings ================= */
export async function GET(req) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: true, data: [] },
        { status: 200 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let ref = db.collection("bookings");

    if (status) {
      ref = ref.where("status", "==", status);
    }

    const snap = await ref.get();

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("ADMIN GET bookings error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}
