export default function CategoryList() {
  const items = ["Manicure", "Pedicure", "Gel Nails", "Nail Art", "Spa", "Combo"];

  return (
    <section className="max-w-6xl mx-auto mt-14 px-6 grid grid-cols-2 md:grid-cols-6 gap-6">
      {items.map((item) => (
        <div key={item} className="bg-white shadow p-6 rounded-xl text-center hover:shadow-xl cursor-pointer">
          {item}
        </div>
      ))}
    </section>
  );
}
