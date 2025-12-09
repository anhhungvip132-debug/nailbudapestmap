"use client";

import Image from "next/image";

export default function SalonSlider({ images }) {
  if (!Array.isArray(images)) images = [];

  return (
    <div className="flex gap-4 overflow-x-auto py-3">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          width={300}
          height={200}
          className="rounded-xl object-cover"
          alt="Salon image"
        />
      ))}
    </div>
  );
}
