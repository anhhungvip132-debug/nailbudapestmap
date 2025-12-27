export async function fetchPlaceDetails(placeId) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) throw new Error("Missing GOOGLE_PLACES_API_KEY");
  if (!placeId) throw new Error("Missing placeId");

  // Fields: bạn có thể thêm/bớt tùy nhu cầu
  const fields = [
    "name",
    "rating",
    "user_ratings_total",
    "opening_hours",
    "website",
    "url",
    "formatted_phone_number",
  ].join(",");

  const url =
    "https://maps.googleapis.com/maps/api/place/details/json" +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=${encodeURIComponent(fields)}` +
    `&key=${encodeURIComponent(key)}`;

  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();

  // Google trả status: OK | ZERO_RESULTS | REQUEST_DENIED | INVALID_REQUEST | OVER_QUERY_LIMIT ...
  if (json.status !== "OK") {
    throw new Error(`Google Places error: ${json.status} ${json.error_message || ""}`.trim());
  }

  return json.result;
}
