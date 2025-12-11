"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(keyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto mt-6 flex gap-3"
    >
      <input
        type="text"
        placeholder="Tìm salon, dịch vụ, quận..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 p-3 bg-white border rounded-xl shadow-sm"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-pink-500 text-white rounded-xl shadow-md"
      >
        Tìm
      </button>
    </form>
  );
}
