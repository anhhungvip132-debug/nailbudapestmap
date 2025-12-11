import salons from "@/data/salons.json";
import SalonCard from "./SalonCard";

export default function FeaturedAds() {
  const featured = salons.filter((s) => s.featured);

  return (
    <section>
      <h2 className="text-xl font-bold mb-3">Featured Salons</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featured.map((s) => (
          <SalonCard key={s.id} salon={s} />
        ))}
      </div>
    </section>
  );
}
