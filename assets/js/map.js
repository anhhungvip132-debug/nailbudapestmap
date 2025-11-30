// MAP.JS — Luxury Overlay Version

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// === Firebase Config ===
const firebaseConfig = {
  apiKey: "AIzaSyDkq0DKue8884V3AAu_O-cpEmlcalJhDOs",
  authDomain: "nailfinder-6146a.firebaseapp.com",
  projectId: "nailfinder-6146a",
  storageBucket: "nailfinder-6146a.firebasestorage.app",
  messagingSenderId: "703195233020",
  appId: "1:703195233020:web:d0fd8877b2986f03a27579"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === DOM elements ===
const salonList = document.getElementById("salonList");
const overlay = document.createElement("div");
overlay.id = "overlay";
overlay.className = "overlay";
document.body.appendChild(overlay);

// ===== LOAD SALONS TO LIST =====
async function loadSalons() {
  const salons = await getDocs(collection(db, "salons"));
  salonList.innerHTML = "";

  salons.forEach(doc => {
    const s = doc.data();
    salonList.innerHTML += `
      <div class="salon-card" onclick="openOverlay('${doc.id}')">
        <h3>${s.name}</h3>
        <p>📍 ${s.address}</p>
        <p>📞 ${s.phone ?? "Đang cập nhật"}</p>
      </div>
    `;
  });
}

// ===== INIT GOOGLE MAP =====
async function initMap() {
  const salons = await getDocs(collection(db, "salons"));

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.4979, lng: 19.0402 },
    zoom: 13,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#fff8fc" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#b6007c" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] }
    ]
  });

  salons.forEach(doc => {
    const s = doc.data();

    const marker = new google.maps.Marker({
      position: { lat: s.lat, lng: s.lng },
      map,
      title: s.name
    });

    marker.addListener("click", () => openOverlay(doc.id));
  });
}

// ===== LUXURY OVERLAY =====
window.openOverlay = async function (id) {
  overlay.classList.add("active");
  overlay.innerHTML = "<h2>Đang tải...</h2>";

  const snap = await getDoc(doc(db, "salons", id));
  const s = snap.data();

  overlay.innerHTML = `
    <h2 style="color:#b6007c;font-size:26px;margin:0 0 10px;">${s.name}</h2>
    <p style="margin:6px 0;">📍 ${s.address}</p>
    <p style="margin:6px 0;">📞 ${s.phone ?? "Đang cập nhật"}</p>
    <hr style="margin:14px 0;border-color:#f3c5d7;">
    <a href="salon.html?id=${id}" class="lux-btn">💅 Xem dịch vụ</a>
    <a href="booking.html?id=${id}" class="lux-btn">📆 Đặt lịch</a>
    <button onclick="closeOverlay()" class="close-btn">Đóng</button>
  `;
}

window.closeOverlay = () => overlay.classList.remove("active");

// ===== INITIAL CALL =====
loadSalons();
initMap();
