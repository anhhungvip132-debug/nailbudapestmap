"use client";

const categories = [
  { icon: "✨", label: "Tất cả", value: "" },
  { icon: "💅", label: "Manicure", value: "manicure" },
  { icon: "🦶", label: "Pedicure", value: "pedicure" },
  { icon: "🌈", label: "Gel nails", value: "gel" },
  { icon: "🎨", label: "Nail art", value: "nail art" },
  { icon: "🧖‍♀️", label: "Spa & Thư giãn", value: "spa" },
];

export default function CategoryList({ onSelect }) {
  return (
    <section className="max-w-6xl mx-auto px-4 mb-10">
      <h2 className="text-xl font-semibold mb-4">Dịch vụ nổi bật</h2>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((c, i) => (
          <button
            key={i}
            onClick={() => onSelect(c.value)}
            className="px-4 py-2 rounded-full border border-pink-200 bg-white text-sm font-medium hover:bg-pink-50 flex items-center gap-2"
          >
            <span>{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>
    </section>
  );
}
