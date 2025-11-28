import React, { useState } from "react";
import ServiceCard from "./components/ServiceCard";
import LuxuryOverlay from "./components/LuxuryOverlay";
import BookingForm from "./components/BookingForm";

function App() {
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);

  const salons = [
    {
      id: "pink-house",
      name: "Pink House",
      address: "Budapest, District 7",
      services: [
        { id: "gel-nails", name: "Gel Nails", price: 12000 },
        { id: "manicure", name: "Manicure", price: 8000 },
      ],
    },
    {
      id: "rose-gold-studio",
      name: "Rose Gold Studio",
      address: "Budapest, District 5",
      services: [
        { id: "luxury-nails", name: "Luxury Nails", price: 18000 },
        { id: "spa-hands", name: "Spa Hands", price: 15000 },
      ],
    },
  ];

  const selectService = (service) => setSelectedService(service);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nail Budapest Map</h1>
      <p style={styles.subtitle}>Khám phá tiệm nail luxury tại Budapest</p>

      {!selectedSalon && (
        <div style={styles.salonList}>
          {salons.map((salon) => (
            <div
              key={salon.id}
              style={styles.salonCard}
              onClick={() => setSelectedSalon(salon)}
            >
              <h3>{salon.name}</h3>
              <p>{salon.address}</p>
            </div>
          ))}
        </div>
      )}

      {selectedSalon && !selectedService && (
        <div style={styles.serviceList}>
          <h2 style={styles.salonName}>{selectedSalon.name}</h2>

          {selectedSalon.services.map((service) => (
            <ServiceCard key={service.id} service={service} onSelect={selectService} />
          ))}
        </div>
      )}

      <LuxuryOverlay
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={(service) => setBookingService(service)}
      />

      {bookingService && (
        <BookingForm
          service={bookingService}
          onComplete={() => setBookingService(null)}
        />
      )}
    </div>
  );
}

const styles = {
  container: { padding: 20, fontFamily: "sans-serif" },
  title: { textAlign: "center", marginTop: 20, color: "#b57c7c" },
  subtitle: { textAlign: "center", color: "#8c6b6b", marginBottom: 30 },
  salonList: { display: "flex", flexDirection: "column", gap: 15 },
  salonCard: {
    border: "1px solid #e4c7c7",
    padding: 15,
    borderRadius: 10,
    background: "#fff6f5",
    cursor: "pointer",
  },
  salonName: { color: "#b57c7c", marginBottom: 20 },
  serviceList: { display: "flex", flexDirection: "column", gap: 10 },
};

export default App;
