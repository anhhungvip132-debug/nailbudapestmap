import { NextResponse } from "next/server";
import data from "@/data/salons.json";

export async function GET() {
  return NextResponse.json(data);
}
