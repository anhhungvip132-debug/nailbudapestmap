"use client"

const BLOGS = [
  {
    id: 1,
    title: "5 tips để chọn tiệm nail uy tín tại Budapest",
    excerpt: "Cách kiểm tra review, vệ sinh và tay nghề thợ.",
  },
  {
    id: 2,
    title: "Xu hướng mẫu nail 2025 tại châu Âu",
    excerpt: "Những mẫu nail hot tại Paris, Berlin, Budapest.",
  },
]

export default function BlogSection() {
  if (!Array.isArray(BLOGS)) return null

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Blog làm đẹp</h2>
      <div className="space-y-4">
        {BLOGS.map((blog) => (
          <div key={blog.id}>
            <h3 className="font-medium">{blog.title}</h3>
            <p className="text-sm text-gray-600">{blog.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
