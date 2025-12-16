// app/salon/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import salons from "@/data/salons.json";
import RatingStars from "@/components/ui/RatingStars";
import ReviewForm from "@/components/ui/ReviewForm";
import ReviewList from "@/components/ui/ReviewList";

// Leaflet map (client only)
const SalonMapSmall = dynamic(
  () => import("@/components/ui/SalonMapSmall"),
  { ssr: false }
);

export default function SalonDetailPage({ params }) {
  const router = useRouter();
  const salonId = String(params.id);
  const salon = salons.find((s) => String(s.id) === salonId);

  const [reviews, setReviews] = useState([]);

  // ✅ Load approved reviews only
  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = `reviews_${salonId}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    setReviews(stored.filter((r) => r.status === "approved"));
  }, [salonId]);

  if (!salon) {
    return (
      <div className="p-12 text-center text-gray-500">
        Salon không tồn tại.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* HERO IMAGE */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow">
        <Image
          src={salon.image || "/images/salon-placeholder.jpg"}
          alt={salon.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* BASIC INFO */}
      <h1 className="mt-6 text-3xl font-bold text-pink-600">
        {salon.name}
      </h1>
      <p className="text-gray-600">{salon.address}</p>

      <div className="flex items-center gap-3 mt-2">
        <RatingStars rating={salon.rating || 4.5} />
        <span className="text-sm text-gray-500">
          {salon.rating || 4.5} / 5.0
        </span>
      </div>

      {/* BOOKING CTA */}
      <button
        onClick={() => router.push(`/booking/${salon.id}`)}
        className="mt-5 inline-flex rounded-full bg-pink-500 px-6 py-3 text-white font-semibold hover:bg-pink-600 transition"
      >
        Đặt lịch ngay
      </button>

      {/* DESCRIPTION */}
      <section className="mt-10 bg-white rounded-2xl border border-pink-100 p-6">
        <h2 className="text-lg font-semibold mb-2">Mô tả</h2>
        <p className="text-gray-700">
          {salon.description || "Salon chưa có mô tả chi tiết."}
        </p>
      </section>

      {/* SERVICES */}
      <section className="mt-6 bg-white rounded-2xl border border-pink-100 p-6">
        <h2 className="text-lg font-semibold mb-3">Dịch vụ</h2>
        {salon.services?.length ? (
          <div className="flex flex-wrap gap-3">
            {salon.services.map((sv, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-sm font-medium"
              >
                {sv}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Salon chưa cập nhật dịch vụ.
          </p>
        )}
      </section>

      {/* MAP */}
      <section className="mt-6 bg-white rounded-2xl border border-pink-100 p-6">
        <h2 className="text-lg font-semibold mb-3">
          Vị trí trên bản đồ
        </h2>
        <div className="h-64 rounded-xl overflow-hidden">
          <SalonMapSmall salon={salon} />
        </div>
      </section>

      {/* OPEN HOURS */}
      <section className="mt-6 bg-white rounded-2xl border border-pink-100 p-6">
        <h2 className="text-lg font-semibold mb-2">Giờ mở cửa</h2>
        <ul className="text-gray-700 space-y-1 text-sm">
          <li>Thứ 2 – Thứ 6: 09:00 – 19:00</li>
          <li>Thứ 7: 09:00 – 17:00</li>
          <li>Chủ nhật: Nghỉ</li>
        </ul>
      </section>

      {/* REVIEWS */}
      <section className="mt-10">
        <ReviewForm salonId={salon.id} />
        <ReviewList reviews={reviews} />
      </section>
    </div>
  );
}
