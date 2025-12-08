"use client";

export default function Filters({ filters, updateFilter }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4">

      {/* Quận */}
      <select
        className="border rounded-lg p-2"
        value={filters.district}
        onChange={(e) => updateFilter("district", e.target.value)}
      >
        <option value="">Chọn quận</option>
        <option value="District 1">Quận 1</option>
        <option value="District 2">Quận 2</option>
        <option value="District 3">Quận 3</option>
        <option value="District 5">Quận 5</option>
        <option value="District 7">Quận 7</option>
        <option value="District 10">Quận 10</option>
      </select>

      {/* Rating */}
      <select
        className="border rounded-lg p-2"
        value={filters.rating}
        onChange={(e) => updateFilter("rating", Number(e.target.value))}
      >
        <option value="0">Rating</option>
        <option value="3">⭐ 3+ sao</option>
        <option value="4">⭐ 4+ sao</option>
        <option value="4.5">⭐ 4.5+ sao</option>
      </select>

      {/* Service */}
      <select
        className="border rounded-lg p-2"
        value={filters.service}
        onChange={(e) => updateFilter("service", e.target.value)}
      >
        <option value="">Dịch vụ</option>
        <option value="nails">Nails</option>
        <option value="pedicure">Pedicure</option>
        <option value="eyelash">Nối mi</option>
        <option value="waxing">Waxing</option>
      </select>

      {/* Distance */}
      <select
        className="border rounded-lg p-2"
        value={filters.distance}
        onChange={(e) => updateFilter("distance", Number(e.target.value))}
      >
        <option value="0">Khoảng cách</option>
        <option value="1">Trong 1 km</option>
        <option value="3">Trong 3 km</option>
        <option value="5">Trong 5 km</option>
        <option value="10">Trong 10 km</option>
      </select>

    </div>
  );
}
