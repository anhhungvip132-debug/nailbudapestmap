"use client";

import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <p className="text-sm text-gray-500 mb-2">
          {new Date(post.date).toLocaleDateString("vi-VN")}
        </p>
        <h3 className="font-bold text-xl mb-2">{post.title}</h3>
        <p className="text-gray-600">{post.excerpt}</p>

        <p className="mt-4 text-pink-600 font-semibold text-sm">
          Đọc tiếp →
        </p>
      </div>
    </Link>
  );
}
