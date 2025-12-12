"use client"

import { useEffect, useState } from "react"

function calc(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function NearestSalons({ salons }) {
  const [list, setList] = useState([])

  useEffect(() => {
    if (!navigator.geolocation) return
    if (!Array.isArray(salons) || salons.length === 0) return

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords

      const sorted = salons
        .filter((s) => s.lat && s.lng)
        .map((s) => ({
          ...s,
          dist: calc(latitude, longitude, s.lat, s.lng),
        }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3)

      setList(sorted)
    })
  }, [salons])

  if (!list.length) return null

  return (
    <div>
      {list.map((s) => (
        <div key={s.id} className="card">
          <h3>{s.name}</h3>
          <p>{s.address}</p>
          <small>{s.dist.toFixed(1)} km</small>
        </div>
      ))}
    </div>
  )
}
