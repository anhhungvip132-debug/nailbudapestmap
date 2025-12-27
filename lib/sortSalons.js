// lib/sortSalons.js

export function sortSalonsByGoogle(a, b) {
  const aGoogle = a.google || {};
  const bGoogle = b.google || {};

  // 1️⃣ Google verified
  if (aGoogle.verified && !bGoogle.verified) return -1;
  if (!aGoogle.verified && bGoogle.verified) return 1;

  // 2️⃣ Google rating
  const aRating = aGoogle.rating ?? 0;
  const bRating = bGoogle.rating ?? 0;
  if (aRating !== bRating) return bRating - aRating;

  // 3️⃣ Google reviews count
  const aReviews = aGoogle.reviewsCount ?? 0;
  const bReviews = bGoogle.reviewsCount ?? 0;
  if (aReviews !== bReviews) return bReviews - aReviews;

  // 4️⃣ Local fallback rating
  const aLocal = a.rating ?? 0;
  const bLocal = b.rating ?? 0;
  return bLocal - aLocal;
}
