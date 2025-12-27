export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { checkAdminAuth } from "@/lib/checkAdminAuth";

/* ================= GET /api/admin/bookings ================= */
export async function GET(req) {
  const authError = await checkAdminAuth(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const db = getAdminDb();
    let ref = db.collection("bookings");

    if (status) {
      ref = ref.where("status", "==", status);
    }

    const snap = await ref.get();

    const data = snap.docs.map((d) => {
      const b = d.data();

      return {
        id: d.id,
        ...b,

        // 🔁 NORMALIZE STATUS (OLD DATA SAFE)
        status:
          b.status === "confirmed"
            ? "approved"
            : b.status === "cancelled"
            ? "rejected"
            : b.status,
      };
    });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("ADMIN GET bookings error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}
