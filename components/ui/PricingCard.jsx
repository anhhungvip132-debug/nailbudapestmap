"use client";

export default function PricingCard({ title, price, features }) {
  return (
    <div className="border border-pink-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-bold text-pink-600">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{price}</p>

      <ul className="mt-4 space-y-2">
        {features.map((f, i) => (
          <li
            key={i}
            className="text-sm text-gray-700 flex items-start gap-2"
          >
            <span className="text-pink-500">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
