"use client";

import { useRouter } from "next/navigation";

export default function NearestSalons({ salons = [], onSelectSalon }) {
  const router = useRouter();
  const list = Array.isArray(salons) ? salons : [];

  // ✅ EMPTY STATE
  if (list.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-4 mt-12 mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          📍 Salon gần bạn
        </h2>

        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
          Hãy bật định vị để xem salon gần bạn nhất
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 mt-12 mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📍 Salon gần bạn
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((salon) => (
          <article
            key={salon.id}
            onClick={() => onSelectSalon?.(salon)}
            className="cursor-pointer bg-white rounded-2xl border border-pink-50 shadow-sm hover:shadow-md transition p-5 flex flex-col"
          >
            <h3 className="font-semibold text-lg mb-1">{salon.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{salon.address}</p>

            {typeof salon.distance === "number" && (
              <p className="text-sm text-gray-600 mb-2">
                <strong>Cách bạn:</strong>{" "}
                {salon.distance.toFixed(1)} km
              </p>
            )}

            <div className="mt-auto flex gap-3 pt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${salon.name} ${salon.address}`
                    )}`,
                    "_blank"
                  );
                }}
                className="flex-1 rounded-full bg-pink-500 py-2 text-sm font-semibold text-white hover:bg-pink-600 transition"
              >
                Chỉ đường
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/salon/${salon.id}`);
                }}
                className="flex-1 rounded-full border border-pink-200 py-2 text-sm font-medium text-pink-600 hover:bg-pink-50 transition"
              >
                Xem chi tiết →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
