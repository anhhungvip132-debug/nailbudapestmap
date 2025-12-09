"use client";

import salons from "@/lib/salons.json";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedSalons() {
  const featured = salons.slice(0, 4); // Chọn 4 salon nổi bật

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Featured Nail Salons</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((salon) => (
          <Link
            key={salon.id}
            href={`/salon/${salon.id}`}
            className="block rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <Image
              src={salon.images[0]}
              width={300}
              height={200}
              alt={salon.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">{salon.name}</h3>
              <p className="text-sm text-gray-600">{salon.address}</p>
              <p className="text-yellow-500 mt-1">⭐ {salon.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
