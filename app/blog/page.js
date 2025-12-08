import Image from "next/image";

export default function BlogList() {
  const posts = [
    {
      slug: "xu-huong-nail-2025",
      title: "Xu hướng Nail 2025",
      cover:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200",
      desc: "Những mẫu nail đẹp nhất đang hot năm 2025.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Blog làm đẹp</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <a
            href={`/blog/${p.slug}`}
            key={p.slug}
            className="bg-white shadow rounded-xl overflow-hidden"
          >
            <div className="relative h-48">
              <Image src={p.cover} alt={p.title} fill className="object-cover" />
            </div>

            <div className="p-4">
              <h3 className="font-bold text-xl">{p.title}</h3>
              <p className="text-gray-600">{p.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
