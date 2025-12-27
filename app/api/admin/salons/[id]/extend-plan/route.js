// app/api/admin/salons/[id]/extend-plan/route.js

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/checkAdminAuth";

export async function POST(req, { params }) {
  try {
    await requireAdmin(req);

    const { id } = params;
    const { days } = await req.json();

    if (![30, 90, 365].includes(days)) {
      return NextResponse.json(
        { ok: false, error: "Invalid days" },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    const ref = db.collection("salons").doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, error: "Salon not found" },
        { status: 404 }
      );
    }

    const data = snap.data();
    const now = admin.firestore.Timestamp.now();

    let baseDate = now;
    if (data.plan === "premium" && data.planExpiresAt?.toMillis() > now.toMillis()) {
      baseDate = data.planExpiresAt;
    }

    const newExpiresAt = admin.firestore.Timestamp.fromMillis(
      baseDate.toMillis() + days * 24 * 60 * 60 * 1000
    );

    await ref.update({
      plan: "premium",
      planExpiresAt: newExpiresAt,
      updatedAt: now,
    });

    return NextResponse.json({
      ok: true,
      plan: "premium",
      planExpiresAt: newExpiresAt.toDate().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
