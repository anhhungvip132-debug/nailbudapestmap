"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm border-b border-pink-100">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          💅 Nail Budapest Map
        </Link>

        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-pink-500">Trang chủ</Link>
          <Link href="/blog" className="hover:text-pink-500">Blog</Link>
          <Link href="/register" className="hover:text-pink-500">Đăng ký</Link>
        </nav>
      </div>
    </header>
  );
}
