"use client";

import { useState } from "react";

export default function SearchBar({ onSearch, size = "md" }) {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");

  const wrapper = size === "lg" ? "p-6 text-base" : "p-3 text-sm";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch({ name, district, service });
      }}
      className={`bg-white shadow-xl border border-pink-100 rounded-2xl flex flex-col md:flex-row gap-4 md:items-end ${wrapper}`}
    >
      {/* Name */}
      <div className="flex-1">
        <label className="block text-xs text-gray-500 mb-1">Tên salon</label>
        <input
          type="text"
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Ví dụ: Nailbar Budapest, Andrássy út..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* District */}
      <div className="md:w-52">
        <label className="block text-xs text-gray-500 mb-1">Quận</label>
        <select
          className="w-full border rounded-xl px-4 py-3"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">Tất cả quận</option>
          <option value="5">District 5</option>
          <option value="6">District 6</option>
          <option value="7">District 7</option>
          <option value="8">District 8</option>
          <option value="9">District 9</option>
          <option value="13">District 13</option>
        </select>
      </div>

      {/* Service */}
      <div className="md:w-52">
        <label className="block text-xs text-gray-500 mb-1">Dịch vụ</label>
        <select
          className="w-full border rounded-xl px-4 py-3"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Tất cả dịch vụ</option>
          <option value="manicure">Manicure</option>
          <option value="pedicure">Pedicure</option>
          <option value="gel">Gel nails</option>
          <option value="nail art">Nail art</option>
          <option value="spa">Spa</option>
        </select>
      </div>

      <button className="bg-pink-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-pink-600">
        Tìm salon
      </button>
    </form>
  );
}
