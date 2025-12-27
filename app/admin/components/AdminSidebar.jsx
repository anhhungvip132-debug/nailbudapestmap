"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await signOut(auth);
    router.replace("/admin/login");
  }

  const Item = ({ href, label }) => {
    const active = pathname === href;
    return (
      <button
        onClick={() => router.push(href)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "10px 14px",
          marginBottom: 6,
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          background: active ? "#e91e63" : "transparent",
          color: active ? "#fff" : "#333",
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <aside
      style={{
        width: 220,
        minHeight: "100vh",
        padding: 16,
        borderRight: "1px solid #eee",
        background: "#fff",
      }}
    >
      <h3 style={{ marginBottom: 16 }}>🛠 Admin</h3>

      <Item href="/admin/reviews" label="⭐ Reviews" />
      <Item href="/admin/bookings" label="📅 Bookings" />

      <hr style={{ margin: "16px 0" }} />

      <button
        onClick={logout}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 8,
          border: "none",
          background: "#111",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </aside>
  );
}
