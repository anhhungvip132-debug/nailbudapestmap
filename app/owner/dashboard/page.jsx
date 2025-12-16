"use client";

export const dynamic = "force-dynamic";

import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function OwnerDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Chủ Salon
      </h1>

      <div className="bg-white rounded-xl p-6 shadow">
        <p className="text-gray-700 mb-4">
          Chào mừng bạn đến dashboard.
        </p>

        <button
          onClick={handleLogout}
          className="rounded-full bg-gray-900 text-white px-5 py-2 text-sm"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
