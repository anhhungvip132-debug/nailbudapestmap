"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({ onSearch, className = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");

  useEffect(() => {
    setName(searchParams.get("q") || "");
    setDistrict(searchParams.get("district") || "");
    setService(searchParams.get("service") || "");
  }, [searchParams]);

  function handleSubmit(e) {
    e.preventDefault();
    const filters = { name, district, service };

    if (onSearch) {
      onSearch(filters);
    } else {
      const params = new URLSearchParams();
      if (name) params.set("q", name);
      if (district) params.set("district", district);
      if (service) params.set("service", service);
      router.push(`/?${params.toString()}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-2xl bg-white shadow-lg border border-pink-100 p-3 md:p-4 flex flex-col md:flex-row gap-3 ${className}`}
    >
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Tên salon hoặc địa chỉ
        </label>
        <input
          type="text"
          placeholder="Ví dụ: Nailbar Budapest, Andrássy út..."
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="md:w-44">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Quận (District)
        </label>
        <select
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200"
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

      <div className="md:w-52">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Dịch vụ
        </label>
        <select
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Tất cả dịch vụ</option>
          <option value="manicure">Manicure</option>
          <option value="pedicure">Pedicure</option>
          <option value="gel">Gel nails</option>
          <option value="nail-art">Nail art</option>
          <option value="acrylic">Acrylic</option>
          <option value="spa">Spa</option>
        </select>
      </div>

      <div className="md:w-32 flex items-end">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-xl bg-pink-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-pink-600 transition"
        >
          Tìm salon
        </button>
      </div>
    </form>
  );
}