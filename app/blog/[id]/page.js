const posts = [
  {
    id: 1,
    title: "Top 10 mẫu nail sang trọng 2024",
    content: "Nội dung chi tiết bài viết…"
  },
  {
    id: 2,
    title: "Cách chọn salon uy tín",
    content: "Nội dung bài viết…"
  },
  {
    id: 3,
    title: "Các mẫu nail hợp mùa đông",
    content: "Nội dung bài viết…"
  }
];

export default function BlogDetail({ params }) {
  const post = posts.find((p) => p.id == params.id);

  if (!post)
    return <p className="p-10 text-center">Không tìm thấy bài viết.</p>;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-pink-600">{post.title}</h1>
      <p className="mt-4 whitespace-pre-line text-gray-700">{post.content}</p>
    </div>
  );
}
