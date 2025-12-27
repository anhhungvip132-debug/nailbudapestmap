export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getFreshaServices } from "@/lib/fresha";

/**
 * GET /api/fresha/services?url=
 * ⚠️ BẮT BUỘC dynamic vì dùng request.url
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const freshaUrl = url.searchParams.get("url");

    if (!freshaUrl) {
      return NextResponse.json([], { status: 200 });
    }

    const services = await getFreshaServices(freshaUrl);

    return NextResponse.json(
      Array.isArray(services) ? services : [],
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Fresha services API error:", err);
    return NextResponse.json([], { status: 200 });
  }
}
