import Image from "next/image";
import salons from "@/data/salons.json";

export default function FeaturedSalons() {
  const featured = salons.filter((s) => s.featured);

  return (
    <section className="section">
      <h2 className="heading">💖 Salon Nổi Bật</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((item) => (
          <div key={item.id} className="card p-4">
            <Image
              src={item.image}
              width={500}
              height={300}
              alt={item.name}
              className="rounded-xl"
            />
            <h3 className="font-bold text-lg mt-3">{item.name}</h3>
            <p className="text-gray-600">{item.address}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
