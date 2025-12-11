"use client";
import { useState, useEffect } from "react";
import salons from "@/data/salons.json";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    let filtered = salons;

    if (query.trim()) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (district) {
      filtered = filtered.filter((s) => s.district === district);
    }

    if (service) {
      filtered = filtered.filter((s) =>
        s.services?.includes(service)
      );
    }

    setResults(filtered);
  }, [query, district, service]);

  const uniqueDistricts = [...new Set(salons.map((s) => s.district))];
  const uniqueServices = [...new Set(salons.flatMap((s) => s.services || []))];

  return (
    <section className="bg-white shadow p-4 rounded-xl space-y-4">
      <h2 className="text-2xl font-semibold">Search Nail Salons</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by salon name..."
        className="w-full border p-2 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex gap-4 flex-wrap">
        {/* District Filter */}
        <select
          className="border p-2 rounded"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">All Districts</option>
          {uniqueDistricts.map((d) => (
            <option key={d} value={d}>
              District {d}
            </option>
          ))}
        </select>

        {/* Services Filter */}
        <select
          className="border p-2 rounded"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">All Services</option>
          {uniqueServices.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div>
        <h3 className="font-semibold mb-2">Results:</h3>
        {results.length === 0 ? (
          <p className="text-gray-500">No salons found.</p>
        ) : (
          <ul className="space-y-2">
            {results.map((s) => (
              <li key={s.id} className="p-2 border rounded bg-gray-50">
                {s.name} — District {s.district}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
