"use client";

import { useState } from "react";
import salons from "@/data/salons.json";

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");

  const districts = [...new Set(salons.map(s => s.district))];
  const services = [...new Set(salons.flatMap(s => s.services))];

  const search = () => {
    const results = salons.filter(salon =>
      salon.name.toLowerCase().includes(keyword.toLowerCase()) &&
      (district === "" || salon.district === district) &&
      (service === "" || salon.services.includes(service))
    );
    onSearch(results);
  };

  return (
    <div className="search-bar">
      <input
        placeholder="Tìm tên salon…"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="input"
      />

      <select value={district} onChange={(e) => setDistrict(e.target.value)}>
        <option value="">Tất cả quận</option>
        {districts.map((d, i) => (
          <option key={i} value={d}>{d}</option>
        ))}
      </select>

      <select value={service} onChange={(e) => setService(e.target.value)}>
        <option value="">Tất cả dịch vụ</option>
        {services.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>

      <button onClick={search}>Tìm kiếm</button>
    </div>
  );
}
