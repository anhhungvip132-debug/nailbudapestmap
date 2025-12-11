"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full mb-10">
      <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/images/hero.jpg"
          alt="Nail Budapest Map"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/30 flex justify-center items-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
            Tìm Salon Nail Tốt Nhất Tại Budapest
          </h1>
        </div>
      </div>
    </section>
  );
}
