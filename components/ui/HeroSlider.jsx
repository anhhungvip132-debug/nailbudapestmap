"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[420px] rounded-2xl overflow-hidden mb-10">
      <Image
        src="/images/banner1.jpg"
        alt="Nail Budapest Banner"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl font-bold drop-shadow-lg">
          Budapest Nail Map
        </h1>
        <p className="text-white text-lg mt-3 max-w-xl">
          Khám phá tiệm nail chất lượng nhất Budapest. Tìm kiếm, đặt lịch và xem đánh giá trong 1 chạm.
        </p>
      </div>
    </section>
  );
}
