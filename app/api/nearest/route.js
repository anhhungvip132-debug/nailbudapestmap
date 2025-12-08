import salons from "@/lib/salons.json";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));
  const limit = parseInt(searchParams.get("limit")) || 10;

  if (!lat || !lng) {
    return Response.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const toRad = (value) => (value * Math.PI) / 180;

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const sorted = salons
    .map((s) => ({
      ...s,
      distance: calculateDistance(lat, lng, s.lat, s.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  return Response.json(sorted);
}
