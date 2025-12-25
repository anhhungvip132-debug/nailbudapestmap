// app/salon/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import salons from "@/data/salons.json";
import RatingStars from "@/components/ui/RatingStars";
import ReviewForm from "@/components/ui/ReviewForm";
import BookingCTA from "@/components/ui/BookingCTA";

const SalonMapSmall = dynamic(
  () => import("@/components/ui/SalonMapSmall"),
  { ssr: false }
);

export default function SalonDetailPage({ params }) {
  const salon = salons.find(
    (s) => String(s.id) === String(params.id)
  );

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  /* ================= SCHEMA (LOCAL SEO) ================= */
  useEffect(() => {
    if (!salon) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "NailSalon",
      "@id": `https://nailbudapestmap.com/salon/${salon.id}`,
      name: salon.name,
      url: `https://nailbudapestmap.com/salon/${salon.id}`,
      image: salon.image
        ? `https://nailbudapestmap.com${salon.image}`
        : "https://nailbudapestmap.com/images/salon-default.jpg",
      address: {
        "@type": "PostalAddress",
        streetAddress: salon.address,
        addressLocality: "Budapest",
        addressCountry: "HU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: salon.lat,
        longitude: salon.lng,
      },
      priceRange: salon.priceRange || "$$",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "salon-schema";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("salon-schema")?.remove();
    };
  }, [salon]);

  /* ================= LOAD REVIEWS ================= */
  useEffect(() => {
    if (!salon?.id) return;

    setLoadingReviews(true);

    fetch(`/api/reviews?salonId=${salon.id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        setReviews(Array.isArray(json) ? json : []);
        setLoadingReviews(false);
      })
      .catch(() => setLoadingReviews(false));
  }, [salon?.id]);

  if (!salon) {
    return (
      <div className="p-10 text-center text-gray-500">
        Salon không tồn tại.
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* IMAGE */}
      <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg">
        <Image
          src={salon.image || "/images/salon-default.jpg"}
          alt={salon.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-pink-600 mt-6">
        {salon.name}
      </h1>
      <p className="text-gray-600 mt-1">{salon.address}</p>

      {/* RATING */}
      <div className="flex items-center gap-3 mt-2">
        <RatingStars rating={salon.rating || 4.5} />
        <span className="text-sm text-gray-500">
          {(salon.rating || 4.5).toFixed(1)} / 5.0
        </span>
      </div>

      {/* BOOKING */}
      <div className="mt-6">
        <BookingCTA salon={salon} />
      </div>

      {/* DESCRIPTION */}
      <section className="mt-10 bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Mô tả</h2>
        <p className="text-gray-700">
          {salon.description || "Salon chưa có mô tả."}
        </p>
      </section>

      {/* SERVICES */}
      <section className="mt-8 bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Dịch vụ nổi bật</h2>

        {salon.services?.length ? (
          <ul className="grid md:grid-cols-2 gap-3">
            {salon.services.map((sv, i) => (
              <li
                key={i}
                className="px-4 py-2 bg-pink-50 border border-pink-100 rounded-xl text-sm text-pink-700 font-medium"
              >
                {sv}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Salon chưa cập nhật dịch vụ.</p>
        )}
      </section>

      {/* MAP */}
      <section className="mt-8 bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Vị trí trên bản đồ</h2>
        <div className="h-64 rounded-xl overflow-hidden">
          <SalonMapSmall salon={salon} />
        </div>
      </section>

      {/* REVIEW FORM */}
      <section className="mt-10">
        <ReviewForm salonId={String(salon.id)} />
        <p className="text-xs text-gray-400 mt-2">
          * Review sẽ hiển thị sau khi được duyệt.
        </p>
      </section>
    </main>
  );
}
