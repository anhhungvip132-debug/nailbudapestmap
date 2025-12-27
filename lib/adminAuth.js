import { NextResponse } from "next/server";
import admin from "firebase-admin";

/* ================= INIT FIREBASE ADMIN ================= */
if (!admin.apps.length) {
  if (!process.env.FIREBASE_ADMIN_CREDENTIALS) {
    throw new Error("Missing FIREBASE_ADMIN_CREDENTIALS");
  }

  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
    ),
  });
}

const db = admin.firestore();

/* ================= REQUIRE ADMIN ================= */
export async function requireAdmin(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = await admin.auth().verifyIdToken(token);

    const userSnap = await db
      .collection("users")
      .doc(decoded.uid)
      .get();

    if (!userSnap.exists || userSnap.data()?.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    return null; // ✅ OK
  } catch (err) {
    console.error("requireAdmin error:", err);
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
}
