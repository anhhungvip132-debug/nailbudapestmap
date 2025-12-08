import Image from "next/image";

export default function BlogDetail({ params }) {
  const article = {
    title: "Xu hướng Nail 2025",
    content: `
      Nail 2025 tập trung vào phong cách tự nhiên, trong suốt, pastel nhẹ nhàng.
      Xu hướng chrome và ombre vẫn tiếp tục lên ngôi!
    `,
    cover:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

      <div className="relative h-72 rounded-xl overflow-hidden mb-6">
        <Image src={article.cover} alt={article.title} fill className="object-cover" />
      </div>

      <p className="text-gray-700 leading-8 whitespace-pre-line">
        {article.content}
      </p>
    </div>
  );
}
