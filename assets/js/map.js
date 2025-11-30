// =============================================
// MAP.JS — FIXED VERSION FOR NAILBUDAPESTMAP
// =============================================

import { Loader } from "https://unpkg.com/@googlemaps/js-api-loader/dist/index.esm.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, getDocs, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkq0DKue8884V3AAu_O-cpEmlcalJhDOs",
  authDomain: "nailfinder-6146a.firebaseapp.com",
  projectId: "nailfinder-6146a",
  storageBucket: "nailfinder-6146a.firebasestorage.app",
  messagingSenderId: "703195233020",
  appId: "1:703195233020:web:d0fd8877b2986f03a27579"
};

initializeApp(firebaseConfig);
const db = getFirestore();

// Haversine
function getDistance(a, b, c, d) {
  const R = 6371;
  const dLat = (c - a) * Math.PI / 180;
  const dLng = (d - b) * Math.PI / 180;
  const x = Math.sin(dLat/2)**2 +
            Math.cos(a * Math.PI/180) *
            Math.cos(c * Math.PI/180) *
            Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

// START APP
new Loader({
  apiKey: "AIzaSyAX0qJVDsB2FWUELDeCY3hw71NEBLqiCpU",
  version: "weekly",
  libraries: ["places"],
}).load().then(() => initMap());

// INIT MAP
async function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.4979, lng: 19.0402 },
    zoom: 13
  });

  navigator.geolocation.getCurrentPosition(
    pos => loadSalons(map, pos.coords.latitude, pos.coords.longitude),
    () => loadSalons(map, 47.4979, 19.0402)
  );
}

// LOAD SALONS
async function loadSalons(map, usLat, usLng) {
  const snap = await getDocs(collection(db, "salons"));
  const salons = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  document.getElementById("salonList").innerHTML = "";

  // Marker user
  new google.maps.Marker({
    position: { lat: usLat, lng: usLng },
    map,
    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  });

  salons.forEach(s => {
    const dist = getDistance(usLat, usLng, s.lat, s.lng).toFixed(1);
    document.getElementById("salonList").innerHTML += `
      <div class="salon-card" onclick="openOverlay('${s.id}')">
        <h3>${s.name}</h3>
        <p>📍 ${s.address}</p>
        <p>📞 ${s.phone ?? "Đang cập nhật"}</p>
        <p>🚶 ${dist} km</p>
      </div>
    `;

    const marker = new google.maps.Marker({
      map,
      position: { lat: s.lat, lng: s.lng },
      title: s.name
    });

    marker.addListener("click", () => openOverlay(s.id));
  });
}

// OVERLAY
window.openOverlay = async id => {
  const data = (await getDoc(doc(db, "salons", id))).data();
  document.getElementById("overlay").innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.address}</p>
    <p>${data.phone ?? "Đang cập nhật"}</p>
    <a href="salon.html?id=${id}" class="lux-btn">💅 Xem dịch vụ</a>
    <a href="booking.html?id=${id}" class="lux-btn">📆 Đặt lịch</a>
    <button onclick="closeOverlay()">Đóng</button>
  `;
  document.getElementById("overlay").classList.add("active");
};

window.closeOverlay = () => document.getElementById("overlay").classList.remove("active");
