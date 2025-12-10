"use client";

import blogs from "@/data/blogPosts.json";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      const found = blogs.find((b) => b.id.toString() === id.toString());
      setBlog(found);
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="p-10 text-center">
        <p className="text-xl font-semibold">Không tìm thấy bài viết.</p>
        <Link href="/blog" className="text-pink-500 underline mt-4 inline-block">
          ← Quay lại Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <Link href="/blog" className="text-pink-500 underline block mb-6">
        ← Quay lại Blog
      </Link>

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <p className="text-gray-500 mb-8 text-lg">{blog.date}</p>

      <div className="mb-8">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1000}
          height={600}
          className="rounded-xl shadow-lg w-full"
        />
      </div>

      <article className="prose max-w-none text-lg leading-relaxed">
        {blog.content?.split("\n").map((p, i) => (
          <p key={i} className="mb-4">
            {p}
          </p>
        ))}
      </article>

      <hr className="my-10" />

      <h2 className="text-2xl font-semibold mb-4">Bài viết khác</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs
          .filter((b) => b.id !== blog.id)
          .slice(0, 3)
          .map((item) => (
            <Link
              key={item.id}
              href={`/blog/${item.id}`}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={250}
                className="rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </Link>
          ))}
      </div>
    </div>
  );
}
