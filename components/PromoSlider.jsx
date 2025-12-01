"use client";

export default function PromoSlider() {
  const promos = [
    { id: 1, title: "Combo Mani - Pedi", discount: "-20%" },
    { id: 2, title: "Gel Nails Premium", discount: "FREE ART" },
    { id: 3, title: "Spa Relax Combo", discount: "-15%" }
  ];

  return (
    <section className="max-w-7xl mx-auto mt-20 px-6">
      <h2 className="text-3xl font-bold mb-8 text-pink-600">
        🔥 Dịch vụ khuyến mãi & nổi bật
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
        {promos.map((p) => (
          <div key={p.id}
              className="min-w-[260px] bg-white p-6 rounded-2xl shadow hover:shadow-xl relative">

            <span className="absolute top-3 left-3 bg-pink-600 text-white px-3 py-1 rounded">
              {p.discount}
            </span>

            <h3 className="font-bold text-xl text-pink-600">{p.title}</h3>

            <a href={`/promo/${p.id}`}>
              <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-xl">
                Xem chi tiết
              </button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
