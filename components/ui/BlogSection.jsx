"use client";

import posts from "@/data/blogPosts.json";

export default function BlogSection() {
  return (
    <section className="mt-12">
      <h2 className="text-center text-2xl font-bold">📰 Bài Viết Mới</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {posts.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <img
              src={p.image}
              className="w-full h-48 object-cover rounded-lg"
              alt={p.title}
            />
            <h3 className="font-bold mt-3">{p.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
