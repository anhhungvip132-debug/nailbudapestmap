// lib/sortSalonsByGoogle.js

import { calculateRankingScore } from "./calculateRankingScore";

export function sortSalonsByGoogle(a, b) {
  const scoreA = calculateRankingScore(a);
  const scoreB = calculateRankingScore(b);

  if (scoreA !== scoreB) {
    return scoreB - scoreA;
  }

  /* ================= FALLBACK: GOOGLE RATING ================= */
  const ratingA = a.google?.rating ?? 0;
  const ratingB = b.google?.rating ?? 0;

  if (ratingA !== ratingB) {
    return ratingB - ratingA;
  }

  /* ================= FALLBACK: REVIEWS COUNT ================= */
  const reviewsA = a.google?.reviewsCount ?? 0;
  const reviewsB = b.google?.reviewsCount ?? 0;

  if (reviewsA !== reviewsB) {
    return reviewsB - reviewsA;
  }

  /* ================= FINAL STABLE ================= */
  return String(a.name).localeCompare(String(b.name));
}
