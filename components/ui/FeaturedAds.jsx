export default function FeaturedSalons({ salons }) {
  return (
    <section className="mb-14">
      <h2 className="text-center text-3xl font-bold mb-6">💖 Salon Nổi Bật</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {salons.map((s, i) => (
          <div key={i} className="shadow rounded-xl overflow-hidden bg-white">
            <img src={s.image} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-gray-600">{s.address}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
