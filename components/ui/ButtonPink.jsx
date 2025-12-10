"use client";

export default function ButtonPink({ text, className }) {
  return (
    <button
      className={`bg-pink-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-pink-600 transition ${className}`}
    >
      {text}
    </button>
  );
}
