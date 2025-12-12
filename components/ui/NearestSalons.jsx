"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function NearestSalons({ salons = [] }) {
  const [pos, setPos] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (p) => setPos({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setPos(null)
    )
  }, [])

  const nearest = useMemo(() => {
    if (!pos || !Array.isArray(salons)) return []
    return salons
      .filter((s) => typeof s.latitude === "number" && typeof s.longitude === "number")
      .map((s) => ({
        ...s,
        _distance: haversine(
          pos.lat,
          pos.lng,
          s.latitude,
          s.longitude
        ),
      }))
      .sort((a, b) => a._distance - b._distance)
      .slice(0, 6)
  }, [pos, salons])

  if (!pos) {
    return <p>Cho phép truy cập vị trí để xem salon gần bạn.</p>
  }

  if (nearest.length === 0) {
    return <p>Không tìm thấy salon gần bạn.</p>
  }

  return (
    <div className="list">
      {nearest.map((s) => (
        <article key={s.id} className="card">
          {s.imageUrl ? (
            <img src={s.imageUrl} alt={s.name} />
          ) : null}

          <div className="card-body">
            <h3 className="card-title">{s.name}</h3>
            <p className="card-meta">{s.address || ""}</p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="badge">
                📍 {s._distance.toFixed(2)} km
              </span>
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
