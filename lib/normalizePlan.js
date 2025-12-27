// lib/normalizePlan.js

export function normalizePlan(salon) {
  const now = Date.now();

  const plan = salon.plan ?? "free";
  const planExpiresAt = salon.planExpiresAt?.toMillis?.() ?? null;

  let finalPlan = plan;

  if (planExpiresAt && planExpiresAt < now) {
    finalPlan = "free";
  }

  const sponsoredEnabled =
    salon.sponsored?.enabled === true &&
    salon.sponsored?.expiresAt?.toMillis?.() > now;

  return {
    ...salon,
    plan: sponsoredEnabled ? "sponsored" : finalPlan,
    sponsored: {
      enabled: sponsoredEnabled,
      expiresAt: salon.sponsored?.expiresAt ?? null,
    },
  };
}
