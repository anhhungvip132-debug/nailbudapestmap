// ========================
// MAP.JS — CALLBACK VERSION
// ========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// Hàm tính khoảng cách
function getDistance(a, b, c, d) {
  const R = 6371;
  const dLat = ((c - a) * Math.PI) / 180;
  const dLng = ((d - b) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a * Math.PI / 180) *
      Math.cos(c * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;
  return (R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))).toFixed(1);
}

// Google Map callback
window.initMap = async function () {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 47.4979, lng: 19.0402 },
  });

  navigator.geolocation.getCurrentPosition(
    pos => loadSalons(map, pos.coords.latitude, pos.coords.longitude),
    () => loadSalons(map, 47.4979, 19.0402)
  );
};

// Load salon
async function loadSalons(map, lat, lng) {
  const snap = await getDocs(collection(db, "salons"));
  const salons = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  new google.maps.Marker({
    position: { lat, lng },
    map,
    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    title: "Bạn đang ở đây",
  });

  document.getElementById("salonList").innerHTML = "";

  salons.forEach(s => {
    const dist = getDistance(lat, lng, s.lat, s.lng);

    new google.maps.Marker({
      position: { lat: s.lat, lng: s.lng },
      map,
      title: s.name,
    });

    document.getElementById("salonList").innerHTML += `
      <div class="salon-card" onclick="openOverlay('${s.id}')">
        <h3>${s.name}</h3>
        <p>📍 ${s.address}</p>
        <p>📞 ${s.phone ?? "Đang cập nhật"}</p>
        <p>🚶 ${dist} km</p>
      </div>
    `;
  });
}

// Overlay
window.openOverlay = async id => {
  const snap = await getDoc(doc(db, "salons", id));
  const s = snap.data();
  const overlay = document.getElementById("overlay");

  overlay.innerHTML = `
    <div class="overlay-box">
      <h2>${s.name}</h2>
      <p>${s.address}</p>
      <button onclick="closeOverlay()">Đóng</button>
    </div>
  `;
  overlay.classList.add("active");
};

window.closeOverlay = () =>
  document.getElementById("overlay").classList.remove("active");
