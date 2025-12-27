// app/api/admin/cron-logs/route.js

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

function getStartTimestamp(db, range) {
  const now = new Date();

  if (range === "today") {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    return db.constructor.Timestamp.fromDate(start); // admin.firestore.Timestamp
  }

  if (range === "7d") {
    const start = new Date(now);
    start.setDate(start.getDate() - 7);
    return db.constructor.Timestamp.fromDate(start);
  }

  return null; // all
}

export async function GET(req) {
  try {
    const db = getAdminDb();
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "7d"; // default 7d

    let q = db.collection("cronLogs");

    // filter theo thời gian dựa trên field `at`
    // (where + orderBy cùng 1 field => không cần composite index)
    const startTs = getStartTimestamp(db, range);
    if (startTs) {
      q = q.where("at", ">=", startTs);
    }

    const snap = await q.orderBy("at", "desc").limit(100).get();

    const logs = snap.docs.map((d) => {
      const data = d.data() || {};
      return {
        id: d.id,
        ...data,
        at: data.at?.toDate?.().toISOString?.() || null,
      };
    });

    return NextResponse.json({ ok: true, range, logs });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
