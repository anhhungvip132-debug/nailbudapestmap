"use client";

import React from "react";

const categories = [
  { id: "all", label: "Tất cả", icon: "✨", value: "" },
  { id: "manicure", label: "Manicure", icon: "💅", value: "manicure" },
  { id: "pedicure", label: "Pedicure", icon: "🦶", value: "pedicure" },
  { id: "gel", label: "Gel nails", icon: "🌈", value: "gel" },
  { id: "nail-art", label: "Nail art", icon: "🎨", value: "nail-art" },
  { id: "spa", label: "Spa & Thư giãn", icon: "🧖‍♀️", value: "spa" },
];

export default function CategoryList({ active, onSelect }) {
  const current = active || "";

  function handleClick(value) {
    if (onSelect) {
      onSelect(value);
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg md:text-xl font-semibold">
          Dịch vụ nổi bật
        </h2>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const selected =
            !current && !cat.value ? true : current === cat.value;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleClick(cat.value)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 md:px-4 py-2 text-xs md:text-sm transition ${
                selected
                  ? "bg-pink-500 border-pink-500 text-white"
                  : "bg-white border-pink-100 text-gray-700 hover:border-pink-300"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}