// app/sitemap.xml/route.js

import { NextResponse } from "next/server";
import salons from "@/data/salons.json";

export async function GET() {
  const baseUrl = "https://nailbudapestmap.com";

  /* ===== STATIC SEO PAGES ===== */
  const staticUrls = [
    {
      loc: `${baseUrl}/`,
      changefreq: "weekly",
      priority: "1.0",
    },
  ];

  /* ===== DISTRICT PAGES (1–23) ===== */
  const districtUrls = Array.from({ length: 23 }, (_, i) => ({
    loc: `${baseUrl}/district/${i + 1}`,
    changefreq: "weekly",
    priority: "0.9",
  }));

  /* ===== SALON PAGES ===== */
  const salonUrls = salons.map((s) => ({
    loc: `${baseUrl}/salon/${s.id}`,
    changefreq: "weekly",
    priority: "0.8",
  }));

  const allUrls = [...staticUrls, ...districtUrls, ...salonUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
