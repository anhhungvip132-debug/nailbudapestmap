// app/api/salons/route.js

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import salonsBase from "@/data/salons.json";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { sortSalonsByGoogle } from "@/lib/sortSalonsByGoogle";
import { calculateRankingScore } from "@/lib/calculateRankingScore";
import { isPlanActive } from "@/lib/isPlanActive";

/* ============================================================
   GET /api/salons
   ============================================================ */
export async function GET() {
  try {
    const db = getAdminDb();

    /* ===== BASE JSON ===== */
    const baseMap = new Map(
      salonsBase.map((s) => [String(s.id), s])
    );

    /* ===== FIRESTORE ===== */
    const snap = await db.collection("salons").get();

    snap.forEach((doc) => {
      const id = String(doc.id);
      if (!baseMap.has(id)) return;

      baseMap.set(id, {
        ...baseMap.get(id),
        ...doc.data(),
      });
    });

    /* ===== NORMALIZE + RANK ===== */
    const salons = Array.from(baseMap.values()).map((salon) => {
      const activePlan = isPlanActive(salon.planExpiresAt)
        ? salon.plan ?? "free"
        : "free";

      const normalized = {
        ...salon,
        plan: activePlan,
        featured: Boolean(salon.featured),
        google: salon.google ?? {},
      };

      return {
        ...normalized,
        rankingScore: calculateRankingScore(normalized),
      };
    });

    salons.sort(sortSalonsByGoogle);

    return NextResponse.json(salons);
  } catch (err) {
    console.error("[API /salons]", err);
    return NextResponse.json(
      { error: "Failed to load salons" },
      { status: 500 }
    );
  }
}
