export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import salonsData from "@/data/salons.json";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function GET(req, { params }) {
  const id = String(params.id);
  const base = salonsData.find((s) => String(s.id) === id);

  if (!base) {
    return NextResponse.json(
      { error: "Salon not found" },
      { status: 404 }
    );
  }

  const db = getAdminDb();
  const snap = await db.collection("salons").doc(id).get();
  const extra = snap.exists ? snap.data() : {};

  return NextResponse.json({
    ...base,
    plan: extra.plan ?? base.plan ?? "free",
    featured: !!(extra.featured ?? base.featured),
    google: extra.google ?? base.google ?? {},
  });
}
