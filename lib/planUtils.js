// lib/planUtils.js

/**
 * Normalize Firestore Timestamp / Date / number to JS Date
 */
function toDate(value) {
  if (!value) return null;

  // Firestore Timestamp
  if (typeof value.toDate === "function") {
    return value.toDate();
  }

  // ISO string or Date
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}

/**
 * Calculate next plan state
 *
 * @param {Object} params
 * @param {"FREE"|"PREMIUM"|"SPONSORED"} params.currentPlan
 * @param {Date|Timestamp|null} params.currentExpiry
 * @param {"FREE"|"PREMIUM"|"SPONSORED"} params.nextPlan
 * @param {number} params.days
 *
 * @returns {{
 *   plan: string,
 *   expiresAt: Date|null,
 *   action: string
 * }}
 */
export function calculatePlanUpdate({
  currentPlan,
  currentExpiry,
  nextPlan,
  days = 0,
}) {
  const now = new Date();
  const expiry = toDate(currentExpiry);

  // FREE → FREE
  if (nextPlan === "FREE") {
    return {
      plan: "FREE",
      expiresAt: null,
      action: "set_free",
    };
  }

  // PREMIUM / SPONSORED
  if (nextPlan === "PREMIUM" || nextPlan === "SPONSORED") {
    let baseDate = now;

    // If current plan same & still valid → extend
    if (
      currentPlan === nextPlan &&
      expiry &&
      expiry.getTime() > now.getTime()
    ) {
      baseDate = expiry;
    }

    const expiresAt = new Date(baseDate);
    expiresAt.setDate(expiresAt.getDate() + days);

    return {
      plan: nextPlan,
      expiresAt,
      action:
        baseDate === now ? "activate_new_plan" : "extend_existing_plan",
    };
  }

  throw new Error("Invalid plan transition");
}

/**
 * Check if plan is expired
 */
export function isPlanExpired(expiresAt) {
  if (!expiresAt) return true;
  const d = toDate(expiresAt);
  return d.getTime() < Date.now();
}
