"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function FeaturedSalons({ salons = [] }) {
  const router = useRouter();

  const filtered = Array.isArray(salons)
    ? salons.filter((s) => s && s.featured)
    : [];

  if (!filtered.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 mt-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        💖 Salon nổi bật
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((salon) => (
          <article
            key={salon.id || salon.slug}
            className="bg-white rounded-2xl shadow-sm border border-pink-50 overflow-hidden flex flex-col"
          >
            {salon.image && (
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={salon.image}
                  alt={salon.name || "Nail salon"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {salon.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {salon.address}
                  </p>
                </div>

                {salon.district && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-medium whitespace-nowrap">
                    District {salon.district}
                  </span>
                )}
              </div>

              {Array.isArray(salon.services) && salon.services.length > 0 && (
                <p className="mt-4 text-sm">
                  <span className="font-semibold">Dịch vụ:</span>{" "}
                  {salon.services.join(", ")}
                </p>
              )}

              {Array.isArray(salon.highlightedServices) &&
                salon.highlightedServices.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {salon.highlightedServices.map((svc, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-medium flex items-center gap-1"
                      >
                        ⭐ {svc}
                      </span>
                    ))}
                  </div>
                )}

              {salon.featured && (
                <div className="mt-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">
                    ⭐ Đề xuất
                  </span>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const mapsQuery = encodeURIComponent(
                      `${salon.name || ""} ${salon.address || ""} Budapest`
                    );
                    if (typeof window !== "undefined") {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
                        "_blank"
                      );
                    }
                  }}
                  className="flex-1 inline-flex items-center justify-center rounded-full border border-pink-200 px-4 py-2 text-sm font-medium text-pink-600 hover:bg-pink-50 transition"
                >
                  Chỉ đường
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.push(`/salon/${salon.slug || salon.id}`)
                  }
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 transition"
                >
                  Xem chi tiết →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}