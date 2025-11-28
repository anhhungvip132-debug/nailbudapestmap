import React, { useState } from "react";

function App() {
  const [selectedSalon, setSelectedSalon] = useState(null);
  const salons = [
    { id: "pink-house", name: "Pink House", address: "Budapest, District 7" },
    { id: "rose-gold-studio", name: "Rose Gold Studio", address: "Budapest, District 5" }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nail Budapest Map</h1>
      <p style={styles.subtitle}>Khám phá tiệm nail luxury tại Budapest</p>

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

      {selectedSalon && (
        <div style={styles.selectedBox}>
          <h2>{selectedSalon.name}</h2>
          <p>Chọn dịch vụ để đặt lịch...</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    marginTop: 20,
    color: "#b57c7c",
  },
  subtitle: {
    textAlign: "center",
    color: "#8c6b6b",
    marginBottom: 30,
  },
  salonList: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  salonCard: {
    border: "1px solid #e4c7c7",
    padding: 15,
    borderRadius: 10,
    cursor: "pointer",
    background: "#fff6f5",
  },
  selectedBox: {
    marginTop: 20,
    padding: 15,
    border: "2px solid #d7b0b0",
    borderRadius: 10,
  },
};

export default App;
