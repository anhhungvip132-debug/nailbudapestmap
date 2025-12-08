// app/api/nearest/route.js
import { NextResponse } from "next/server";
import salons from "@/lib/salons.json";

// Haversine: tính khoảng cách 2 tọa độ (km)
function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // bán kính Trái đất (km)
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));
  const limit = parseInt(searchParams.get("limit") || "3", 10);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return NextResponse.json(
      { error: "Missing lat or lng" },
      { status: 400 }
    );
  }

  const nearest = salons
    .map((s) => ({
      ...s,
      distance: calcDistance(lat, lng, s.lat, s.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  return NextResponse.json(nearest);
}
