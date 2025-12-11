"use client";

import { useState, useMemo } from "react";

export default function SearchBar({
  onSearch,
  size = "md",
  salons = [],
  totalResults,
}) {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const wrapper = size === "lg" ? "p-6 text-base" : "p-3 text-sm";

  const suggestions = useMemo(() => {
    if (!name || !Array.isArray(salons)) return [];
    const q = name.toLowerCase();
    return salons
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [name, salons]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({ name, district, service, featuredOnly });
    setShowSuggestions(false);
  }

  function handleSelectSuggestion(salon) {
    const value = salon.name;
    setName(value);
    setShowSuggestions(false);
    onSearch({ name: value, district, service, featuredOnly });
  }

  return (
    <div className="space-y-2">
      <form
        onSubmit={handleSubmit}
        className={`bg-white shadow-xl border border-pink-100 rounded-2xl flex flex-col md:flex-row gap-4 md:items-end ${wrapper}`}
      >
        {/* Name */}
        <div className="flex-1 relative">
          <label className="block text-xs text-gray-500 mb-1">
            Tên salon hoặc địa chỉ
          </label>
          <input
            type="text"
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Ví dụ: Nailbar Budapest, Andrássy út..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => name && setShowSuggestions(true)}
            onBlur={() => {
              // delay để click được suggestion
              setTimeout(() => setShowSuggestions(false), 150);
            }}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-pink-100 rounded-xl shadow-lg max-h-60 overflow-auto text-sm">
              {suggestions.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => handleSelectSuggestion(s)}
                  className="w-full text-left px-3 py-2 hover:bg-pink-50"
                >
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.address}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* District */}
        <div className="md:w-52">
          <label className="block text-xs text-gray-500 mb-1">Quận</label>
          <select
            className="w-full border rounded-xl px-4 py-3"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Tất cả quận</option>
            <option value="district 2">District 2</option>
            <option value="district 5">District 5</option>
            <option value="district 6">District 6</option>
            <option value="district 7">District 7</option>
            <option value="district 8">District 8</option>
            <option value="district 13">District 13</option>
          </select>
        </div>

        {/* Service */}
        <div className="md:w-52">
          <label className="block text-xs text-gray-500 mb-1">Dịch vụ</label>
          <select
            className="w-full border rounded-xl px-4 py-3"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Tất cả dịch vụ</option>
            <option value="manicure">Manicure</option>
            <option value="pedicure">Pedicure</option>
            <option value="gel">Gel nails</option>
            <option value="nail art">Nail art</option>
            <option value="spa">Spa</option>
          </select>
        </div>

        {/* Featured only */}
        <div className="md:w-40 flex items-center gap-2">
          <input
            id="featuredOnly"
            type="checkbox"
            className="h-4 w-4 rounded border-pink-300 text-pink-500"
            checked={featuredOnly}
            onChange={(e) => setFeaturedOnly(e.target.checked)}
          />
          <label
            htmlFor="featuredOnly"
            className="text-xs md:text-sm text-gray-600"
          >
            Chỉ hiển thị salon nổi bật
          </label>
        </div>

        <button className="bg-pink-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-pink-600">
          Tìm salon
        </button>
      </form>

      {typeof totalResults === "number" && (
        <p className="text-xs text-gray-500">
          {totalResults === 0
            ? "Không tìm thấy salon phù hợp."
            : `Tìm được ${totalResults} salon phù hợp.`}
        </p>
      )}
    </div>
  );
}
