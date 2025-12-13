"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <strong>NB</strong>
        <span>Nail Budapest Map</span>
      </div>

      <nav>
        <Link href="/blog">Blog</Link>
        <Link href="/owner">Dành cho chủ tiệm</Link>
        <Link href="/login" className="btn-dark">Đăng nhập</Link>
      </nav>
    </header>
  )
}
