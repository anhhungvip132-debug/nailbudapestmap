"use client";

import Link from "next/link";

export default function MonetizeCTA({ compact = false }) {
  if (compact) {
    return (
      <Link
        href="/advertise"
        className="inline-block mt-4 text-sm text-pink-600 font-semibold hover:underline"
      >
        Promote this salon →
      </Link>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-pink-300 bg-pink-50 p-6 text-center">
      <h3 className="text-xl font-bold text-pink-600">
        Own a nail salon?
      </h3>
      <p className="text-gray-600 mt-2">
        Get more visibility with Premium or Sponsored listing.
      </p>

      <Link
        href="/advertise"
        className="inline-block mt-4 bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
      >
        Advertise your salon
      </Link>
    </div>
  );
}
