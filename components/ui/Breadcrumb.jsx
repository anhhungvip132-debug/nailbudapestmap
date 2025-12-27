"use client";

import Link from "next/link";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-pink-600"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
