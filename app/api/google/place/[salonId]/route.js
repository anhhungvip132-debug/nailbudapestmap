export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function GET(req, { params }) {
  try {
    const salonId = String(params.salonId);
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GOOGLE_MAPS_API_KEY" },
        { status: 500 }
      );
    }

    const db = getAdminDb();
    const ref = db.collection("salons").doc(salonId);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { error: "Salon not found" },
        { status: 404 }
      );
    }

    const placeId = snap.data()?.google?.placeId;
    if (!placeId) {
      return NextResponse.json(
        { error: "Missing google.placeId" },
        { status: 400 }
      );
    }

    const fields = "name,rating,user_ratings_total,formatted_address";
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}&fields=${fields}&key=${apiKey}`;

    const res = await fetch(url);
    const json = await res.json();

    if (json.status !== "OK") {
      return NextResponse.json(
        { error: "Google API error", detail: json.status },
        { status: 500 }
      );
    }

    await ref.set(
      {
        google: {
          ...snap.data().google,
          rating: json.result.rating ?? null,
          reviewsCount: json.result.user_ratings_total ?? 0,
          verified: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
