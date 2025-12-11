"use client";

import React from "react";
import Link from "next/link";

const posts = [
  {
    slug: "tip-chon-tiem-nail-budapest",
    title: "5 tips để chọn tiệm nail uy tín tại Budapest",
    excerpt:
      "Cách kiểm tra review, vệ sinh, sản phẩm và tay nghề thợ trước khi đặt lịch làm nail.",
    readTime: "4 phút đọc",
  },
  {
    slug: "xu-huong-nail-2025",
    title: "Xu hướng mẫu nail 2025 tại châu Âu",
    excerpt:
      "Những mẫu nail đang được ưa chuộng tại Budapest, Paris và Berlin mà bạn không nên bỏ lỡ.",
    readTime: "5 phút đọc",
  },
  {
    slug: "kinh-nghiem-dat-lich-online",
    title: "Kinh nghiệm đặt lịch làm nail online không bị trễ giờ",
    excerpt:
      "Một vài mẹo nhỏ để bạn luôn chủ động thời gian khi đặt lịch làm nail.",
    readTime: "3 phút đọc",
  },
];

export default function BlogSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 mt-10 mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">📚 Blog làm đẹp</h2>
        <Link
          href="/blog"
          className="text-sm text-pink-600 hover:text-pink-700 font-medium"
        >
          Xem tất cả
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-2xl border border-pink-50 shadow-sm p-5 flex flex-col"
          >
            <h3 className="font-semibold text-base md:text-lg mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 flex-1">
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>{post.readTime}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Đọc thêm →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}