"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full pb-10 pt-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        
        {/* LEFT TEXT */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Tìm Salon Nail Uy Tín Nhất Tại Budapest
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Khám phá các salon chất lượng cao, đánh giá chi tiết và ưu đãi mới nhất.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              href="/register"
              className="px-6 py-3 bg-pink-600 text-white rounded-xl shadow-md hover:bg-pink-700 transition"
            >
              Đăng ký Salon
            </Link>

            <Link
              href="/blog"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
            >
              Xem Blog
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/hero.jpg"
              alt="Nail Salon"
              width={600}
              height={400}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
