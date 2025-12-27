// app/api/admin/stats/route.js

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { isPlanActive } from "@/lib/isPlanActive";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(req) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const db = getAdminDb();
  const snap = await db.collection("salons").get();

  let free = 0;
  let premium = 0;
  let sponsored = 0;

  snap.forEach((doc) => {
    const s = doc.data();

    if (s.plan === "sponsored" && isPlanActive(s.planExpiresAt)) {
      sponsored++;
    } else if (s.plan === "premium" && isPlanActive(s.planExpiresAt)) {
      premium++;
    } else {
      free++;
    }
  });

  return NextResponse.json({
    success: true,
    data: {
      total: snap.size,
      free,
      premium,
      sponsored,
    },
  });
}
