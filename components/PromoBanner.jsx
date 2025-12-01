"use client";

import { useEffect } from "react";

export default function PromoBanner() {
  useEffect(() => {
    let index = 0;
    const slides = document.querySelectorAll(".promo-slide");

    setInterval(() => {
      slides.forEach((s, i) => (s.style.opacity = i === index ? 1 : 0));
      index = (index + 1) % slides.length;
    }, 5000);
  }, []);

  return (
    <section className="max-w-6xl mx-auto mt-14 px-6 relative h-64 md:h-80">
      <div className="promo-slide absolute inset-0 transition-opacity duration-500 opacity-100">
        <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600"
             className="w-full h-full rounded-3xl object-cover"/>
      </div>
      <div className="promo-slide absolute inset-0 transition-opacity duration-500 opacity-0">
        <img src="https://images.unsplash.com/photo-1604654894610-68efc5f95f31?w=1600"
             className="w-full h-full rounded-3xl object-cover"/>
      </div>
    </section>
  );
}
