import Image from "next/image";
import Link from "next/link";
import blogs from "@/data/blogPosts.json";

export default function BlogSection() {
  return (
    <section className="section">
      <h2 className="heading">📰 Bài Viết Mới</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <Link key={b.id} href={`/blog/${b.id}`} className="card p-4">
            <Image
              src={b.image}
              width={500}
              height={300}
              alt={b.title}
              className="rounded-xl"
            />
            <h3 className="font-bold text-lg mt-2">{b.title}</h3>
            <p className="text-sm text-gray-600">{b.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
