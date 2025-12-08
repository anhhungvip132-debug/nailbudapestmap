"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SalonSlider({ images = [] }) {
  // Nếu không có ảnh, tránh lỗi UI
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-xl">
        <p className="text-gray-600 text-sm">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 rounded-2xl overflow-hidden shadow">
      <Swiper
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[300px] relative">
              <Image
                src={src}
                alt={`Salon Image ${index}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
