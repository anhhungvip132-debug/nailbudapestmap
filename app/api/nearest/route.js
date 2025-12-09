import { getAllSalons } from "../salons/data";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  if (!lat || !lng) {
    return Response.json(
      { success: false, message: "Missing lat/lng" },
      { status: 400 }
    );
  }

  const salons = getAllSalons();

  // Haversine function
  function distance(a, b) {
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const x =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(a.lat * (Math.PI / 180)) *
        Math.cos(b.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
  }

  const sorted = salons
    .map((s) => ({
      ...s,
      distance: distance({ lat, lng }, { lat: s.lat, lng: s.lng }),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 10);

  return Response.json({
    success: true,
    data: sorted,
  });
}
