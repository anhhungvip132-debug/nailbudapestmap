export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";
import {
  sendBookingApprovedEmail,
  sendBookingRejectedEmail,
} from "@/lib/email";

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

/* ================= PATCH /api/admin/bookings/[id] ================= */
export async function PATCH(req, { params }) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: "DB not initialized" },
        { status: 500 }
      );
    }

    const { id } = params;
    const body = await req.json();
    const { status } = body;

    console.log("🛠 ADMIN PATCH booking:", id, status);

    /* 🔁 NORMALIZE STATUS (UI → DB) */
    const normalizedStatus =
      status === "confirmed"
        ? "approved"
        : status === "cancelled"
        ? "rejected"
        : status;

    if (!["approved", "rejected"].includes(normalizedStatus)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const ref = db.collection("bookings").doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    const booking = snap.data();

    /* 🚫 TRÁNH UPDATE TRÙNG */
    if (booking.status === normalizedStatus) {
      return NextResponse.json({
        success: true,
        id,
        status: normalizedStatus,
        message: "Status already updated",
      });
    }

    /* ✅ UPDATE FIRESTORE */
    await ref.update({
      status: normalizedStatus,
      reviewedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const updatedBooking = {
      ...booking,
      status: normalizedStatus,
    };

    /* 📧 SEND EMAIL USER */
    if (!updatedBooking.email) {
      console.warn("⚠️ No customer email → skip sending email");
    } else {
      if (normalizedStatus === "approved") {
        console.log("📧 Send APPROVED email →", updatedBooking.email);
        await sendBookingApprovedEmail(updatedBooking);
      }

      if (normalizedStatus === "rejected") {
        console.log("📧 Send REJECTED email →", updatedBooking.email);
        await sendBookingRejectedEmail(updatedBooking);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      status: normalizedStatus,
    });
  } catch (err) {
    console.error("❌ PATCH /api/admin/bookings ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
