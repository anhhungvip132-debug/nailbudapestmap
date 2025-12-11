"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/search", label: "Bản đồ" },
  { href: "/blog", label: "Blog" },
  { href: "/owner", label: "Dành cho chủ tiệm" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-pink-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-0 py-3 md:py-4">

        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-white font-semibold">
            NB
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-base md:text-lg">
              Nail Budapest Map
            </span>
            <span className="text-xs text-gray-500">
              Tìm tiệm nail đẹp ở Budapest
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-pink-500 ${
                  active ? "text-pink-600" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/owner"
            className="hidden md:inline-flex items-center rounded-full border border-pink-200 px-4 py-2 text-xs md:text-sm font-medium text-pink-600 hover:bg-pink-50 transition"
          >
            Đăng salon của bạn
          </Link>

          <button className="inline-flex items-center rounded-full bg-pink-500 px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-pink-600 transition">
            Đăng nhập
          </button>
        </div>

      </div>
    </header>
  );
}
