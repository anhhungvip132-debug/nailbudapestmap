"use client"

const CATEGORIES = [
  { id: "all", label: "✨ Tất cả" },
  { id: "manicure", label: "💅 Manicure" },
  { id: "pedicure", label: "🦶 Pedicure" },
  { id: "gel", label: "🌈 Gel nails" },
  { id: "art", label: "🎨 Nail art" },
  { id: "spa", label: "🧖 Spa & Thư giãn" },
]

export default function CategoryList() {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          className="px-4 py-2 rounded-full border text-sm hover:bg-black hover:text-white"
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
