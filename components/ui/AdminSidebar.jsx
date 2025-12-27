// components/ui/AdminSidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Salons", href: "/admin/salons", icon: "🏬" },
  { label: "Reviews", href: "/admin/reviews", icon: "⭐" },
  { label: "Bookings", href: "/admin/bookings", icon: "📅" },
  { label: "Audit Log", href: "/admin/audit", icon: "🧾" },

  // ✅ NEW
  { label: "Cron", href: "/admin/cron", icon: "🕒" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 260,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f0f0f, #141414)",
        color: "#ffffff",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* TOP */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 18,
            fontWeight: 800,
            marginBottom: 28,
          }}
        >
          ✨ <span>Admin Panel</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {menuItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 12,
                  textDecoration: "none",
                  color: active ? "#ff4d8d" : "#e5e7eb",
                  background: active
                    ? "rgba(255,77,141,0.15)"
                    : "transparent",
                  fontWeight: active ? 800 : 600,
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* LOGOUT */}
      <div>
        <button
          style={{
            width: "100%",
            marginTop: 24,
            padding: "12px 0",
            borderRadius: 14,
            background: "transparent",
            color: "#ff4d8d",
            border: "1px solid rgba(255,77,141,0.6)",
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={() => {
            // TODO: gắn logic logout Firebase Auth nếu cần
            alert("Logout");
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
