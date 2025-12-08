"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// COMPONENTS
import SalonHero from "../../../components/ui/SalonHero";
import SalonGallery from "../../../components/ui/SalonGallery";
import PriceList from "../../../components/ui/PriceList";
import SalonReviews from "../../../components/ui/SalonReviews";
import BookingForm from "../../../components/ui/BookingForm";

// Dynamic Map load
const Map = dynamic(() => import("../../../components/ui/Map"), {
  ssr: false,
  loading: () => (
    <p className="text-center py-10 text-gray-500">Đang tải bản đồ…</p>
  ),
});

export default function SalonPage({ params }) {
  const { id } = params;
  const [salon, setSalon] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/salons");
        const data = await res.json();

        const found = data.find((s) => s.id == id);
        setSalon(found || null);
      } catch (e) {
        console.error("Lỗi tải dữ liệu salon:", e);
      }
    }

    load();
  }, [id]);

  if (!salon)
    return (
      <p className="text-center py-20 text-gray-500 text-xl animate-pulse">
        Đang tải thông tin salon…
      </p>
    );

  return (
    <div className="pb-20">
      {/* HERO */}
      <SalonHero salon={salon} />

      <div className="max-w-7xl mx-auto px-4 mt-10">
        {/* GALLERY */}
        <h2 className="text-3xl font-bold mb-4">Hình ảnh nổi bật</h2>
        <SalonGallery gallery={salon.gallery} />

        {/* PRICE LIST */}
        <h2 className="text-3xl font-bold mt-12 mb-4">Bảng giá dịch vụ</h2>
        <PriceList prices={salon.prices} />

        {/* BOOKING */}
        <h2 className="text-3xl font-bold mt-12 mb-4">Đặt lịch ngay</h2>
        <BookingForm salonId={salon.id} />

        {/* REVIEWS */}
        <h2 className="text-3xl font-bold mt-12 mb-4">Đánh giá khách hàng</h2>
        <SalonReviews salonId={salon.id} reviews={salon.reviews || []} />

        {/* MAP FIX — CHỈ RENDER KHI SALON CÓ DỮ LIỆU */}
        <h2 className="text-3xl font-bold mt-12 mb-4">Vị trí trên bản đồ</h2>

        {salon && salon.lat && salon.lng ? (
          <Map salons={[salon]} />
        ) : (
          <p className="text-gray-500 py-10">
            Salon chưa có thông tin vị trí hợp lệ.
          </p>
        )}
      </div>
    </div>
  );
}
