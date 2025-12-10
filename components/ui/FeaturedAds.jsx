"use client";

export default function FeaturedAds() {
  const featured = [
    {
      id: 1,
      title: "Nail Gel Cao Cấp",
      desc: "Giảm 20% hôm nay",
      color: "from-pink-300 to-pink-500",
    },
    {
      id: 2,
      title: "Combo Spa + Nail",
      desc: "Tiết kiệm 30%",
      color: "from-purple-300 to-purple-500",
    },
    {
      id: 3,
      title: "Nail Nghệ Thuật",
      desc: "Chỉ từ 5000 HUF",
      color: "from-rose-300 to-rose-500",
    },
  ];

  return (
    <div className="section card p-6">
      <h2 className="heading">Dịch vụ nổi bật</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((f) => (
          <div
            key={f.id}
            className={`rounded-3xl p-5 text-white shadow-lg bg-gradient-to-br ${f.color}`}
          >
            <h3 className="text-xl font-bold">{f.title}</h3>
            <p className="opacity-90 mt-1">{f.desc}</p>
            <button className="mt-4 bg-white/30 py-2 px-4 rounded-xl">
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
