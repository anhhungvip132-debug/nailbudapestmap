"use client";
import ButtonPink from "./ButtonPink";

export default function BlogSection() {
  const posts = [
    {
      id: 1,
      title: "Xu hướng nail sang 2024",
      text: "Những mẫu nail đang thịnh hành tại Budapest...",
    },
    {
      id: 2,
      title: "Cách chọn salon uy tín",
      text: "3 mẹo giúp bạn tránh salon kém chất lượng...",
    },
    {
      id: 3,
      title: "Các mẫu nail hợp mùa đông",
      text: "Gợi ý màu sắc nail mùa lạnh cực xinh...",
    },
  ];

  return (
    <div className="section card p-6">
      <h2 className="heading">Blog Làm Đẹp</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="rounded-2xl p-5 border shadow-md">
            <h3 className="font-bold text-lg text-pink-600">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.text}</p>
            <ButtonPink text="Đọc bài →" className="mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
