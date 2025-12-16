"use client";

export const dynamic = "force-dynamic";

export default function OwnerLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
