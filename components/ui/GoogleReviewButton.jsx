"use client";

import { buildGoogleReviewUrl } from "@/lib/googleReview";

export default function GoogleReviewButton({ salon }) {
  const placeId = salon?.google?.placeId;
  if (!placeId) return null;

  const reviewUrl = buildGoogleReviewUrl(placeId);

  async function handleClick() {
    try {
      await fetch("/api/track/google-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salonId: String(salon.id),
          placeId,
        }),
      });
    } catch (e) {
      // fail silently – không chặn redirect
    } finally {
      window.open(reviewUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 mt-4
        bg-white border border-gray-200
        px-4 py-2 rounded-full
        text-sm font-medium
        hover:shadow transition"
    >
      <span className="text-blue-600 font-semibold">G</span>
      Write a Google review
    </button>
  );
}
