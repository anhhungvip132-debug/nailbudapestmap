import blogPosts from "@/data/blogPosts.json";
import Image from "next/image";

export default function BlogSection() {
  return (
    <section className="my-12">
      <h2 className="text-center text-3xl font-bold mb-8">📰 Bài Viết Mới</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.slice(0, 3).map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
          >
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="font-semibold text-lg mt-4">{post.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
