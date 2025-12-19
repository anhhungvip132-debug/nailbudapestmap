// lib/fresha.js
"use server";

/**
 * ⚠️ Fresha không public API chính thức
 * → dùng deep-link + scrape-safe pattern
 * → production: replace bằng partner API nếu có
 */

// =======================
// GET SERVICES (MOCK / SAFE)
// =======================
export async function getFreshaServices(freshaUrl) {
  if (!freshaUrl) return [];

  // fallback mock (production-safe)
  return [
    {
      id: "manicure",
      name: "Manicure",
      duration: 45,
      price: "8.000 Ft",
    },
    {
      id: "gel",
      name: "Gel Polish",
      duration: 60,
      price: "10.000 Ft",
    },
  ];
}

// =======================
// BUILD BOOKING URL
// ⚠️ PHẢI async (Next.js 14 server action)
// =======================
export async function buildFreshaBookingUrl(freshaUrl, affiliateId) {
  if (!freshaUrl) return null;

  const url = new URL(freshaUrl);
  url.searchParams.set("ref", affiliateId || "nailbudapestmap");

  return url.toString();
}
