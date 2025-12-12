"use client"

import Link from "next/link"

export default function FeaturedSalons({ salons = [] }) {
  if (!Array.isArray(salons) || salons.length === 0) {
    return <p>Không có salon nổi bật.</p>
  }

  // Lấy salon có rating cao (>=4) làm nổi bật
  const featured = salons
    .filter((s) => (s.rating ?? 0) >= 4)
    .slice(0, 6)

  if (featured.length === 0) {
    return <p>Chưa có salon nổi bật.</p>
  }

  return (
    <div className="list">
      {featured.map((s) => (
        <article key={s.id} className="card">
          {s.imageUrl ? (
            <img src={s.imageUrl} alt={s.name} />
          ) : null}

          <div className="card-body">
            <h3 className="card-title">{s.name}</h3>
            <p className="card-meta">{s.address || ""}</p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="badge">⭐ {Number(s.rating ?? 0).toFixed(1)}</span>
              <span className="badge">
                🗣️ {s.reviewCount ?? 0} reviews
              </span>
            </div>

            <div style={{ marginTop: 12 }}>
              <Link href={`/salon/${s.id}`}>
                <button>Chi tiết</button>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
