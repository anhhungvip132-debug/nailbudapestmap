"use client";
import { useState } from "react";
import ButtonPink from "./ButtonPink";

export default function RegisterSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="section card p-6 text-center">
      <h2 className="heading">Đăng ký thành viên</h2>
      <p className="text-gray-600">
        Nhận ưu đãi & tin mới nhất từ các salon.
      </p>

      <ButtonPink text="Đăng ký ngay" className="mt-4" onClick={() => setOpen(true)} />

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="text-xl font-bold text-pink-600">Đăng ký</h3>

            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full mt-3 p-3 border rounded-xl"
            />

            <ButtonPink text="Gửi" className="mt-4 w-full" />

            <button
              className="mt-3 text-gray-500 text-sm"
              onClick={() => setOpen(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
