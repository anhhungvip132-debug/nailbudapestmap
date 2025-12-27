"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter, usePathname } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    const ok = confirm("Logout admin?");
    if (!ok) return;

    await signOut(auth);
    router.push("/admin/login");
  }

  const link = (href, label) => (
    <button
      onClick={() => router.push(href)}
      style={{
        marginRight: 12,
        padding: "8px 12px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        background: pathname === href ? "#e91e63" : "#f2f2f2",
        color: pathname === href ? "#fff" : "#333",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <b style={{ marginRight: 16 }}>💅 NailBudapestMap Admin</b>
        {link("/admin/reviews", "Reviews")}
        {link("/admin/bookings", "Bookings")}
      </div>

      <button
        onClick={logout}
        style={{
          background: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "8px 14px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
