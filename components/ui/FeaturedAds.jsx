"use client";

import Image from "next/image";
import Link from "next/link";

const featured = [
  {
    id: 1,
    name: "Edi Nails Premium",
    address: "Mozsár u. 6, Budapest",
    image: "https://images.unsplash.com/photo-1558211583-d26f610c97f6?auto=format&w=900&q=80",
  },
  {
    id: 2,
    name: "Luxury Nail Spa",
    address: "Jókai tér 1, Budapest",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&w=900&q=80",
  },
  {
    id: 3,
    name: "VIP Nail Design",
    address: "József krt. 36, Budapest",
    image: "https://images.unsplash.com/photo-1604654894610-68efc5f95f31?auto=format&w=900&q=80",
  },
];

export default function FeaturedAds() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Salon nổi bật</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((s) => (
          <div key={s.id} className="shadow p-4 rounded-xl bg-white">
            <Image
              src={s.image}
              width={600}
              height={400}
              className="rounded-xl object-cover"
              alt={s.name}
            />
            <h3 className="text-lg font-bold mt-3">{s.name}</h3>
            <p className="text-gray-600">{s.address}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
