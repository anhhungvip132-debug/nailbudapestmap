"use client";

export default function StripePayButton({ amount = 5000 }) {
  const handlePay = () => {
    alert("Stripe Payment Triggered (demo).");
  };

  return (
    <button
      onClick={handlePay}
      className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold mt-4 hover:bg-pink-700 transition"
    >
      Thanh toán {amount.toLocaleString()} HUF
    </button>
  );
}
