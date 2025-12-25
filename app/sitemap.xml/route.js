// app/sitemap.xml/route.js
import salons from "@/data/salons.json";

export const runtime = "nodejs";

export async function GET() {
  const baseUrl = "https://nailbudapestmap.com";

  const staticPages = [
    "",
    "/search",
    "/pricing",
    "/booking-status",
  ];

  const salonPages = salons.map(
    (s) => `/salon/${s.id}`
  );

  const urls = [...staticPages, ...salonPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
