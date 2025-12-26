// app/district/[district]/page.js
import Image from "next/image";
import Link from "next/link";

import salons from "@/data/salons.json";
import RatingStars from "@/components/ui/RatingStars";

/* ================= SEO METADATA ================= */
export async function generateMetadata({ params }) {
  const district = params.district;
  const title = `Nail Salons in District ${district}, Budapest`;
  const description = `Discover the best nail salons in District ${district}, Budapest. Compare services, read reviews and book appointments.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nailbudapestmap.com/district/${district}`,
    },
    openGraph: {
      title,
      description,
      url: `https://nailbudapestmap.com/district/${district}`,
      images: [
        {
          url: "/images/og-cover.jpg",
          width: 1200,
          height: 630,
          alt: `Nail salons in District ${district}, Budapest`,
        },
      ],
      type: "website",
    },
  };
}

/* ================= PAGE ================= */
export default function DistrictPage({ params }) {
  const district = params.district;

  const list = salons.filter(
    (s) =>
      String(s.district)
        .replace("District ", "")
        .trim() === String(district)
  );

  if (list.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No nail salons found in District {district}.
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-pink-600 mb-2">
        Nail Salons in District {district}, Budapest
      </h1>
      <p className="text-gray-600 mb-8">
        Browse and book the best nail salons in District {district}.
      </p>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {list.map((salon) => (
          <Link
            key={salon.id}
            href={`/salon/${salon.id}`}
            className="bg-white border border-pink-100 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="relative h-40">
              <Image
                src={salon.image || "/images/salon-default.jpg"}
                alt={salon.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="font-semibold text-gray-800">
                {salon.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {salon.address}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <RatingStars rating={salon.rating || 4.5} size={16} />
                <span className="text-xs text-gray-500">
                  {(salon.rating || 4.5).toFixed(1)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {salon.services?.slice(0, 3).map((sv, i) => (
                  <span
                    key={i}
                    className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded"
                  >
                    {sv}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
