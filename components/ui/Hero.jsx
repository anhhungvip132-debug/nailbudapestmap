"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-md">
      <Image
        src="/images/hero.jpg"
        alt="Nail Budapest Hero"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-3">
          Find the Best Nail Salons in Budapest
        </h1>
        <p className="text-lg opacity-90">
          Search, compare, and book your perfect nail experience.
        </p>
      </div>
    </section>
  );
}
