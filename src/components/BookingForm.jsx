import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const BookingForm = ({ service, onComplete }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const sendBooking = async () => {
    if (!name || !phone) {
      alert("Vui lòng nhập đầy đủ họ tên và số điện thoại.");
      return;
    }

    await addDoc(collection(db, "bookings"), {
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      customer: name,
      phone: phone,
      createdAt: serverTimestamp(),
      status: "pending",
    });

    alert("Đặt lịch thành công!");
    onComplete();
  };

  return (
    <div style={styles.box}>
      <h3 style={styles.title}>Đặt lịch dịch vụ: {service.name}</h3>

      <input
        style={styles.input}
        placeholder="Họ và tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button style={styles.btn} onClick={sendBooking}>
        Xác nhận đặt lịch
      </button>
    </div>
  );
};

const styles = {
  box: {
    padding: 20,
    background: "#fffaf8",
    borderRadius: 12,
    border: "1px solid #e4c7c7",
  },
  title: {
    color: "#b57c7c",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #e4c7c7",
    marginBottom: 10,
  },
  btn: {
    width: "100%",
    padding: 12,
    background: "#b57c7c",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
};

export default BookingForm;
