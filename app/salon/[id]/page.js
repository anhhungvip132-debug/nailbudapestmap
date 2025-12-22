"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import salons from "@/data/salons.json";
import RatingStars from "@/components/ui/RatingStars";
import ButtonPink from "@/components/ui/ButtonPink";
import ReviewForm from "@/components/ui/ReviewForm";

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

  useEffect(() => {
    if (!salon?.id) return;

    setLoadingReviews(true);
    fetch(`/api/reviews?salonId=${salon.id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoadingReviews(false);
      })
      .catch(() => setLoadingReviews(false));
  }, [salon?.id]);

  function handleAddReview(review) {
    setReviews((prev) => [review, ...prev]);
  }

  if (!salon) {
    return (
      <div className="p-10 text-center text-gray-500">
        Salon không tồn tại.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* HERO IMAGE */}
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

      {/* CTA */}
      <ButtonPink
        href={`/booking/${salon.id}`}
        text="Đặt lịch ngay"
        className="mt-6"
      />

      {/* DESCRIPTION */}
      <div className="mt-10 bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Mô tả</h2>
        <p className="text-gray-700">
          {salon.description || "Salon chưa có mô tả."}
        </p>
      </div>

      {/* SERVICES */}
      <div className="mt-8 bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
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
          <p className="text-gray-500">
            Salon chưa cập nhật dịch vụ.
          </p>
        )}
      </div>

      {/* MAP */}
      <div className="mt-8 bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Vị trí trên bản đồ
        </h2>
        <div className="h-64 rounded-xl overflow-hidden">
          <SalonMapSmall salon={salon} />
        </div>
      </div>

      {/* OPEN HOURS */}
      <div className="mt-8 bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Giờ mở cửa</h2>
        <ul className="text-gray-700 space-y-1">
          <li>Thứ 2 – Thứ 6: 09:00 – 19:00</li>
          <li>Thứ 7: 09:00 – 17:00</li>
          <li>Chủ nhật: Nghỉ</li>
        </ul>
      </div>

      {/* REVIEW FORM */}
      <ReviewForm
        salonId={String(salon.id)}
        onSubmit={handleAddReview}
      />

      {/* REVIEW LIST */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Đánh giá gần đây
        </h2>

        {loadingReviews && (
          <p className="text-sm text-gray-500">
            Đang tải đánh giá...
          </p>
        )}

        {!loadingReviews && reviews.length === 0 && (
          <p className="text-sm text-gray-500">
            Chưa có đánh giá nào.
          </p>
        )}

        {reviews.map((rv, i) => (
          <div
            key={rv.id || i}
            className="mb-3 p-4 bg-white border border-pink-100 rounded-xl"
          >
            <div className="flex justify-between items-center mb-1">
              <strong className="text-gray-700">
                {rv.name || "Ẩn danh"}
              </strong>
              <RatingStars rating={rv.rating || 5} size={16} />
            </div>

            <p className="text-gray-600">{rv.comment}</p>

            <p className="text-xs text-gray-400 mt-1">
              {rv.createdAt?.seconds
                ? new Date(
                    rv.createdAt.seconds * 1000
                  ).toLocaleDateString()
                : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
