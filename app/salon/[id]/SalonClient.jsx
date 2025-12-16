"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import RatingStars from "@/components/ui/RatingStars";
import ButtonPink from "@/components/ui/ButtonPink";

// ⛔ Map chỉ render client
const SalonMapSmall = dynamic(
  () => import("@/components/ui/SalonMapSmall"),
  { ssr: false }
);

export default function SalonClient({ salonId }) {
  const router = useRouter();
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⬇️ Fetch salon từ API (chuẩn Phase 3 – DB ready)
  useEffect(() => {
    fetch("/api/salons")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const found = Array.isArray(data)
          ? data.find((s) => String(s.id) === String(salonId))
          : null;
        setSalon(found || null);
      })
      .finally(() => setLoading(false));
  }, [salonId]);

  if (loading) {
    return (
      <p className="p-10 text-center text-gray-500">
        Đang tải thông tin salon…
      </p>
    );
  }

  if (!salon) {
    return (
      <p className="p-10 text-center text-gray-600">
        Salon không tồn tại.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* HERO IMAGE */}
      <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-lg">
        <Image
          src={salon.image || "/images/salon-placeholder.jpg"}
          alt={salon.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-pink-600 mt-6">
        {salon.name}
      </h1>
      <p className="text-gray-600 mt-1">{salon.address}</p>

      {/* RATING */}
      <div className="mt-2 flex items-center gap-3">
        <RatingStars rating={salon.rating || 4.5} />
        <span className="text-sm text-gray-500">
          {(salon.rating || 4.5).toFixed(1)} / 5.0
        </span>
      </div>

      {/* CTA */}
      <ButtonPink
        text="Đặt lịch ngay"
        href={`/booking/${salon.id}`}
        className="mt-6"
      />

      {/* DESCRIPTION */}
      <div className="bg-white shadow-sm border border-pink-100 rounded-2xl p-6 mt-10">
        <h2 className="text-xl font-semibold mb-3">Mô tả</h2>
        <p className="text-gray-700">
          {salon.description || "Salon chưa có mô tả chi tiết."}
        </p>
      </div>

      {/* SERVICES */}
      <div className="bg-white shadow-sm border border-pink-100 rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Dịch vụ nổi bật
        </h2>

        {Array.isArray(salon.services) && salon.services.length > 0 ? (
          <ul className="grid md:grid-cols-2 gap-3">
            {salon.services.map((sv, i) => (
              <li
                key={i}
                className="px-4 py-2 rounded-xl bg-pink-50 border border-pink-100 text-sm text-pink-700 font-medium"
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

      {/* MINI MAP */}
      {typeof salon.lat === "number" &&
        typeof salon.lng === "number" && (
          <div className="bg-white shadow-sm border border-pink-100 rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Vị trí trên bản đồ
            </h2>

            <div className="h-64 rounded-xl overflow-hidden">
              <SalonMapSmall salon={salon} />
            </div>
          </div>
        )}

      {/* OPEN HOURS */}
      <div className="bg-white shadow-sm border border-pink-100 rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Giờ mở cửa
        </h2>

        <ul className="text-gray-700 space-y-1">
          <li>Thứ 2 – Thứ 6: 09:00 – 19:00</li>
          <li>Thứ 7: 09:00 – 17:00</li>
          <li>Chủ nhật: Nghỉ</li>
        </ul>
      </div>
    </div>
  );
}
