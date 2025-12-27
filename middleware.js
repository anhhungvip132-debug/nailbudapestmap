// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Allow trang login admin
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 🔐 Protect toàn bộ /admin/*
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("__session")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  // ✅ Các route khác (public, api, cron, etc.)
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
