export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";
import {
  sendAdminBookingEmail,
  sendUserBookingEmail,
} from "@/lib/email";

/* ================= INIT ADMIN ================= */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
    ),
  });
}

const db = admin.firestore();

/* ================= HELPER ================= */
function sortByCreatedAtDesc(a, b) {
  const aSec = a?.createdAt?.seconds ?? 0;
  const bSec = b?.createdAt?.seconds ?? 0;
  return bSec - aSec;
}

/* ================= GET ================= */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");
    const email = searchParams.get("email");

    let ref = db.collection("bookings");

    if (salonId) ref = ref.where("salonId", "==", String(salonId));
    if (email) ref = ref.where("email", "==", String(email));

    const snap = await ref.get();

    const data = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort(sortByCreatedAtDesc);

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}

/* ================= POST ================= */
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      salonId,
      name,
      phone = "",
      email = "",
      date,
      time,
      service = "",
      note = "",
    } = body || {};

    if (!salonId || !name || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ===== CHECK PREMIUM ===== */
    const salonSnap = await db
      .collection("salons")
      .doc(String(salonId))
      .get();

    const isPremium =
      salonSnap.exists && salonSnap.data()?.premium === true;

    const bookingData = {
      salonId: String(salonId),
      name,
      phone,
      email,
      date,
      time,
      service,
      note,
      status: "pending",
      priority: isPremium ? 1 : 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const ref = await db.collection("bookings").add(bookingData);

    sendAdminBookingEmail(bookingData).catch(() => {});
    sendUserBookingEmail(bookingData).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        id: ref.id,
        priority: bookingData.priority,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
