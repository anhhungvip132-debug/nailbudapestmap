export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const { salonId, placeId } = await req.json();

    if (!salonId || !placeId) {
      return NextResponse.json(
        { error: "Missing salonId or placeId" },
        { status: 400 }
      );
    }

    const db = getAdminDb();

    await db.collection("events").add({
      type: "google_review_click",
      salonId: String(salonId),
      placeId,
      createdAt: new Date(),
      userAgent: req.headers.get("user-agent"),
      referer: req.headers.get("referer"),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Tracking failed" },
      { status: 500 }
    );
  }
}
