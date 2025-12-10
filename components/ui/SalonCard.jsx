"use client";
import Image from "next/image";
import RatingStars from "./RatingStars";

export default function SalonCard({ salon }) {
  return (
    <div className="rounded-3xl bg-white shadow-lg overflow-hidden hover:scale-[1.02] transition">
      <div className="relative w-full h-40">
        <Image
          src={salon.image || "/images/salon-default.jpg"}
          alt={salon.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-pink-600">{salon.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{salon.address}</p>

        <div className="mt-2">
          <RatingStars rating={salon.rating || 4.5} />
        </div>

        <a
          href={`/salon/${salon.id}`}
          className="block w-full mt-4 text-center bg-pink-500 text-white py-2 rounded-xl font-medium"
        >
          Xem chi tiết
        </a>
      </div>
    </div>
  );
}
