export default async function CategoryPage({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/salons`);
  const salons = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Danh mục: {params.slug}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {salons.slice(0, 6).map((s) => (
          <a href={`/salon/${s.id}`} key={s.id} className="p-4 shadow rounded-xl">
            {s.name}
          </a>
        ))}
      </div>
    </div>
  );
}
