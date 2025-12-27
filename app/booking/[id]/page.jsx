"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function BookingPage() {
  const { id: salonId } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.name || !form.date || !form.time) {
      setError("Please fill name, date and time.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salonId,
          ...form,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Booking failed");
      }

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        service: "",
        note: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h1>📅 Book an Appointment</h1>
      <p style={{ color: "#666" }}>Salon ID: {salonId}</p>

      {success && (
        <div style={{ background: "#e6fffa", padding: 12, borderRadius: 8 }}>
          ✅ Booking sent successfully. We’ll confirm shortly.
        </div>
      )}

      {error && (
        <div style={{ background: "#ffe6e6", padding: 12, borderRadius: 8 }}>
          ❌ {error}
        </div>
      )}

      <form onSubmit={submit} style={{ marginTop: 16 }}>
        <input
          name="name"
          placeholder="Your name *"
          value={form.name}
          onChange={onChange}
          required
          style={inputStyle}
        />

        <input
          name="email"
          type="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={onChange}
          style={inputStyle}
        />

        <input
          name="phone"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={onChange}
          style={inputStyle}
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={onChange}
          required
          style={inputStyle}
        />

        <input
          name="time"
          type="time"
          value={form.time}
          onChange={onChange}
          required
          style={inputStyle}
        />

        <input
          name="service"
          placeholder="Service (e.g. Gel nails)"
          value={form.service}
          onChange={onChange}
          style={inputStyle}
        />

        <textarea
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={onChange}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 12,
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            background: "#e91e63",
            color: "#fff",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Sending…" : "Book now"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginTop: 8,
  borderRadius: 8,
  border: "1px solid #ddd",
};
