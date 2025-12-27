export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { fetchPlaceDetails } from "@/lib/googlePlaces";

export async function POST(req, { params }) {
  try {
    const salonId = String(params.id);
    const db = getAdminDb();

    const snap = await db.collection("salons").doc(salonId).get();
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

    const result = await fetchPlaceDetails(placeId);

    const googlePayload = {
      placeId,
      verified: true,
      rating: result?.rating ?? null,
      reviewsCount: result?.user_ratings_total ?? 0,
      phone: result?.formatted_phone_number ?? null,
      website: result?.website ?? null,
      googleMapsUrl: result?.url ?? null,
      lastSyncAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("salons").doc(salonId).set(
      {
        google: googlePayload,
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
