"use client";

import { useState } from "react";
import salons from "@/data/salons.json";

export default function SearchAdvanced() {
  const [query, setQuery] = useState("");

  const results = salons.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="card p-5">
      <input
        type="text"
        placeholder="Tìm salon…"
        className="p-3 border rounded-xl w-full"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      {query.length > 0 && (
        <div className="mt-3 bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {results.map((s) => (
            <a
              key={s.id}
              href={`/salon/${s.id}`}
              className="block px-4 py-2 hover:bg-pink-50"
            >
              {s.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
