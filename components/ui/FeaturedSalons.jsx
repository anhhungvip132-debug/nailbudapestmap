"use client"

import SalonCard from "./SalonCard"

export default function FeaturedSalons({ salons }) {
  if (!Array.isArray(salons) || salons.length === 0) {
    return <p>Không có salon nổi bật.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {salons.map((salon) => (
        <SalonCard key={salon.id} salon={salon} />
      ))}
    </div>
  )
}
