"use client";

export default function BookingForm({
  salonName,
  salonEmail,
}) {
  async function submit(e) {
    e.preventDefault();

    const form = e.target;

    await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "booking",
        salonName,
        salonEmail,
        customerName: form.name.value,
        customerEmail: form.email.value,
        customerPhone: form.phone.value,
        service: form.service.value,
        date: form.date.value,
        note: form.note.value,
      }),
    });

    alert("Đặt lịch thành công!");
    form.reset();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input name="name" placeholder="Tên" required />
      <input name="email" placeholder="Email" required />
      <input name="phone" placeholder="SĐT" required />
      <input name="service" placeholder="Dịch vụ" required />
      <input name="date" type="datetime-local" required />
      <textarea name="note" placeholder="Ghi chú" />
      <button className="bg-pink-600 text-white px-4 py-2 rounded">
        Đặt lịch
      </button>
    </form>
  );
}
