export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";

/* ================= INIT FIREBASE ADMIN ================= */
function initAdmin() {
  if (admin.apps.length) return;

  const cred = process.env.FIREBASE_ADMIN_CREDENTIALS;
  if (!cred) {
    console.warn("⚠️ FIREBASE_ADMIN_CREDENTIALS missing");
    return;
  }

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(cred)),
  });
}

initAdmin();

const db = admin.apps.length ? admin.firestore() : null;

/* ================= PATCH /api/admin/reviews/[id] ================= */
export async function PATCH(req, { params }) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: "DB not ready" },
        { status: 500 }
      );
    }

    const { id } = params;
    const { status } = await req.json();

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    await db.collection("reviews").doc(id).update({
      status,
      reviewedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, id, status });
  } catch (err) {
    console.error("ADMIN PATCH review error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update review" },
      { status: 500 }
    );
  }
}
