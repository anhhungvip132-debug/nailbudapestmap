"use client";
import salons from "@/data/salons.json";
import Image from "next/image";

export default function FeaturedSalons() {
  const featured = salons.filter((s) => s.featured);

  return (
    <section className="py-10">
      <h2 className="text-center text-3xl font-bold mb-6">
        💖 Salon Nổi Bật
      </h2>

      <div className="grid md:grid-cols-3 gap-6 px-4">
        {featured.map((salon) => (
          <div
            key={salon.id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
          >
            <div className="relative w-full h-56 rounded-lg overflow-hidden">
              <Image
                src={`/images/${salon.image}`}
                alt={salon.name}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-xl font-semibold mt-3">{salon.name}</h3>
            <p className="text-gray-500">{salon.address}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
