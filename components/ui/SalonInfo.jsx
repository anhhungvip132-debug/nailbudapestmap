"use client";

import { useRouter } from "next/navigation";

export default function SalonInfo({ salon }) {
  const router = useRouter();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">{salon.name}</h1>

      <p className="text-gray-600 mb-4">{salon.address}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {salon.services.map((s, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm bg-pink-50 border border-pink-200 text-pink-700 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => router.push(`/booking/${salon.id}`)}
          className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-xl hover:bg-pink-600"
        >
          Đặt lịch ngay
        </button>

        <button
          onClick={() => {
            const q = encodeURIComponent(
              `${salon.name} ${salon.address} Budapest`
            );
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${q}`,
              "_blank"
            );
          }}
          className="px-6 py-3 border border-pink-300 text-pink-600 rounded-xl hover:bg-pink-50"
        >
          Chỉ đường
        </button>
      </div>
    </section>
  );
}
