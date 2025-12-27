export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GOOGLE_MAPS_API_KEY" },
        { status: 500 }
      );
    }

    const db = getAdminDb();
    const snap = await db.collection("salons").get();

    let updated = 0;

    for (const doc of snap.docs) {
      const data = doc.data();
      const placeId = data?.google?.placeId;
      if (!placeId) continue;

      const fields = "rating,user_ratings_total";
      const url =
        `https://maps.googleapis.com/maps/api/place/details/json` +
        `?place_id=${placeId}&fields=${fields}&key=${apiKey}`;

      const res = await fetch(url);
      const json = await res.json();
      if (json.status !== "OK") continue;

      await doc.ref.set(
        {
          google: {
            ...data.google,
            rating: json.result.rating ?? null,
            reviewsCount: json.result.user_ratings_total ?? 0,
          },
          updatedAt: new Date(),
        },
        { merge: true }
      );

      updated++;
    }

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error("[CRON GOOGLE]", err);
    return NextResponse.json(
      { error: "Sync failed" },
      { status: 500 }
    );
  }
}
