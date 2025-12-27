import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ===== Protect Admin APIs =====
  if (pathname.startsWith("/api/admin")) {
    const adminKey = req.headers.get("x-admin-key");
    const secret = process.env.ADMIN_API_KEY;

    // DEV / EMERGENCY ACCESS
    if (adminKey && secret && adminKey === secret) {
      return NextResponse.next();
    }

    // PRODUCTION: allow Bearer token (verify in route handler)
    const auth = req.headers.get("authorization");
    if (auth && auth.startsWith("Bearer ")) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: "Unauthorized (middleware)" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
