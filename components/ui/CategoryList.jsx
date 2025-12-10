"use client";

export default function CategoryList() {
  const categories = [
    { name: "Nail Gel", emoji: "💅", color: "from-pink-200 to-pink-400" },
    { name: "Spa", emoji: "🌸", color: "from-purple-200 to-purple-400" },
    { name: "Gội đầu", emoji: "💆‍♀️", color: "from-blue-200 to-blue-400" },
    { name: "Waxing", emoji: "✨", color: "from-yellow-200 to-yellow-400" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map((c) => (
        <div
          key={c.name}
          className={`bg-gradient-to-br ${c.color} rounded-2xl p-4 text-center shadow-md hover:scale-105 transition`}
        >
          <span className="text-3xl">{c.emoji}</span>
          <p className="mt-2 font-semibold text-gray-700">{c.name}</p>
        </div>
      ))}
    </div>
  );
}
