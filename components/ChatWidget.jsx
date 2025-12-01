"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-pink-600 text-white px-6 py-3 rounded-full shadow-xl">
        💬 Chat
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-20 right-6 w-72 bg-white shadow-xl rounded-2xl p-4">
          <h3 className="font-bold text-lg text-pink-600 mb-2">Hỗ trợ khách hàng</h3>

          <input placeholder="Nhập tin nhắn..."
                 className="w-full border p-2 rounded-xl"/>
        </div>
      )}
    </>
  );
}
