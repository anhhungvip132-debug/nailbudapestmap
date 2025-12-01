"use client";

import { useEffect } from "react";

export default function HeroSlider() {
  useEffect(() => {
    let index = 0;
    const slides = document.querySelectorAll(".hero-slide");

    setInterval(() => {
      slides.forEach((s, i) => (s.style.opacity = i === index ? 1 : 0));
      index = (index + 1) % slides.length;
    }, 5000);
  }, []);

  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      <div className="absolute inset-0 hero-slide transition-opacity duration-700 opacity-100">
        <img src="https://images.unsplash.com/photo-1604654894610-68efc5f95f31?w=1600"
             className="w-full h-full object-cover"/>
      </div>

      <div className="absolute inset-0 hero-slide transition-opacity duration-700 opacity-0">
        <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600"
             className="w-full h-full object-cover"/>
      </div>

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold">Tìm & Đặt lịch tiệm nail</h1>
        <p className="text-lg mt-2">Nhanh chóng – Chính xác – Đúng gần bạn nhất</p>
      </div>
    </section>
  );
}
