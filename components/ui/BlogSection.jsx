"use client";
import posts from "@/data/blogPosts.json";
import Image from "next/image";
import Link from "next/link";

export default function BlogSection() {
  return (
    <section className="py-12">
      <h2 className="text-center text-3xl font-bold mb-6">📰 Bài Viết Mới</h2>

      <div className="grid md:grid-cols-3 gap-6 px-4">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block p-4 bg-white shadow-md rounded-xl hover:shadow-xl"
          >
            <div className="relative w-full h-56 rounded-lg overflow-hidden">
              <Image
                src={`/images/${post.image}`}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-xl font-semibold mt-3">{post.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
