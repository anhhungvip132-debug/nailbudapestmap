import { NextResponse } from "next/server";
import salons from "@/data/salons.json";

export async function GET() {
  return NextResponse.json(salons, { status: 200 });
}
