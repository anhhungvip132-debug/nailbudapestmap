"use client";

import Image from "next/image";

export default function HeroSlider() {
  return (
    <section className="w-full mt-6">
      <div className="relative h-[260px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg">

        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600"
          alt="Nail salon Budapest – Hero banner"
          fill
          loading="eager"
          priority={true}       // TĂNG ĐIỂM SEO
          className="object-cover"
          placeholder="blur"
          blurDataURL="/placeholder.png"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-6">
            Tìm tiệm nail tốt nhất ở Budapest
          </h1>
        </div>

      </div>
    </section>
  );
}
