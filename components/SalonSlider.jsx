"use client";

import salons from "@/lib/salons.json";

export default function SalonSlider() {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-6">
      <h2 className="text-3xl font-bold mb-8">Featured Nail Salons</h2>

      <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
        {salons.map((s) => (
          <div key={s.id}
            className="min-w-[260px] bg-white rounded-2xl shadow hover:shadow-xl overflow-hidden">

            <a href={`/salon/${s.id}`}>
              <img src={s.image} className="h-40 w-full object-cover"/>
              <div className="p-4">
                <h3 className="font-bold">{s.name}</h3>
                <p className="text-sm text-gray-500">{s.address}</p>
                <p className="text-yellow-500 mt-1">
                  {"⭐".repeat(s.rating)}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
