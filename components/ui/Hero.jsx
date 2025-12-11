"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[350px] rounded-xl overflow-hidden mt-3">
      <Image
        src="/images/hero.jpg"
        alt="Hero banner"
        fill
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Tìm Salon Nail Tốt Nhất Tại Budapest
        </h1>
      </div>
    </section>
  );
}
