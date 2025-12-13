"use client"

import { useState } from "react"

export default function SearchAdvanced({ salons }) {
  const [keyword, setKeyword] = useState("")
  const [district, setDistrict] = useState("")
  const [service, setService] = useState("")
  const [featured, setFeatured] = useState(false)

  return (
    <section className="search-box">
      <input
        placeholder="Tên salon hoặc địa chỉ"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <select value={district} onChange={(e) => setDistrict(e.target.value)}>
        <option value="">Tất cả quận</option>
        <option value="5">Quận 5</option>
        <option value="6">Quận 6</option>
        <option value="7">Quận 7</option>
      </select>

      <select value={service} onChange={(e) => setService(e.target.value)}>
        <option value="">Tất cả dịch vụ</option>
        <option>Manicure</option>
        <option>Pedicure</option>
        <option>Gel nails</option>
        <option>Nail art</option>
      </select>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={featured}
          onChange={() => setFeatured(!featured)}
        />
        Chỉ hiện salon nổi bật
      </label>

      <button className="btn-dark">Tìm salon</button>
    </section>
  )
}
