"use client";

import { useState } from "react";
import salons from "@/data/salons.json";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");
  const [results, setResults] = useState([]);

  const allDistricts = [...new Set(salons.map((s) => s.district))];
  const allServices = [
    ...new Set(salons.flatMap((s) => s.services || []))
  ];

  const filterSalons = () => {
    const filtered = salons.filter((s) => {
      const matchName =
        keyword === "" ||
        s.name.toLowerCase().includes(keyword.toLowerCase());

      const matchDistrict =
        district === "" || s.district === district;

      const matchService =
        service === "" ||
        (s.services && s.services.includes(service));

      return matchName && matchDistrict && matchService;
    });

    setResults(filtered);
  };

  return (
    <section className="my-12 bg-white p-6 rounded-2xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        🔍 Tìm kiếm Salon Nâng Cao
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* TÌM THEO TÊN */}
        <input
          className="p-3 border rounded-xl"
          placeholder="Tìm theo tên salon…"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            filterSalons();
          }}
        />

        {/* TÌM THEO QUẬN */}
        <select
          className="p-3 border rounded-xl"
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            filterSalons();
          }}
        >
          <option value="">Tất cả quận</option>
          {allDistricts.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* TÌM THEO DỊCH VỤ */}
        <select
          className="p-3 border rounded-xl"
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            filterSalons();
          }}
        >
          <option value="">Tất cả dịch vụ</option>
          {allServices.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* KẾT QUẢ */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((s) => (
          <div key={s.id} className="p-4 bg-gray-50 rounded-xl shadow">
            <h3 className="text-lg font-semibold">{s.name}</h3>
            <p className="text-gray-600">{s.address}</p>
            <p className="text-sm text-pink-600">
              {s.district} — {s.services.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
