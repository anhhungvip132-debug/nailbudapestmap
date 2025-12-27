export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import salonsData from "@/data/salons.json";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const db = getAdminDb();
    const snap = await db.collection("salons").get();

    const overrides = {};
    snap.forEach((doc) => {
      overrides[String(doc.id)] = doc.data();
    });

    const result = salonsData.map((s) => {
      const extra = overrides[String(s.id)] || {};
      return {
        ...s,
        featured: !!(extra.featured ?? s.featured),
        plan: extra.plan ?? s.plan ?? "free",
        google: extra.google ?? s.google ?? {},
      };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[ADMIN SALONS]", err);
    return NextResponse.json(
      { error: "Failed to load salons" },
      { status: 500 }
    );
  }
}
