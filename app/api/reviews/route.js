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
  const [reviewCount, setReviewCount] = useState(0);
  const [ratingValue, setRatingValue] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(true);

  /* ===== LOAD REVIEWS + STATS ===== */
  useEffect(() => {
    if (!salon?.id) return;

    setLoadingReviews(true);

    fetch(`/api/reviews?salonId=${salon.id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        setReviews(json.reviews || []);
        setReviewCount(json.reviewCount || 0);
        setRatingValue(json.ratingValue || null);
        setLoadingReviews(false);
      })
      .catch(() => setLoadingReviews(false));
  }, [salon?.id]);

  /* ===== SCHEMA WITH AGGREGATE RATING ===== */
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
      ...(reviewCount > 0 && ratingValue
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue,
              reviewCount,
            },
          }
        : {}),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "salon-review-schema";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("salon-review-schema")?.remove();
    };
  }, [salon, reviewCount, ratingValue]);

  if (!salon) {
    return (
      <div className="p-10 text-center text-gray-500">
        Salon không tồn tại.
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg">
        <Image
          src={salon.image || "/images/salon-default.jpg"}
          alt={salon.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold text-pink-600 mt-6">
        {salon.name}
      </h1>
      <p className="text-gray-600 mt-1">{salon.address}</p>

      <div className="flex items-center gap-3 mt-2">
        <RatingStars rating={ratingValue || salon.rating || 4.5} />
        <span className="text-sm text-gray-500">
          {(ratingValue || salon.rating || 4.5).toFixed(1)} / 5.0
          {reviewCount > 0 && ` (${reviewCount} reviews)`}
        </span>
      </div>

      <div className="mt-6">
        <BookingCTA salon={salon} />
      </div>

      <section className="mt-10 bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Mô tả</h2>
        <p className="text-gray-700">
          {salon.description || "Salon chưa có mô tả."}
        </p>
      </section>

      <section className="mt-8 bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Vị trí trên bản đồ</h2>
        <div className="h-64 rounded-xl overflow-hidden">
          <SalonMapSmall salon={salon} />
        </div>
      </section>

      <section className="mt-10">
        <ReviewForm salonId={String(salon.id)} />
        <p className="text-xs text-gray-400 mt-2">
          * Review sẽ hiển thị sau khi được duyệt.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Đánh giá</h2>

        {loadingReviews && (
          <p className="text-sm text-gray-500">Đang tải…</p>
        )}

        {!loadingReviews && reviews.length === 0 && (
          <p className="text-sm text-gray-500">Chưa có đánh giá.</p>
        )}

        <div className="space-y-3">
          {reviews.map((rv) => (
            <div
              key={rv.id}
              className="p-4 bg-white border border-pink-100 rounded-xl"
            >
              <div className="flex justify-between items-center mb-1">
                <strong>{rv.name}</strong>
                <RatingStars rating={rv.rating} size={16} />
              </div>
              <p className="text-gray-600">{rv.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
