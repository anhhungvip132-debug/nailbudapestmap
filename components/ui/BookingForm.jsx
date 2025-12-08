"use client";

import { useState } from "react";

export default function BookingForm({ salonId }) {
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const [sent, setSent] = useState(false);

  async function submit() {
    if (!form.name || !form.phone)
      return alert("Vui lòng nhập đầy đủ thông tin");

    await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify({ ...form, salonId }),
    });

    setSent(true);
  }

  if (sent)
    return <p className="text-green-600 font-bold">Đặt lịch thành công!</p>;

  return (
    <div className="bg-white shadow p-6 rounded-xl">

      <input
        className="w-full border p-3 rounded-xl mb-3"
        placeholder="Họ và tên"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="w-full border p-3 rounded-xl mb-3"
        placeholder="Số điện thoại"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        className="w-full border p-3 rounded-xl mb-4"
        placeholder="Dịch vụ muốn đặt"
        onChange={(e) => setForm({ ...form, service: e.target.value })}
      />

      <button
        onClick={submit}
        className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700"
      >
        Xác nhận đặt lịch
      </button>
    </div>
  );
}
