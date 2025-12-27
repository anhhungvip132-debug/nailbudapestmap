"use client";

export default function AdminSalonActions({ salonId }) {
  async function extend(days) {
    if (!confirm(`Gia hạn PREMIUM +${days} ngày?`)) return;

    const res = await fetch(
      `/api/admin/salons/${salonId}/extend-plan`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days }),
      }
    );

    const data = await res.json();
    if (!data.ok) {
      alert(data.error || "Error");
    } else {
      alert(`Đã gia hạn đến ${data.planExpiresAt}`);
      location.reload();
    }
  }

  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={() => extend(30)}
        className="px-3 py-1 rounded bg-pink-100 text-pink-700 text-sm"
      >
        +30 ngày
      </button>
      <button
        onClick={() => extend(90)}
        className="px-3 py-1 rounded bg-pink-200 text-pink-800 text-sm"
      >
        +90 ngày
      </button>
      <button
        onClick={() => extend(365)}
        className="px-3 py-1 rounded bg-pink-300 text-pink-900 text-sm"
      >
        +365 ngày
      </button>
    </div>
  );
}
