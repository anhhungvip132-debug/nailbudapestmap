"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingForm({ salon }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/sendMail", {
      method: "POST",
      body: JSON.stringify({
        salonName: salon.name,
        ...form,
      }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (response.ok) {
      router.push("/booking/success");
    } else {
      alert("Không thể gửi booking. Vui lòng thử lại.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4 border border-pink-100"
    >
      <h2 className="text-2xl font-bold mb-3">
        Đặt lịch tại {salon.name}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          required
          placeholder="Tên của bạn"
          className="border px-4 py-3 rounded-xl"
          value={form.customerName}
          onChange={(e) => updateField("customerName", e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="border px-4 py-3 rounded-xl"
          value={form.customerEmail}
          onChange={(e) => updateField("customerEmail", e.target.value)}
        />
      </div>

      <input
        placeholder="Số điện thoại (tuỳ chọn)"
        className="border px-4 py-3 rounded-xl w-full"
        value={form.customerPhone}
        onChange={(e) => updateField("customerPhone", e.target.value)}
      />

      <select
        required
        className="border px-4 py-3 rounded-xl w-full"
        value={form.service}
        onChange={(e) => updateField("service", e.target.value)}
      >
        <option value="">Chọn dịch vụ</option>
        {salon.services.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          required
          type="date"
          className="border px-4 py-3 rounded-xl"
          value={form.date}
          onChange={(e) => updateField("date", e.target.value)}
        />

        <input
          required
          type="time"
          className="border px-4 py-3 rounded-xl"
          value={form.time}
          onChange={(e) => updateField("time", e.target.value)}
        />
      </div>

      <textarea
        rows="4"
        placeholder="Lời nhắn cho salon (tuỳ chọn)"
        className="border px-4 py-3 rounded-xl w-full"
        value={form.message}
        onChange={(e) => updateField("message", e.target.value)}
      />

      <button
        disabled={loading}
        className={`w-full rounded-xl py-3 text-white font-semibold ${
          loading ? "bg-pink-300" : "bg-pink-500 hover:bg-pink-600"
        }`}
      >
        {loading ? "Đang gửi..." : "Gửi yêu cầu đặt lịch"}
      </button>
    </form>
  );
}
