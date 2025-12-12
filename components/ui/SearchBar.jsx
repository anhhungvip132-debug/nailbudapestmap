"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const router = useRouter()

  const [q, setQ] = useState("")
  const [district, setDistrict] = useState("")
  const [service, setService] = useState("")
  const [featuredOnly, setFeaturedOnly] = useState(false)

  const districts = useMemo(
    () => [
      "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX",
      "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII",
      "XIX", "XX", "XXI", "XXII", "XXIII",
    ],
    []
  )

  const services = useMemo(
    () => ["", "Manicure", "Pedicure", "Gel nails", "Nail art", "Spa & Thư giãn", "Acrylic"],
    []
  )

  function onSubmit(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set("q", q.trim())
    if (district) params.set("district", district)
    if (service) params.set("service", service)
    if (featuredOnly) params.set("featured", "1")
    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="search-grid">
        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
            Tên salon hoặc địa chỉ
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ví dụ: Nailbar Budapest, Andrássy út..."
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
            Quận
          </label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)}>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d ? `Quận ${d}` : "Tất cả quận"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
            Dịch vụ
          </label>
          <select value={service} onChange={(e) => setService(e.target.value)}>
            {services.map((s) => (
              <option key={s} value={s}>
                {s || "Tất cả dịch vụ"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => setFeaturedOnly(e.target.checked)}
            style={{ width: 16, height: 16 }}
          />
          Chỉ hiển thị salon nổi bật
        </label>

        <div style={{ flex: 1 }} />

        <button type="submit">Tìm salon</button>
      </div>
    </form>
  )
}
