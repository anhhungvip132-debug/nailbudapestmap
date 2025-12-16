"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingClient({ salonId }) {
  const router = useRouter();

  const [salon, setSalon] = useState(null);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  // ⬇️ Fetch salon (chuẩn Phase 3 – DB-ready)
  useEffect(() => {
    fetch("/api/salons")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const found = Array.isArray(data)
          ? data.find((s) => String(s.id) === String(salonId))
          : null;
        setSalon(found || null);
      })
      .finally(() => setLoading(false));
  }, [salonId]);

  if (loading) {
    return (
      <p className="p-6 text-center text-gray-500">
        Đang tải thông tin salon…
      </p>
    );
  }

  if (!salon) {
    return (
      <p className="p-6 text-center text-gray-500">
        Không tìm thấy salon.
      </p>
    );
  }

  const availableTimes = [
    "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00",
  ];

  function handleSubmit(e) {
    e.preventDefault();

    if (!service || !date || !time || !name || !phone) return;

    router.push(
      `/booking/success?salon=${salonId}&name=${encodeURIComponent(
        name
      )}&service=${encodeURIComponent(service)}&date=${date}&time=${time}`
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-pink-600 mb-2">
        Đặt lịch tại {salon.name}
      </h1>

      <p className="text-gray-500 mb-6">{salon.address}</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-pink-100 shadow-sm rounded-2xl p-6 space-y-5"
      >
        {/* SERVICE */}
        <div>
          <label className="block font-medium mb-1">Chọn dịch vụ</label>
          <select
            value={service}
            required
            onChange={(e) => setService(e.target.value)}
            className="border rounded-xl w-full px-4 py-3"
          >
            <option value="">-- Chọn dịch vụ --</option>
            {salon.services?.map((sv, i) => (
              <option key={i} value={sv}>
                {sv}
              </option>
            ))}
          </select>
        </div>

        {/* DATE */}
        <div>
          <label className="block font-medium mb-1">Chọn ngày</label>
          <input
            type="date"
            required
            className="border rounded-xl w-full px-4 py-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* TIME */}
        <div>
          <label className="block font-medium mb-1">Chọn giờ</label>
          <select
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border rounded-xl w-full px-4 py-3"
          >
            <option value="">-- Chọn giờ --</option>
            {availableTimes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* NAME */}
        <div>
          <label className="block font-medium mb-1">Tên của bạn</label>
          <input
            type="text"
            required
            className="border rounded-xl w-full px-4 py-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên..."
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block font-medium mb-1">Số điện thoại</label>
          <input
            type="tel"
            required
            className="border rounded-xl w-full px-4 py-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ví dụ: 06201234567"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition"
        >
          Xác nhận đặt lịch
        </button>
      </form>
    </div>
  );
}
