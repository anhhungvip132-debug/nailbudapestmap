export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function GET(req, { params }) {
  const db = getAdminDb();

  try {
    const snap = await db
      .collection("claims")
      .doc(String(params.id))
      .get();

    if (!snap.exists) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(snap.data());
  } catch (err) {
    console.error("[ADMIN CLAIM]", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
