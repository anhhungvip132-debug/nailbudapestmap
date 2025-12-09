"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function SalonGallery({ images = [] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const slides = images.map((src) => ({ src }));

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <Image
              src={src}
              alt={`Salon image ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={slides}
      />
    </div>
  );
}
