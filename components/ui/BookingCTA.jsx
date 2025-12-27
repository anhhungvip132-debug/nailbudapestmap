"use client";

import { useEffect, useState } from "react";

export default function BookingCTA({ salon }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [customService, setCustomService] = useState("");

  if (!salon) return null;

  /* ===============================
     LOAD SERVICES
     =============================== */
  useEffect(() => {
    if (salon.plan === "fresha" && salon.freshaUrl) {
      fetch(`/api/fresha/services?url=${encodeURIComponent(salon.freshaUrl)}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setServices(data.map((s) => s.name));
          }
        })
        .catch(() => {
          setServices([]);
        });
    } else {
      setServices([
        "Manicure",
        "Pedicure",
        "Gel Polish",
        "Acrylic Nails",
        "Nail Art",
      ]);
    }
  }, [salon]);

  /* ===============================
     SUBMIT BOOKING → API
     =============================== */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.target);

    const payload = {
      salonId: String(salon.id),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      date: formData.get("date")?.split("T")?.[0] || "",
      time: formData.get("date")?.split("T")?.[1] || "",
      service:
        selectedService === "other" ? customService : selectedService,
      note: formData.get("note") || "",
    };

    if (!payload.name || !payload.date || !payload.time) {
      setError("Vui lòng nhập đầy đủ họ tên, ngày và giờ.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Booking failed");
      }

      setSuccess(true);
      e.target.reset();
      setSelectedService("");
      setCustomService("");
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-pink-50 border border-pink-100 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-pink-600 mb-4">
        Đặt lịch tại {salon.name}
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          name="name"
          placeholder="Họ tên"
          required
          className="border rounded-lg px-3 py-2"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border rounded-lg px-3 py-2"
        />

        <input
          name="phone"
          placeholder="Số điện thoại"
          className="border rounded-lg px-3 py-2"
        />

        {/* ===== SELECT SERVICE ===== */}
        <select
          required
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">-- Chọn dịch vụ --</option>
          {services.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
          <option value="other">Khác (tự nhập)</option>
        </select>

        {/* ===== CUSTOM SERVICE ===== */}
        {selectedService === "other" && (
          <input
            type="text"
            placeholder="Nhập dịch vụ khác"
            value={customService}
            onChange={(e) => setCustomService(e.target.value)}
            required
            className="border rounded-lg px-3 py-2"
          />
        )}

        <input
          name="date"
          type="datetime-local"
          required
          className="border rounded-lg px-3 py-2"
        />

        <textarea
          name="note"
          placeholder="Ghi chú (tuỳ chọn)"
          rows={3}
          className="border rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-xl transition disabled:opacity-60"
        >
          {loading ? "Đang gửi..." : "Gửi yêu cầu đặt lịch"}
        </button>

        {success && (
          <p className="text-green-600 text-sm mt-2">
            ✅ Đã gửi yêu cầu đặt lịch. Salon sẽ xác nhận sớm.
          </p>
        )}

        {error && (
          <p className="text-red-600 text-sm mt-2">
            ❌ {error}
          </p>
        )}
      </form>
    </section>
  );
}
