import BookingClient from "./BookingClient";

export const dynamic = "force-dynamic";

export default function BookingPage({ params }) {
  return <BookingClient salonId={params.id} />;
}
