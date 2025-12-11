import { NextResponse } from "next/server";
import salons from "../salons/data"; // hoặc "../../data/salons.json"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat"));
    const lng = parseFloat(searchParams.get("lng"));

    if (!lat || !lng) {
      return NextResponse.json([], { status: 200 });
    }

    const R = 6371; // bán kính Trái Đất km

    function distance(aLat, aLng, bLat, bLng) {
      const dLat = ((bLat - aLat) * Math.PI) / 180;
      const dLng = ((bLng - aLng) * Math.PI) / 180;
      const x =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(aLat * Math.PI / 180) *
          Math.cos(bLat * Math.PI / 180) *
          Math.sin(dLng / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(x));
    }

    const list = salons
      .map((s) => ({
        ...s,
        distanceKm: distance(lat, lng, s.lat, s.lng),
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 5);

    return NextResponse.json(list, { status: 200 });

  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}
