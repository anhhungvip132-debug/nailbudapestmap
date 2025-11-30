// ================================================
// MAP.JS — Nail Budapest Map (Luxury Version)
// ================================================

// 1️⃣ HÀM TÍNH KHOẢNG CÁCH THEO CÔNG THỨC HAVERSINE
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}


// 2️⃣ FIREBASE KẾT NỐI
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


// 3️⃣ DOM ELEMENTS
const salonList = document.getElementById("salonList");
const overlay = document.createElement("div");
overlay.id = "overlay";
overlay.className = "overlay";
document.body.appendChild(overlay);

let salonCache = []; // Cache salons để xử lý khoảng cách


// 4️⃣ TẢI DANH SÁCH SALON + TÍNH KHOẢNG CÁCH
async function loadSalons(userPos) {
  const salonsSnap = await getDocs(collection(db, "salons"));
  salonCache = salonsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  salonList.innerHTML = "";

  salonCache.forEach(s => {
    const dist = userPos
      ? getDistance(userPos.lat, userPos.lng, s.lat, s.lng).toFixed(1)
      : "—";

    salonList.innerHTML += `
      <div class="salon-card" onclick="openOverlay('${s.id}')">
        <h3>${s.name}</h3>
        <p>📍 ${s.address}</p>
        <p>📞 ${s.phone ?? "Đang cập nhật"}</p>
        <p>🚶 Gần bạn: <b>${dist} km</b></p>
      </div>
    `;
  });
}


// 5️⃣ KHỞI TẠO GOOGLE MAP + LẤY VỊ TRÍ USER
async function initMap() {
  const salonsSnap = await getDocs(collection(db, "salons"));
  salonCache = salonsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#fff8fc" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#b6007c" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] }
    ]
  });

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      map.setCenter(userPos);

      new google.maps.Marker({
        position: userPos,
        map,
        icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        title: "Vị trí của bạn"
      });

      loadSalons(userPos);
      renderSalonMarkers(map, userPos);
    },
    () => {
      const defaultPos = { lat: 47.4979, lng: 19.0402 }; // Budapest
      map.setCenter(defaultPos);

      loadSalons(defaultPos);
      renderSalonMarkers(map, defaultPos);
    }
  );
}


// 6️⃣ HIỂN THỊ MARKER SALONS LÊN MAP
function renderSalonMarkers(map, userPos) {
  salonCache.forEach(s => {
    const marker = new google.maps.Marker({
      position: { lat: s.lat, lng: s.lng },
      map,
      title: s.name
    });

    marker.addListener("click", () => openOverlay(s.id));
  });
}


// 7️⃣ OVERLAY DETAIL
window.openOverlay = async function (id) {
  overlay.classList.add("active");
  overlay.innerHTML = "<h2>Đang tải...</h2>";

  const snap = await getDoc(doc(db, "salons", id));
  const s = snap.data();

  overlay.innerHTML = `
    <h2 style="color:#b6007c;font-size:26px;margin:0 0 10px;">${s.name}</h2>
    <p>📍 ${s.address}</p>
    <p>📞 ${s.phone ?? "Đang cập nhật"}</p>
    <hr style="margin:14px 0;border-color:#f3c5d7;">
    <a href="salon.html?id=${id}" class="lux-btn">💅 Xem dịch vụ</a>
    <a href="booking.html?id=${id}" class="lux-btn">📆 Đặt lịch</a>
    <button onclick="closeOverlay()" class="close-btn">Đóng</button>
  `;
};

window.closeOverlay = () => overlay.classList.remove("active");


// 8️⃣ CHẠY APP
window.initMap = initMap;
