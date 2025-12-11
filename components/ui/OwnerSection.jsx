"use client";

import React from "react";
import Link from "next/link";

export default function OwnerSection() {
  return (
    <section className="bg-gradient-to-r from-pink-50 via-white to-pink-50 border-y border-pink-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-10 md:py-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Bạn là chủ{" "}
            <span className="text-pink-500">tiệm nail tại Budapest?</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Đăng salon của bạn lên Nail Budapest Map để tiếp cận thêm khách
            hàng mới, quản lý lịch đặt chỗ và nhận review dễ dàng.
          </p>

          <ul className="text-sm text-gray-600 space-y-1.5 mb-5">
            <li>• Hiển thị salon trên bản đồ theo quận</li>
            <li>• Nhận booking online từ khách Việt và quốc tế</li>
            <li>• Quản lý dịch vụ, giá, khung giờ nhận khách</li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/for-owners/register"
              className="inline-flex items-center rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-pink-600 transition"
            >
              Đăng ký salon ngay
            </Link>
            <Link
              href="/for-owners"
              className="inline-flex items-center rounded-full border border-pink-200 px-5 py-2.5 text-sm font-medium text-pink-600 hover:bg-pink-50 transition"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <div className="rounded-3xl bg-white border border-pink-100 shadow-md px-5 py-4 text-sm text-gray-700 max-w-sm">
            <p className="font-semibold mb-2">
              “Từ ngày xuất hiện trên Nail Budapest Map, salon của mình có
              thêm rất nhiều khách Việt sống ở các quận khác.”
            </p>
            <p className="text-xs text-gray-500">
              — Chủ tiệm Diamond Nails &amp; Spa, District 6
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}