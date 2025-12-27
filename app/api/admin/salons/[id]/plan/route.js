export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";

/*
POST body:
{
  plan: "free" | "premium" | "sponsored",
  days: 7 | 30 | 90
}
*/

export async function POST(req, { params }) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const { plan, days } = await req.json();
    const salonId = String(params.id);

    if (!["free", "premium", "sponsored"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const now = new Date();
    const expiresAt =
      plan === "free"
        ? null
        : new Date(now.getTime() + Number(days || 30) * 86400000);

    const payload = {
      plan,
      planExpiresAt: expiresAt,
      updatedAt: new Date(),
    };

    await getAdminDb()
      .collection("salons")
      .doc(salonId)
      .set(payload, { merge: true });

    return NextResponse.json({
      success: true,
      payload,
    });
  } catch (err) {
    console.error("[ADMIN PLAN UPDATE]", err);
    return NextResponse.json(
      { error: "Failed to update plan" },
      { status: 500 }
    );
  }
}
