// MAP.JS — Luxury Overlay Version

// ========== 1️⃣ HÀM TÍNH KHOẢNG CÁCH (Haversine) ==========
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Bán kính Trái Đất theo km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
// ==========================================================


// ===== Firebase =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// ===== DOM =====
const salonList = document.getElementById("salonList");
const overlay = document.createElement("div");
overlay.id = "overlay";
overlay.className = "overlay";
document.body.appendChild(overlay);


// ===== LOAD SALONS =====
async function loadSalons() {
  const salons = await getDocs(collection(db, "salons"));
  salonList.innerHTML = "";

  // Ví dụ: tọa độ người dùng tại Budapest trung tâm
  const userLat = 47.4979;
  const userLng = 19.0402;

  salons.forEach(doc => {
    const s = doc.data();
    const km = getDistance(userLat, userLng, s.lat, s.lng).toFixed(1);

    salonList.innerHTML += `
      <div class="salon-card" onclick="openOverlay('${doc.id}')">
        <h3>${s.name}</h3>
        <p>📍 ${s.address}</p>
        <p>📞 ${s.phone ?? "Đang cập nhật"}</p>
        <p>🚶 Cách bạn: <b>${km} km</b></p>
      </div>
    `;
  });
}


// ===== INIT MAP =====
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


// ===== OVERLAY =====
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


// ===== START =====
loadSalons();
initMap();
