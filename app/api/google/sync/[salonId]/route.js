// app/api/google/sync/[salonId]/route.js

import { NextResponse } from "next/server";
import admin from "firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ================= INIT ADMIN ================= */
function initAdmin() {
  if (admin.apps.length) return;

  const cred = process.env.FIREBASE_ADMIN_CREDENTIALS;
  if (!cred) throw new Error("Missing FIREBASE_ADMIN_CREDENTIALS");

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(cred)),
  });
}

function bad(msg, status = 400, extra = {}) {
  return NextResponse.json({ error: msg, ...extra }, { status });
}

/* ================= GET ================= */
export async function GET(req, { params }) {
  try {
    initAdmin();

    const db = admin.firestore();
    const salonId = String(params.salonId || "").trim();
    if (!salonId) return bad("Missing salonId");

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) return bad("Missing GOOGLE_MAPS_API_KEY", 500);

    const ref = db.collection("salons").doc(salonId);
    const snap = await ref.get();

    if (!snap.exists) return bad("Salon not found", 404);

    const salon = snap.data() || {};
    const placeId = salon?.google?.placeId;

    if (!placeId) return bad("Missing google.placeId", 400);

    const fields = ["name", "rating", "user_ratings_total", "formatted_address"]
      .join(",");

    const url =
      "https://maps.googleapis.com/maps/api/place/details/json" +
      `?place_id=${encodeURIComponent(placeId)}` +
      `&fields=${encodeURIComponent(fields)}` +
      `&key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();

    if (json.status !== "OK") {
      return bad("Google Places API error", 500, {
        googleStatus: json.status,
        message: json.error_message || null,
      });
    }

    const place = json.result || {};

    const googleUpdate = {
      ...salon.google,
      verified: true,
      placeId,
      name: place.name ?? salon.google?.name ?? null,
      address:
        place.formatted_address ?? salon.google?.address ?? null,
      rating: typeof place.rating === "number" ? place.rating : null,
      reviewsCount:
        typeof place.user_ratings_total === "number"
          ? place.user_ratings_total
          : 0,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await ref.set(
      {
        google: googleUpdate,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      salonId,
      synced: {
        placeId,
        rating: googleUpdate.rating,
        reviewsCount: googleUpdate.reviewsCount,
        name: googleUpdate.name,
      },
    });
  } catch (err) {
    console.error("GOOGLE SYNC ERROR:", err);
    return NextResponse.json(
      { error: "Sync failed", detail: String(err) },
      { status: 500 }
    );
  }
}
