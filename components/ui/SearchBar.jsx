"use client";

import { useState, useEffect } from "react";

export default function SearchBar({ onFilter }) {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState("");
  const [distance, setDistance] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSalons, setAllSalons] = useState([]);

  // Load data để gợi ý
  useEffect(() => {
    fetch("/api/salons")
      .then((res) => res.json())
      .then((data) => setAllSalons(data))
      .catch(() => {});
  }, []);

  // Gợi ý theo tên
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const result = allSalons.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(result.slice(0, 5));
  }, [query, allSalons]);

  // Gửi filter lên trang chính (nếu có onFilter)
  useEffect(() => {
    if (typeof onFilter === "function") {
      onFilter({
        query,
        district,
        service,
        rating,
        distance: distance ? Number(distance) : null,
      });
    }
  }, [query, district, service, rating, distance, onFilter]);

  return (
    <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
      <div className="bg-white shadow-xl rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* SEARCH BY NAME */}
        <div className="relative">
          <input
            className="border rounded-xl px-4 py-3 w-full shadow-sm"
            placeholder="Tìm theo tên tiệm nail…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 bg-white shadow-xl rounded-xl p-2 z-40">
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  className="px-3 py-2 hover:bg-pink-50 cursor-pointer rounded-lg"
                  onClick={() => {
                    setQuery(s.name);
                    setSuggestions([]);
                  }}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* DISTRICT FILTER */}
        <select
          className="border rounded-xl px-4 py-3 shadow-sm"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">Quận</option>
          <option value="District 1">District 1</option>
          <option value="District 2">District 2</option>
          <option value="District 5">District 5</option>
          <option value="District 6">District 6</option>
          <option value="District 7">District 7</option>
          <option value="District 8">District 8</option>
        </select>

        {/* SERVICE FILTER */}
        <select
          className="border rounded-xl px-4 py-3 shadow-sm"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Dịch vụ</option>
          <option value="gel">Gel Nails</option>
          <option value="art">Nail Art</option>
          <option value="spa">Spa</option>
          <option value="manicure">Manicure</option>
          <option value="pedicure">Pedicure</option>
        </select>

        {/* RATING FILTER */}
        <select
          className="border rounded-xl px-4 py-3 shadow-sm"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Đánh giá</option>
          <option value="5">⭐ 5 sao</option>
          <option value="4">⭐ 4+ sao</option>
          <option value="3">⭐ 3+ sao</option>
        </select>
      </div>

      {/* DISTANCE FILTER */}
      <div className="max-w-5xl mx-auto mt-4 px-2">
        <input
          type="range"
          min="1"
          max="20"
          value={distance || ""}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full"
        />
        <p className="text-center mt-1 text-gray-600">
          📍 Khoảng cách: {distance || 0} km
        </p>
      </div>
    </section>
  );
}
