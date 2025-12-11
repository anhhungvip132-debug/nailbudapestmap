import blogs from "@/data/blogPosts.json";

export default function BlogSection() {
  return (
    <section>
      <h2>📰 Bài Viết Mới</h2>
      <div className="grid">
        {blogs.map((b, i) => (
          <div key={i} className="card">
            <img src={b.image} alt={b.title} />
            <h3>{b.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
