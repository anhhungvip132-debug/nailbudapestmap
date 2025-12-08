"use client";

import { useEffect } from "react";

export default function Lightbox({ open, image, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-4xl font-light"
      >
        ×
      </button>

      {/* Previous */}
      <button
        onClick={onPrev}
        className="absolute left-4 text-white text-4xl px-3"
      >
        ‹
      </button>

      {/* Image */}
      <img
        src={image}
        className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
      />

      {/* Next */}
      <button
        onClick={onNext}
        className="absolute right-4 text-white text-4xl px-3"
      >
        ›
      </button>
    </div>
  );
}
