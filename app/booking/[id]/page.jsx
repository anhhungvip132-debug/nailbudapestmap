import salons from "@/data/salons.json";
import BookingForm from "@/components/ui/BookingForm";

export default function BookingPage({ params }) {
  const salon = salons.find((s) => String(s.id) === params.id);

  if (!salon) {
    return <p className="p-6">Salon không tồn tại.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <BookingForm salon={salon} />
    </div>
  );
}
