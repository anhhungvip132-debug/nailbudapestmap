// app/salon/[id]/page.js

import salons from "@/data/salons.json";
import Image from "next/image";
import dynamic from "next/dynamic";
import RatingStars from "@/components/ui/RatingStars";
import ButtonPink from "@/components/ui/ButtonPink";

const SalonMapSmall = dynamic(
  () => import("@/components/ui/SalonMapSmall"),
  { ssr: false }
);

const ReviewForm = dynamic(
  () => import("@/components/ui/ReviewForm"),
  { ssr: false }
);

const ReviewList = dynamic(
  () => import("@/components/ui/ReviewList"),
  { ssr: false }
);

export default function SalonDetailPage({ params }) {
  const salon = salons.find((s) => String(s.id) === String(params.id));

  if (!salon) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Salon không tồn tại.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden">
        <Image
          src={salon.image || "/images/salon-default.jpg"}
          alt={salon.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-pink-600">{salon.name}</h1>
        <p className="text-gray-600 mt-1">{salon.address}</p>

        <div className="flex items-center gap-3 mt-2">
          <RatingStars rating={salon.rating || 4.5} />
          <span className="text-sm text-gray-500">
            {salon.rating || 4.5} / 5
          </span>
        </div>

        <ButtonPink
          href={`/booking/${salon.id}`}
          text="Đặt lịch ngay"
          className="mt-6"
        />
      </div>

      <section className="bg-white rounded-2xl border border-pink-100 p-6">
        <h2 className="text-xl font-semibold mb-3">Mô tả</h2>
        <p className="text-gray-700">
          {salon.description || "Salon chưa có mô tả."}
        </p>
      </section>

      <section className="bg-white rounded-2xl border border-pink-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Dịch vụ</h2>
        {Array.isArray(salon.services) && salon.services.length > 0 ? (
          <ul className="grid sm:grid-cols-2 gap-3">
            {salon.services.map((sv, i) => (
              <li
                key={i}
                className="px-4 py-2 rounded-xl bg-pink-50 text-sm text-pink-700 font-medium"
              >
                {sv}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Chưa cập nhật dịch vụ.</p>
        )}
      </section>

      <section className="bg-white rounded-2xl border border-pink-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Vị trí</h2>
        <div className="h-64 rounded-xl overflow-hidden">
          <SalonMapSmall salon={salon} />
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-pink-100 p-6 space-y-6">
        <h2 className="text-xl font-semibold">Đánh giá từ khách hàng</h2>

        <ReviewList salonId={salon.id} />

        <ReviewForm salonId={salon.id} />
      </section>
    </div>
  );
}
