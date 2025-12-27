export function buildGoogleReviewUrl(placeId) {
  if (!placeId) return null;

  return `https://search.google.com/local/writereview?placeid=${placeId}`;
}
