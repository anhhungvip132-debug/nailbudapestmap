export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// GET /api/admin/reviews?status=pending
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "pending";

    const q = query(
      collection(db, "reviews"),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);

    const reviews = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.error("ADMIN GET reviews error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load reviews" },
      { status: 500 }
    );
  }
}
