export function normalizeGoogle(base, extra) {
  const g = extra?.google || base?.google || {};

  return {
    placeId: g.placeId || null,
    verified: !!g.verified,
    rating:
      typeof g.rating === "number"
        ? g.rating
        : typeof extra?.rating === "number"
        ? extra.rating
        : null,
    reviewsCount:
      typeof g.reviewsCount === "number"
        ? g.reviewsCount
        : typeof extra?.reviewsCount === "number"
        ? extra.reviewsCount
        : 0,
  };
}
