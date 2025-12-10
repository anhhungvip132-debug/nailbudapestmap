"use client";
import salons from "@/data/salons.json";
import SalonCard from "./SalonCard";

export default function FeaturedSalons() {
  const featured = salons.filter((s) => s.featured);

  return (
    <div className="section">
      <h2 className="heading">Salon nổi bật</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((salon) => (
          <SalonCard key={salon.id} salon={salon} />
        ))}
      </div>
    </div>
  );
}
