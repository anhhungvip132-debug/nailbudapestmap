import { GiNails, GiHand } from "react-icons/gi";
import { MdSpa } from "react-icons/md";

const categories = [
  { name: "Manicure", icon: <GiHand size={28} /> },
  { name: "Gel Nails", icon: <GiNails size={28} /> },
  { name: "Pedicure", icon: <MdSpa size={28} /> }
];

export default function CategoryList() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-3">Categories</h2>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((c) => (
          <div
            key={c.name}
            className="bg-white shadow p-4 rounded-xl flex flex-col items-center gap-2"
          >
            {c.icon}
            <span className="font-semibold">{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
