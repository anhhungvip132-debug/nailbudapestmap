// app/sitemap.xml/route.js
import salons from "@/data/salons.json";

export const runtime = "nodejs";

export async function GET() {
  const baseUrl = "https://nailbudapestmap.com";

  /* ================= STATIC PAGES ================= */
  const staticPages = [
    "",
    "/search",
    "/pricing",
    "/booking-status",
  ];

  /* ================= SALON DETAIL PAGES ================= */
  const salonPages = salons.map(
    (s) => `/salon/${s.id}`
  );

  /* ================= DISTRICT PAGES (LOCAL SEO) ================= */
  const districts = [
    ...new Set(
      salons
        .map((s) => String(s.district))
        .map((d) => d.replace("District ", "").trim())
    ),
  ];

  const districtPages = districts.map(
    (d) => `/district/${d}`
  );

  /* ================= ALL URLS ================= */
  const urls = [
    ...staticPages,
    ...salonPages,
    ...districtPages,
  ];

  /* ================= XML BUILD ================= */
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url === "" ? "1.0" : "0.8"}</priority>
  </url>
`
  )
  .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
