// app/api/salons/[id]/route.js

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  try {
    const filePath = path.join(process.cwd(), "data", "salons.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const salons = JSON.parse(jsonData);

    const salon = salons.find((s) => String(s.id) === String(params.id));

    if (!salon) {
      return NextResponse.json(
        { error: "Salon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(salon);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
