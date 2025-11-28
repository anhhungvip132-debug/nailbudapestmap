import React from "react";

const ServiceCard = ({ service, onSelect }) => {
  return (
    <div style={styles.card} onClick={() => onSelect(service)}>
      <div style={styles.icon}>💅</div>
      <div>
        <h4 style={styles.name}>{service.name}</h4>
        <p style={styles.price}>{service.price} Ft</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    gap: 10,
    padding: 15,
    borderRadius: 10,
    border: "1px solid #e7c3c3",
    background: "#fff6f5",
    cursor: "pointer",
    alignItems: "center",
  },
  icon: {
    fontSize: 28,
    color: "#b57c7c", // Rose-gold tone
  },
  name: {
    margin: 0,
    color: "#7a5656",
  },
  price: {
    margin: 0,
    fontSize: 14,
    color: "#a37979",
  },
};

export default ServiceCard;
