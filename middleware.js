import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ LUÔN CHO PHÉP LOGIN
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 🔒 BẢO VỆ ADMIN PRIVATE
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("__session")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
