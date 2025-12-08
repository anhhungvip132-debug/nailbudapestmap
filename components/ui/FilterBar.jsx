// components/ui/FilterBar.jsx
"use client";

import { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [activeFilters, setActiveFilters] = useState({
    district: null,
    rating: null,
    distance: null,
    service: null,
  });

  const districts = ["District 1", "District 2", "District 5", "District 6", "District 7", "District 8"];
  const ratings = [5, 4.5, 4];
  const distances = [1, 2, 5];
  const services = ["Gel", "Spa", "Combo", "Manicure", "Nail Art"];

  const toggleFilter = (type, value) => {
    const updated = {
      ...activeFilters,
      [type]: activeFilters[type] === value ? null : value,
    };

    setActiveFilters(updated);
    onFilter(updated); // gửi cho HomePage
  };

  const chip = (label, type, value) => (
    <button
      key={label}
      onClick={() => toggleFilter(type, value)}
      className={`px-4 py-2 text-sm rounded-full border transition ${
        activeFilters[type] === value
          ? "bg-pink-600 text-white border-pink-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-pink-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h3 className="text-xl font-bold mb-4">Bộ lọc</h3>

      <div className="flex flex-wrap gap-3">
        {/* District */}
        {districts.map((d) => chip(d, "district", d))}

        {/* Rating */}
        {ratings.map((r) => chip(`${r} ⭐`, "rating", r))}

        {/* Distance */}
        {distances.map((d) => chip(`< ${d} km`, "distance", d))}

        {/* Services */}
        {services.map((s) => chip(s, "service", s))}
      </div>
    </div>
  );
}
