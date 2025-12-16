"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "reviews"))
      .then((snap) => {
        setReviews(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  async function approve(id) {
    await updateDoc(doc(db, "reviews", id), { status: "approved" });
    setReviews((r) =>
      r.map((x) =>
        x.id === id ? { ...x, status: "approved" } : x
      )
    );
  }

  if (loading) {
    return (
      <p className="p-6 text-center text-gray-500">
        Đang tải đánh giá…
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Duyệt đánh giá
      </h1>

      {reviews.length === 0 && (
        <p className="text-gray-500">
          Chưa có đánh giá nào.
        </p>
      )}

      {reviews.map((r) => (
        <div
          key={r.id}
          className="border border-pink-100 bg-white p-4 rounded-xl mb-3"
        >
          <p className="font-semibold">
            {r.name} ⭐ {r.rating}
          </p>
          <p className="text-gray-700">{r.comment}</p>

          {r.status !== "approved" ? (
            <button
              onClick={() => approve(r.id)}
              className="mt-3 inline-flex rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600"
            >
              Approve
            </button>
          ) : (
            <span className="mt-3 inline-block text-sm text-green-600">
              ✔ Đã duyệt
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
