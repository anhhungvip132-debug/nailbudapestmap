import { NextResponse } from "next/server";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
    ),
  });
}

const db = admin.firestore();

export async function POST(req) {
  const body = await req.json();

  if (!body.salonId || !body.ownerUid) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await db.collection("salonClaims").add({
    salonId: body.salonId,
    ownerUid: body.ownerUid,
    status: "pending",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return NextResponse.json({ success: true });
}
