"use client";

import { useMemo, useState } from "react";

export default function SearchBar({ salons, onSearch }) {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("all");
  const [service, setService] = useState("all");

  const districts = useMemo(() => {
    const list = Array.from(new Set(salons.map((s) => s.district))).sort();
    return list;
  }, [salons]);

  const services = useMemo(() => {
    const set = new Set();
    salons.forEach((s) => s.services.forEach((sv) => set.add(sv)));
    return Array.from(set).sort();
  }, [salons]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      name: name.trim(),
      district,
      service
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        🔍 Tìm Kiếm Salon
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Nhập tên salon…"
          className="w-full rounded-xl border border-pink-100 px-4 py-2 text-sm outline-none focus:border-pink-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full rounded-xl border border-pink-100 px-4 py-2 text-sm outline-none focus:border-pink-400"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="all">Tất cả quận</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded-xl border border-pink-100 px-4 py-2 text-sm outline-none focus:border-pink-400"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="all">Tất cả dịch vụ</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-pink-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-pink-600"
        >
          Tìm kiếm
        </button>
      </div>
    </form>
  );
}
