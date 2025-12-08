export default async function SearchPage({ searchParams }) {
  const q = (searchParams.q || "").toLowerCase();

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/salons`, {
    cache: "no-store",
  });
  const salons = await res.json();

  const results = salons.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.district?.toLowerCase().includes(q)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Kết quả tìm kiếm: "{searchParams.q}"
      </h1>

      {results.length === 0 && (
        <p className="text-gray-600">Không tìm thấy salon phù hợp.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {results.map((s) => (
          <a
            key={s.id}
            href={`/salon/${s.id}`}
            className="p-5 bg-white shadow rounded-xl hover:shadow-xl transition"
          >
            <p className="font-bold text-lg">{s.name}</p>
            <p className="text-gray-600">{s.address}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
