"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-pink-50 pt-14 pb-24">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Tìm tiệm nail <span className="text-pink-600">đẹp nhất</span> 
            <br /> gần bạn ở Budapest
          </h1>

          <p className="text-lg text-gray-600 max-w-md">
            So sánh các tiệm nail theo quận, dịch vụ, giá và đánh giá khách hàng.  
            Đặt lịch nhanh chỉ trong vài giây.
          </p>
        </div>

        <div className="relative h-72 md:h-96">
          <Image
            src="/images/hero-nails.jpg"
            fill
            alt="Nail salon in Budapest"
            className="object-cover rounded-3xl shadow-xl border border-pink-200"
          />
        </div>

      </div>
    </section>
  );
}
