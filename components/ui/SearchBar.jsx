"use client";

import { useState } from "react";

export default function SearchBar() {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");

  // Danh sách quận — KHÔNG BAO GIỜ undefined
  const districts = [
    "District 1",
    "District 2",
    "District 3",
    "District 4",
    "District 5",
    "District 6",
    "District 7",
    "District 8",
    "District 9",
    "District 10",
  ];

  // Danh sách dịch vụ — KHÔNG BAO GIỜ undefined
  const services = [
    "Manicure",
    "Pedicure",
    "Gel Nails",
    "Acrylic Nails",
    "Nail Art",
  ];

  const handleSearch = () => {
    console.log("Search triggered:", { name, district, service });
  };

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-center text-2xl font-bold mb-4">🔍 Tìm Kiếm Salon</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Nhập tên salon..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg p-3"
        />

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">Chọn quận</option>
          {districts.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">Chọn dịch vụ</option>
          {services.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-pink-500 text-white rounded-lg p-3 font-bold"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
