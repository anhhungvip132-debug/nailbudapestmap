export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { checkAdminAuth } from "@/lib/checkAdminAuth";

/* ================= GET /api/admin/reviews ================= */
export async function GET(req) {
  const authError = await checkAdminAuth(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "pending";

    const db = getAdminDb();

    const snap = await db
      .collection("reviews")
      .where("status", "==", status)
      .orderBy("createdAt", "desc")
      .get();

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("ADMIN GET reviews error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load reviews" },
      { status: 500 }
    );
  }
}
