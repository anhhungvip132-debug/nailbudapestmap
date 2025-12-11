import salons from "@/data/salons.json";
import Image from "next/image";

export default function FeaturedSalons() {
  const featured = salons.filter((s) => s.featured);

  return (
    <section className="my-12">
      <h2 className="text-center text-3xl font-bold mb-8">
        💖 Salon Nổi Bật
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((salon) => (
          <div
            key={salon.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
          >
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={salon.image}
                alt={salon.name}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="font-semibold text-lg mt-4">{salon.name}</h3>
            <p className="text-gray-600 text-sm">{salon.address}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
