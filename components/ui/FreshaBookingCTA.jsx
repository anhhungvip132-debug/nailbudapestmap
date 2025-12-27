"use client";

export default function FreshaBookingCTA({ freshaUrl }) {
  if (!freshaUrl) return null;

  return (
    <a
      href={freshaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-green-600 px-6 py-4 text-white font-semibold hover:bg-green-700 transition"
    >
      Đặt lịch trực tiếp trên Fresha
    </a>
  );
}
