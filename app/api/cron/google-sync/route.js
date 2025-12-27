// app/api/cron/google-sync/route.js
import { NextResponse } from "next/server";
import admin from "firebase-admin";

/* ================= INIT FIREBASE ================= */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
    ),
  });
}

const db = admin.firestore();

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ================= AUTH ================= */
function checkAuth(req) {
  const secret = req.headers.get("x-cron-secret");
  return secret && secret === process.env.CRON_SECRET;
}

/* ================= GET ================= */
export async function GET(req) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GOOGLE_MAPS_API_KEY" },
        { status: 500 }
      );
    }

    const snap = await db.collection("salons").get();

    let updated = 0;

    for (const doc of snap.docs) {
      const salon = doc.data();
      const placeId = salon?.google?.placeId;

      if (!placeId) continue;

      const url =
        "https://maps.googleapis.com/maps/api/place/details/json" +
        `?place_id=${placeId}` +
        `&fields=rating,user_ratings_total` +
        `&key=${apiKey}`;

      const res = await fetch(url);
      const json = await res.json();

      if (json.status !== "OK") continue;

      await doc.ref.set(
        {
          google: {
            ...salon.google,
            rating: json.result.rating ?? null,
            reviewsCount:
              json.result.user_ratings_total ?? 0,
            verified: true,
            updatedAt:
              admin.firestore.FieldValue.serverTimestamp(),
          },
          updatedAt:
            admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      updated++;
    }

    return NextResponse.json({
      success: true,
      updated,
    });
  } catch (err) {
    console.error("CRON GOOGLE SYNC ERROR:", err);
    return NextResponse.json(
      { error: "Cron failed" },
      { status: 500 }
    );
  }
}
