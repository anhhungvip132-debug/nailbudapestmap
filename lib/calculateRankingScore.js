// lib/calculateRankingScore.js

/**
 * Phase 10 – Monetization Ranking (Safe)
 */
export function calculateRankingScore(salon) {
  let score = 0;

  /* ===== PLAN BOOST ===== */
  if (salon.plan === "sponsored") score += 1000;
  else if (salon.plan === "premium") score += 500;

  /* ===== GOOGLE VERIFIED ===== */
  if (salon.google?.verified) score += 300;

  /* ===== GOOGLE RATING ===== */
  if (typeof salon.google?.rating === "number") {
    score += salon.google.rating * 50;
  }

  /* ===== GOOGLE REVIEWS ===== */
  if (typeof salon.google?.reviewsCount === "number") {
    score += Math.log10(salon.google.reviewsCount + 1) * 100;
  }

  /* ===== FEATURED ===== */
  if (salon.featured) score += 150;

  return Math.round(score);
}
