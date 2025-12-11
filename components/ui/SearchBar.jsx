"use client";
import { useState } from "react";
import salons from "@/data/salons.json";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const onSearch = (value) => {
    setKeyword(value);

    if (value.trim() === "") return setResults([]);

    const filtered = salons.filter((s) =>
      s.name.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <section className="my-10">
      <div className="max-w-2xl mx-auto">
        <input
          value={keyword}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="🔍 Tìm kiếm salon…"
          className="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-pink-400 transition text-lg"
        />
      </div>

      {results.length > 0 && (
        <div className="max-w-3xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((s) => (
            <div key={s.id} className="p-4 border rounded-xl shadow-sm bg-white">
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-gray-600">{s.address}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
