"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg"
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      3000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-xl shadow-lg">
      <Image
        src={slides[index]}
        alt="Nail Budapest Hero"
        fill
        className="object-cover transition-all duration-500"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl font-bold drop-shadow-lg">
          Discover the Best Nail Salons in Budapest
        </h1>
      </div>
    </div>
  );
}
