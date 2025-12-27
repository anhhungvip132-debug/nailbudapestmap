/**
 * adminFetch
 * - CLIENT ONLY
 * - Always attach auth for /api/admin/*
 * - Priority: Firebase ID Token
 * - Fallback: x-admin-key (DEV / LOCAL)
 * - Auto logout + redirect on 401 / 403
 *
 * ❌ NEVER import firebase-admin
 * ❌ NEVER audit in client
 */

let authFailHandled = false;

export async function adminFetch(url, options = {}) {
  const headers = new Headers(options.headers || {});
  let hasAuth = false;

  /* ================= FIREBASE TOKEN ================= */
  try {
    const { getAuth } = await import("firebase/auth");
    const auth = getAuth();
    const user = auth?.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken(true);
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
          hasAuth = true;
        }
      } catch (_) {}
    }
  } catch (_) {
    // firebase not ready
  }

  /* ================= DEV FALLBACK ================= */
  if (!hasAuth && process.env.NEXT_PUBLIC_ADMIN_API_KEY) {
    headers.set(
      "x-admin-key",
      process.env.NEXT_PUBLIC_ADMIN_API_KEY
    );
    hasAuth = true;
  }

  if (!hasAuth) {
    console.error("❌ adminFetch WITHOUT AUTH:", url);
  }

  const res = await fetch(url, {
    ...options,
    headers,
    cache: options.cache ?? "no-store",
  });

  /* ================= AUTH FAIL ================= */
  if ((res.status === 401 || res.status === 403) && !authFailHandled) {
    authFailHandled = true;

    try {
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      await auth.signOut().catch(() => {});
    } catch (_) {}

    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 100);
    }
  }

  return res;
}
