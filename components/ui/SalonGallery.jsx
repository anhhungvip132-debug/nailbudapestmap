"use client";

import Image from "next/image";

export default function SalonGallery({ salon }) {
  const images = [
    salon.image,
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
  ].filter(Boolean);

  return (
    <section className="grid md:grid-cols-3 gap-4">
      {/* Ảnh lớn bên trái */}
      <div className="relative h-64 md:h-96 md:col-span-2">
        <Image
          src={images[0]}
          alt={salon.name}
          fill
          className="object-cover rounded-3xl shadow-md"
        />
      </div>

      {/* Hai ảnh nhỏ bên phải */}
      <div className="grid gap-4">
        <div className="relative h-44 md:h-46">
          <Image
            src={images[1] || images[0]}
            alt="Salon"
            fill
            className="object-cover rounded-3xl shadow-md"
          />
        </div>
        <div className="relative h-44 md:h-46">
          <Image
            src={images[2] || images[0]}
            alt="Salon"
            fill
            className="object-cover rounded-3xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
