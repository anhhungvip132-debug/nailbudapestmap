"use client";

import Image from "next/image";

export default function SalonHero({ salon }) {
  return (
    <div className="relative w-full h-[360px] md:h-[480px] rounded-b-3xl overflow-hidden shadow-xl">
      <Image
        src={salon.image}
        alt={salon.name}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute bottom-10 left-8 text-white">
        <h1 className="text-4xl font-bold">{salon.name}</h1>
        <p className="text-lg mt-1">{salon.address}</p>
        <p className="mt-2 text-yellow-300 text-xl">
          {"★".repeat(salon.rating)}
        </p>
      </div>
    </div>
  );
}
