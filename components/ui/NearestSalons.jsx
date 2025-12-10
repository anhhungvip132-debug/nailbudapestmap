"use client";
import salons from "@/data/salons.json";
import SalonCard from "./SalonCard";

export default function NearestSalons() {
  const list = salons.slice(0, 3);

  return (
    <div className="section">
      <h2 className="heading">Salon gần bạn</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {list.map((salon) => (
          <SalonCard key={salon.id} salon={salon} />
        ))}
      </div>
    </div>
  );
}
