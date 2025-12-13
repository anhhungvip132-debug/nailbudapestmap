export default function CategoryList({ categories = [] }) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="px-4 py-2 rounded-full border text-sm hover:bg-black hover:text-white transition"
        >
          {category}
        </button>
      ))}
    </div>
  )
}