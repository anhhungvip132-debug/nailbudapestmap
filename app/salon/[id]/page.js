// app/salon/[id]/page.js

import Image from "next/image";
import Link from "next/link";
import dynamicImport from "next/dynamic";

import RatingStars from "@/components/ui/RatingStars";
import GoogleRating from "@/components/ui/GoogleRating";
import ReviewForm from "@/components/ui/ReviewForm";
import BookingCTA from "@/components/ui/BookingCTA";
import PlanBadge from "@/components/ui/PlanBadge";

/* ================= MAP (CLIENT ONLY) ================= */
const SalonMapSmall = dynamicImport(
  () => import("@/components/ui/SalonMapSmall"),
  { ssr: false }
);

/* ================= NEXT CONFIG ================= */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ================= DATA ================= */
async function getSalon(id) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/salons/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

/* ================= SCHEMA ================= */
function buildSchemas(salon) {
  const origin = "https://nailbudapestmap.com";
  const district = String(salon.district || "").replace("District ", "");
  const salonUrl = `${origin}/salon/${salon.id}`;

  const imageUrl =
    typeof salon.image === "string" && salon.image.startsWith("http")
      ? salon.image
      : `${origin}${salon.image || "/images/salon-default.jpg"}`;

  const hasGoogleRating =
    typeof salon.google?.rating === "number" &&
    typeof salon.google?.reviewsCount === "number" &&
    salon.google.reviewsCount > 0;

  return {
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "NailSalon",
      name: salon.name,
      url: salonUrl,
      image: [imageUrl],
      address: {
        "@type": "PostalAddress",
        streetAddress: salon.address,
        addressLocality: "Budapest",
        addressCountry: "HU",
      },
      areaServed: `District ${district}, Budapest`,
      aggregateRating: hasGoogleRating
        ? {
            "@type": "AggregateRating",
            ratingValue: salon.google.rating,
            reviewCount: salon.google.reviewsCount,
          }
        : undefined,
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: origin,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `District ${district}`,
          item: `${origin}/district/${district}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: salon.name,
          item: salonUrl,
        },
      ],
    },
  };
}

/* ================= PAGE ================= */
export default async function SalonDetailPage({ params }) {
  const salon = await getSalon(params.id);

  if (!salon) {
    return (
      <main className="max-w-4xl mx-auto p-10 text-center">
        <h1 className="text-2xl font-semibold">Salon not found</h1>
      </main>
    );
  }

  const schemas = buildSchemas(salon);

  const imageSrc =
    typeof salon.image === "string" && salon.image.length > 0
      ? salon.image
      : "/images/salon-default.jpg";

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* ================= SCHEMA ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.localBusiness),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumb),
        }}
      />

      {/* ================= IMAGE ================= */}
      <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg bg-gray-100">
        <Image
          src={imageSrc}
          alt={salon.name}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          priority
          unoptimized={imageSrc.startsWith("http")}
          className="object-cover"
        />
      </div>

      {/* ================= TITLE ================= */}
      <div className="flex items-center gap-3 mt-6">
        <h1 className="text-3xl font-bold text-pink-600">
          {salon.name}
        </h1>
        <PlanBadge plan={salon.plan} />
      </div>

      <p className="text-gray-600">{salon.address}</p>

      {/* ================= GOOGLE RATING ================= */}
      <GoogleRating salon={salon} />

      {/* ================= BOOKING CTA ================= */}
      <div className="mt-6">
        <BookingCTA salon={salon} />
      </div>

      {/* ================= OWNER CTA ================= */}
      <Link
        href="/advertise"
        className="mt-8 block rounded-2xl border border-pink-200 bg-pink-50 p-5 text-center hover:bg-pink-100 transition"
      >
        <p className="text-sm text-gray-600">
          Are you the owner of this salon?
        </p>
        <p className="mt-1 font-semibold text-pink-600">
          Promote your salon and get more clients →
        </p>
      </Link>

      {/* ================= MAP ================= */}
      <section className="mt-8 bg-white border border-pink-100 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="h-64 rounded-xl overflow-hidden">
          <SalonMapSmall salon={salon} />
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="mt-10">
        <ReviewForm salonId={String(salon.id)} />
      </section>
    </main>
  );
}
