"use client";

import { useState, useEffect } from "react";
import salons from "@/data/salons.json";

export default function SearchBar() {
  const [text, setText] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");
  const [results, setResults] = useState([]);

  const districts = [...new Set(salons.map((s) => s.district))];
  const services = [...new Set(salons.flatMap((s) => s.services || []))];

  useEffect(() => {
    let filtered = salons;

    if (text.trim()) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (district) filtered = filtered.filter((s) => s.district === district);
    if (service) filtered = filtered.filter((s) => s.services?.includes(service));

    setResults(filtered.slice(0, 10));
  }, [text, district, service]);

  return (
    <section className="bg-white p-5 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">Find a Nail Salon</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search by name…"
        className="w-full p-3 border rounded-lg"
      />

      <div className="flex gap-4 flex-wrap">
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="">All Districts</option>
          {districts.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="">All Services</option>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {results.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Results:</h3>
          <ul className="space-y-2">
            {results.map((s) => (
              <li key={s.id} className="p-2 bg-white rounded-lg shadow">
                {s.name} — {s.district}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
