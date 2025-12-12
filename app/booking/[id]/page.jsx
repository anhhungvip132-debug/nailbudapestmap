"use client";

import { useState } from "react";
import salons from "@/data/salons.json";
import ButtonPink from "@/components/ui/ButtonPink";

export default function BookingPage({ params }) {
  const salon = salons.find((s) => s.id == params.id);

  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!salon)
    return <p className="p-10 text-center">Salon không tồn tại.</p>;

  function handleSubmit(e) {
    e.preventDefault();

    if (!service || !date || !time) {
      alert("Hãy chọn đầy đủ dịch vụ, ngày và giờ!");
      return;
    }

    const booking = {
      salonId: salon.id,
      service,
      date,
      time,
      createdAt: new Date().toISOString(),
    };

    // Gửi đến API booking
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    }).finally(() => {
      window.location.href = "/booking/success";
    });
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        Đặt lịch tại {salon.name}
      </h1>

      <p className="text-gray-600 mb-6">{salon.address}</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm border border-pink-100 rounded-2xl p-6 space-y-5"
      >
        {/* Service */}
        <div>
          <label className="block font-semibold mb-1">Chọn dịch vụ</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full p-3 border rounded-xl"
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
          <label className="block font-semibold mb-1">Ngày</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        {/* TIME */}
        <div>
          <label className="block font-semibold mb-1">Giờ</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <ButtonPink text="Xác nhận đặt lịch" className="w-full" type="submit" />
      </form>
    </div>
  );
}
