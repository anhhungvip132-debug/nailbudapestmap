import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

/* ================= AUTH ================= */
function isAuthorized(req) {
  const key = req.headers.get("x-admin-key");
  return key && key === process.env.ADMIN_API_KEY;
}

/* ================== GET ================== */
export async function GET(req, { params }) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getAdminDb();

    const snap = await db
      .collection("adminActions")
      .where("salonId", "==", params.id)
      .where("type", "==", "UPDATE_PLAN")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    const items = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
