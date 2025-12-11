"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-lg mb-10">
      <Image
        src="/images/hero.jpg"
        alt="Hero Banner"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
          Tìm Salon Nail Tốt Nhất Tại Budapest
        </h1>
      </div>
    </section>
  );
}
