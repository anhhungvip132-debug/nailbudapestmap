import salons from "@/data/salons.json";
import SalonCard from "./SalonCard";

export default function FeaturedSalons() {
  const featured = salons.filter((s) => s.featured);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Featured Nail Salons</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featured.map((salon) => (
          <SalonCard key={salon.id} salon={salon} />
        ))}
      </div>
    </section>
  );
}
