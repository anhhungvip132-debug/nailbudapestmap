import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ CHỈ protect đúng admin pages (KHÔNG API)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    const auth = req.headers.get("authorization");

    if (!auth) {
      return new Response("Auth required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin"',
        },
      });
    }

    const [user, pass] = Buffer.from(
      auth.split(" ")[1],
      "base64"
    )
      .toString()
      .split(":");

    if (
      user !== process.env.ADMIN_USER ||
      pass !== process.env.ADMIN_PASS
    ) {
      return new Response("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
