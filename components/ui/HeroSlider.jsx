"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroSlider() {
  const slides = [
    "/images/nail1.jpg",
    "/images/nail2.jpg",
    "/images/nail3.jpg"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
      <Image
        src={slides[current]}
        alt="Nail Budapest Slider"
        fill
        className="object-cover"
      />
    </div>
  );
}
