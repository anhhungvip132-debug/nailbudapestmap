"use client";

export default function BlogSection() {
  const posts = [
    {
      id: 1,
      title: "Top 10 mẫu nail sang trọng 2024",
      content: "Full nội dung bài viết… (bạn có thể thêm vào sau)"
    },
    {
      id: 2,
      title: "Cách chọn salon uy tín",
      content: "Full nội dung bài viết…"
    },
    {
      id: 3,
      title: "5 mẫu nail hợp mùa đông",
      content: "Full nội dung bài viết…"
    }
  ];

  return (
    <div className="section card p-6">
      <h2 className="heading">Blog Làm Đẹp</h2>

      <div className="space-y-6">
        {posts.map((p) => (
          <div key={p.id} className="p-5 shadow-md rounded-xl bg-white">
            <h3 className="text-xl font-bold text-pink-600">{p.title}</h3>
            <p className="text-gray-700 mt-3 whitespace-pre-line">{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
