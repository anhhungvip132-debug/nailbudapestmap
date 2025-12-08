"use client";
import Image from "next/image";

const promos = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200",
];

export default function PromoSlider() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      <h2 className="text-3xl font-bold mb-6">Khuyến mãi</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {promos.map((p, i) => (
          <div key={i} className="h-64 rounded-2xl overflow-hidden shadow">
            <Image
              src={p}
              alt="Promo"
              fill
              className="object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
