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

/* =====================================================
   GET /api/reviews?salonId=1
   → CHỈ TRẢ REVIEW ĐÃ APPROVED
   ===================================================== */
export async function GET(req) {
  try {
    if (!db) {
      return NextResponse.json({ success: true, data: [] });
    }

    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");

    if (!salonId) {
      return NextResponse.json({ success: true, data: [] });
    }

    const snap = await db
      .collection("reviews")
      .where("salonId", "==", String(salonId))
      .where("status", "==", "approved")
      .get();

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("GET /api/reviews error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load reviews" },
      { status: 500 }
    );
  }
}

/* =====================================================
   POST /api/reviews
   → USER TẠO REVIEW (pending)
   ===================================================== */
export async function POST(req) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: "DB not ready" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const salonId = String(body?.salonId || "");
    const rating = Number(body?.rating ?? 5);
    const comment = String(body?.comment ?? "").trim();

    if (!salonId || !comment) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const ref = await db.collection("reviews").add({
      salonId,
      rating,
      comment,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, id: ref.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/reviews error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save review" },
      { status: 500 }
    );
  }
}
