import salons from "@/data/salons.json";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  // SỬA LỖI QUAN TRỌNG
  if (isNaN(lat) || isNaN(lng)) {
    return Response.json([]);
  }

  function distance(lat1, lng1, lat2, lng2) {
    const R = 6371; 
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) ** 2;

    return 2 * R * Math.asin(Math.sqrt(a));
  }

  const nearest = salons
    .map((s) => ({
      ...s,
      distance: distance(lat, lng, s.lat, s.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  return Response.json(nearest);
}
