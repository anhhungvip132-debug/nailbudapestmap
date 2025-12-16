"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BookingSuccess() {
  const q = useSearchParams();
  const name = q.get("name");
  const service = q.get("service");

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        Đặt lịch thành công 🎉
      </h1>
      <p className="text-gray-600 mb-6">
        Cảm ơn <strong>{name}</strong> đã đặt dịch vụ
        <br />
        <strong>{service}</strong>
      </p>

      <Link
        href="/"
        className="inline-block rounded-full bg-pink-500 px-6 py-3 text-white font-semibold hover:bg-pink-600 transition"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
