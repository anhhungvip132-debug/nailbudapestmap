export default function CategoryList() {
  const items = [
    "✨ Tất cả",
    "💅 Manicure",
    "🦶 Pedicure",
    "🌈 Gel nails",
    "🎨 Nail art",
    "🧖 Spa & Thư giãn",
  ]

  return (
    <div className="category-list">
      {items.map((i) => (
        <span key={i} className="chip">{i}</span>
      ))}
    </div>
  )
}
