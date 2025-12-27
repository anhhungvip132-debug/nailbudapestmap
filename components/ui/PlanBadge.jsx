// components/ui/PlanBadge.jsx
"use client";

/**
 * PlanBadge
 * Displays monetization / partner badges for salons
 * Safe for SEO & Next.js 14
 */
export default function PlanBadge({ plan }) {
  if (!plan || typeof plan !== "string") return null;

  const value = plan.toLowerCase();

  /* ================= SPONSORED ================= */
  if (value === "sponsored") {
    return (
      <span
        title="Paid placement. Ranking also considers Google rating and reviews."
        className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1"
      >
        ⭐ Sponsored
      </span>
    );
  }

  /* ================= PREMIUM / VIP ================= */
  if (value === "premium" || value === "vip") {
    return (
      <span
        title="Premium salon. Ranking considers quality signals."
        className="inline-flex items-center rounded-full bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1"
      >
        💎 Premium
      </span>
    );
  }

  /* ================= FRESHA PARTNER ================= */
  if (value === "fresha") {
    return (
      <span
        title="Official Fresha booking partner"
        className="inline-flex items-center rounded-full bg-green-100 text-green-700 text-xs font-semibold px-3 py-1"
      >
        🔗 Fresha Partner
      </span>
    );
  }

  return null;
}
