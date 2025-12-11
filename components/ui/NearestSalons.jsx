use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NearestSalons({ salons = [] }) {
  const router = useRouter();
  const list = Array.isArray(salons) ? salons : [];

  return (
    <section className="max-w-6xl mx-auto px-4 mt-12 mb-12">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📍</span>
        <h2 className="text-2xl md:text-3xl font-bold">Salon gần bạn nhất</h2>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-gray-500">
          Hãy bật định vị trình duyệt để nhận gợi ý những salon ở gần bạn nhất
          tại Budapest.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((salon) => (
            <article
              key={salon.id || salon.slug}
              className="bg-white rounded-2xl shadow-sm border border-pink-50 p-5 flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-1">{salon.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{salon.address}</p>

              {typeof salon.distanceKm === "number" && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Cách bạn ~</span>{" "}
                  {salon.distanceKm.toFixed(1)} km
                </p>
              )}

              {Array.isArray(salon.services) && salon.services.length > 0 && (
                <p className="text-sm mb-3">
                  <span className="font-semibold">Dịch vụ:</span>{" "}
                  {salon.services.join(", ")}
                </p>
              )}

              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const q = encodeURIComponent(
                      `${salon.name || ""} ${salon.address || ""} Budapest`
                    );
                    if (typeof window !== "undefined") {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${q}`,
                        "_blank"
                      );
                    }
                  }}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 transition"
                >
                  Chỉ đường
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.push(`/salon/${salon.slug || salon.id}`)
                  }
                  className="flex-1 inline-flex items-center justify-center rounded-full border border-pink-200 px-4 py-2 text-sm font-medium text-pink-600 hover:bg-pink-50 transition"
                >
                  Xem chi tiết →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}