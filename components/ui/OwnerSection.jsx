"use client";
import Image from "next/image";

export default function OwnerSection() {
  return (
    <section className="py-14 px-6">
      <h2 className="text-center text-3xl font-bold mb-10">
        👩‍💼 Người sáng lập Nail Budapest Map
      </h2>

      <div className="bg-white shadow-md p-8 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">

        <div className="relative w-60 h-60 overflow-hidden rounded-full shadow-md">
          <Image
            src="/images/owner.jpg"
            alt="Founder"
            fill
            className="object-cover"
          />
        </div>

        <p className="text-lg leading-relaxed">
          Xin chào! Tôi là <b>người sáng lập dự án Nail Budapest Map</b>.  
          Mục tiêu của tôi là mang đến trải nghiệm tìm kiếm salon nail tốt nhất dành cho cộng đồng tại Budapest.
        </p>
      </div>
    </section>
  );
}
