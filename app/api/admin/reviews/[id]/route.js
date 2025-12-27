export const runtime = "nodejs";

import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { requireAdmin } from "@/lib/adminAuth";
import { writeAuditLog } from "@/lib/auditLog";

/* ================= INIT FIREBASE ADMIN ================= */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
    ),
  });
}

const db = admin.firestore();

/* ================= PATCH /api/admin/reviews/:id ================= */
export async function PATCH(req, { params }) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const { status } = await req.json();

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const ref = db.collection("reviews").doc(params.id);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { success: false, error: "Review not found" },
        { status: 404 }
      );
    }

    await ref.update({
      status,
      reviewedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 🔐 AUDIT LOG
    await writeAuditLog({
      uid: auth.uid,
      action: `review_${status}`,
      targetId: params.id,
      meta: {
        rating: snap.data().rating,
        salonId: snap.data().salonId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ADMIN PATCH review error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update review" },
      { status: 500 }
    );
  }
}
