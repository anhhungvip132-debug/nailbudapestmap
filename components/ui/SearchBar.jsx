"use client";

import { useState } from "react";

export default function SearchBar({ onFilter }) {
  const [keyword, setKeyword] = useState("");
  const [area, setArea] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filter = {
      keyword: keyword.trim() || null,
      area: area || null,
      service: service || null,
    };
    if (typeof onFilter === "function") {
      onFilter(filter);
    }
  };

  return (
    <section className="bg-pink-50 py-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          className="border rounded-xl px-4 py-3 w-full"
          placeholder="Tìm tiệm / tên salon…"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          className="border rounded-xl px-4 py-3 w-full"
          placeholder="Khu vực (District, street…) "
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <select
          className="border rounded-xl px-4 py-3 w-full"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Loại dịch vụ</option>
          <option value="manicure">Manicure</option>
          <option value="pedicure">Pedicure</option>
          <option value="gel">Gel / Acrylic</option>
          <option value="combo">Combo</option>
        </select>

        <button
          type="submit"
          className="bg-pink-600 text-white rounded-xl px-4 py-3 w-full hover:bg-pink-700"
        >
          Tìm kiếm
        </button>
      </form>
    </section>
  );
}
