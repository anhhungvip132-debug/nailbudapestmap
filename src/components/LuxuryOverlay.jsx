import React from "react";

const LuxuryOverlay = ({ service, onClose, onBook }) => {
  if (!service) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        <h2 style={styles.title}>{service.name}</h2>
        <p style={styles.price}>{service.price} Ft</p>

        <p style={styles.info}>
          Dịch vụ này thuộc nhóm Luxury
        </p>

        <button style={styles.bookBtn} onClick={() => onBook(service)}>
          Đặt lịch ngay
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  panel: {
    width: "70%",
    maxWidth: 380,
    height: "100%",
    background: "#fff6f5",
    borderLeft: "4px solid #b57c7c",
    padding: 20,
    animation: "slideIn 0.3s ease",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    color: "#b57c7c",
  },
  title: {
    margin: "10px 0",
    color: "#7a5656",
  },
  price: {
    color: "#b57c7c",
    marginBottom: 15,
  },
  info: {
    color: "#8a6e6e",
    fontSize: 14,
    marginBottom: 20,
  },
  bookBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    background: "#b57c7c",
    color: "white",
    fontSize: 16,
  },
};

export default LuxuryOverlay;
