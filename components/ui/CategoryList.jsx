"use client"

import { useRouter } from "next/navigation"

const CATS = [
  { label: "✨ Tất cả", value: "" },
  { label: "💅 Manicure", value: "Manicure" },
  { label: "🦶 Pedicure", value: "Pedicure" },
  { label: "🌈 Gel nails", value: "Gel nails" },
  { label: "🎨 Nail art", value: "Nail art" },
  { label: "🧖 Spa & Thư giãn", value: "Spa & Thư giãn" },
]

export default function CategoryList() {
  const router = useRouter()

  function go(service) {
    const params = new URLSearchParams()
    if (service) params.set("service", service)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {CATS.map((c) => (
        <button
          key={c.label}
          type="button"
          className="badge"
          onClick={() => go(c.value)}
          style={{ border: "1px solid var(--border)", background: "#fff", color: "#111" }}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
