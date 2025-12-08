"use client";

import Link from "next/link";

const categories = [
  { name: "Nail Gel", icon: "💅", slug: "gel-nails" },
  { name: "Nail Art", icon: "🎨", slug: "nail-art" },
  { name: "Manicure", icon: "✨", slug: "manicure" },
  { name: "Pedicure", icon: "🦶", slug: "pedicure" },
  { name: "Spa", icon: "🌺", slug: "spa" },
];

export default function CategoryList() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Danh mục dịch vụ
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="p-5 bg-white shadow rounded-2xl flex flex-col items-center hover:shadow-xl transition"
          >
            <div className="text-4xl">{c.icon}</div>
            <span className="mt-3 font-semibold text-gray-700">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
