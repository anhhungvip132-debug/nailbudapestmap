"use client";

export default function SearchBar() {
  return (
    <div className="card p-5">
      <input
        type="text"
        placeholder="Tìm tiệm nail, dịch vụ..."
        className="w-full p-3 rounded-xl border border-gray-300"
      />
      <button className="btn-primary w-full mt-3">Tìm kiếm</button>
    </div>
  );
}
