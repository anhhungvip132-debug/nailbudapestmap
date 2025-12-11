import Image from "next/image";

const posts = [
  {
    id: 1,
    title: "Top 10 Nail Trends in Budapest 2025",
    image: "/images/blog1.jpg"
  },
  {
    id: 2,
    title: "How to Choose the Right Nail Salon",
    image: "/images/blog2.jpg"
  },
  {
    id: 3,
    title: "Why Gel Nails Are So Popular",
    image: "/images/blog3.jpg"
  }
];

export default function BlogSection() {
  return (
    <section>
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
        📄 Bài Viết Mới
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-2xl bg-white shadow"
          >
            <div className="relative h-40 w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900">
                {post.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
