"use client";

import Image from "next/image";

export default function PromoSlider() {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-4">
      <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600"
          alt="Khuyến mãi nail"
          fill
          className="object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/placeholder.png"
        />
      </div>
    </section>
  );
}
