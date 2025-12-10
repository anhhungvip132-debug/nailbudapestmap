"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroSlider() {
  const slides = [
    "/images/nail1.jpg",
    "/images/nail2.jpg",
    "/images/nail3.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      3500
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[300px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg">
      <Image
        src={slides[index]}
        alt="Nail Budapest Hero"
        fill
        className="object-cover transition-all duration-700 ease-in-out"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
          Nghệ Thuật Nail Budapest
        </h1>
      </div>
    </div>
  );
}
