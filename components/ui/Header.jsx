"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full shadow bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          NailBooking
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/">Trang chủ</Link>
          <Link href="#featured">Tiệm nổi bật</Link>
          <Link href="#blog">Blog</Link>
          <Link href="#contact">Liên hệ</Link>
        </nav>
      </div>
    </header>
  );
}
