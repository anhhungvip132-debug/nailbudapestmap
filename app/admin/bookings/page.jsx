import AdminBookingDashboard from "@/components/ui/AdminBookingDashboard";

export const metadata = {
  title: "Admin Bookings – NailBudapestMap",
};

export default function AdminBookingsPage() {
  return (
    <main style={{ padding: 24 }}>
      <AdminBookingDashboard />
    </main>
  );
}
