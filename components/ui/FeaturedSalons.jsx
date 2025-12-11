import salons from "@/data/salons.json";

export default function FeaturedSalons() {
  const featured = salons.slice(0, 3);

  return (
    <section>
      <h2>💖 Salon Nổi Bật</h2>
      <div className="grid">
        {featured.map(s => (
          <div key={s.id} className="card">
            <img src={s.image} alt={s.name} />
            <h3>{s.name}</h3>
            <p>{s.address}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
