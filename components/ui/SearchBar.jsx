"use client";

import { useState } from "react";

export default function SearchBar({ salons, setFiltered }) {
  const [keyword, setKeyword] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");

  const handleSearch = () => {
    let result = salons;

    if (keyword) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (district) {
      result = result.filter((s) => s.district === district);
    }

    if (service) {
      result = result.filter((s) => s.services.includes(service));
    }

    setFiltered(result);
  };

  return (
    <section className="bg-white p-6 shadow-md rounded-xl mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">🔍 Tìm Kiếm Salon</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search input */}
        <input
          type="text"
          placeholder="Nhập tên salon..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-3 rounded"
        />

        {/* District */}
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="">Quận</option>
          <option value="District 5">District 5</option>
          <option value="District 6">District 6</option>
          <option value="District 7">District 7</option>
        </select>

        {/* Service */}
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="">Dịch vụ</option>
          <option value="Manicure">Manicure</option>
          <option value="Pedicure">Pedicure</option>
          <option value="Gel Nails">Gel Nails</option>
          <option value="Nail Art">Nail Art</option>
        </select>

        {/* Button */}
        <button
          onClick={handleSearch}
          className="bg-pink-500 text-white p-3 rounded font-semibold"
        >
          Tìm kiếm
        </button>
      </div>
    </section>
  );
}
