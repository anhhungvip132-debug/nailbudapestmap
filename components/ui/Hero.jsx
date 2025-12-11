"use client";

import React from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-pink-50 via-white to-white pt-6 md:pt-10 pb-10 md:pb-14">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 grid gap-8 md:grid-cols-[1.2fr,1fr] items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-pink-100 px-3 py-1 text-xs text-pink-600 mb-4">
            <span className="text-lg">💅</span>
            <span>Khám phá các tiệm nail chất lượng tại Budapest</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Tìm tiệm nail <span className="text-pink-500">đẹp nhất</span>{" "}
            gần bạn ở Budapest
          </h1>

          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-xl">
            So sánh các tiệm nail theo quận, dịch vụ, giá và đánh giá khách
            hàng. Đặt lịch nhanh chỉ trong vài giây.
          </p>

          <SearchBar className="mb-4" />

          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500 mt-2">
            <span className="inline-flex items-center gap-1">
              <span className="text-yellow-400">★</span> Gợi ý salon uy tín
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="text-pink-400">📍</span> Xem salon trên bản đồ
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="text-green-400">⚡</span> Đặt lịch nhanh chóng
            </span>
          </div>
        </div>

        <div className="relative h-52 sm:h-64 md:h-72 lg:h-80">
          <div className="absolute inset-0 rounded-3xl bg-pink-100 blur-3xl opacity-60" />
          <div className="relative h-full rounded-3xl overflow-hidden shadow-lg border border-pink-100 bg-white flex items-center justify-center">
            <Image
              src="/images/hero-nails.jpg"
              alt="Nail salon in Budapest"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}