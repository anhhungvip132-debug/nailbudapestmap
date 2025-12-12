"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <Link href="/" style={{ fontWeight: 800 }}>
            NB
          </Link>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontWeight: 700 }}>Nail Budapest Map</span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              Tìm tiệm nail đẹp ở Budapest
            </span>
          </div>
        </div>

        <div className="header-actions">
          <Link href="/blog" className="badge">Blog</Link>
          <Link href="/owner" className="badge">Dành cho chủ tiệm</Link>
          <Link href="/login">
            <button type="button">Đăng nhập</button>
          </Link>
        </div>
      </div>
    </header>
  )
}
