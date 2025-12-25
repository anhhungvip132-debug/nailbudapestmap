import { NextResponse } from "next/server";
import salons from "@/data/salons.json";

export async function GET() {
  const baseUrl = "https://nailbudapestmap.com";

  const staticPages = [
    "",
    "/search",
    "/pricing",
    "/booking-status",
    "/map",
  ];

  const urls = [
    ...staticPages.map(
      (p) => `
  <url>
    <loc>${baseUrl}${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    ),
    ...salons.map(
      (s) => `
  <url>
    <loc>${baseUrl}/salon/${s.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
