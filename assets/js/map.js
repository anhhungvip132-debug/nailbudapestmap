// ============ MAP.JS FINAL VERSION ============

// FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, getDocs, doc, getDoc, collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// GOOGLE MAPS LOADER
import { Loader } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import "https://maps.googleapis.com/maps/api/js?key=AIzaSyAX0qJVDsB2FWUELDeCY3hw71NEBLqiCpU";

// CONFIG
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

// HAVERSINE
function getDistance(a, b, c, d) {
  const R = 6371;
  const x = (c - a) * Math.PI / 180;
  const y = (d - b) * Math.PI / 180;
  const h = Math.sin(x/2)**2 + Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(y/2)**2;
  return (R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1-h))).toFixed(1);
}

// INIT APP
async function initMap() {
  const google = window.google;

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 47.4979, lng: 19.0402 }
  });

  navigator.geolocation.getCurrentPosition(
    pos => loadSalons(map, pos.coords.latitude, pos.coords.longitude),
    () => loadSalons(map, 47.4979, 19.0402)
  );
}

// LOAD & PRINT SALONS
async function loadSalons(map, lat, lng) {
  const snap = await getDocs(collection(db, "salons"));
  const salons = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  map.setCenter({ lat, lng });

  new google.maps.Marker({ position: { lat, lng }, map, icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" });

  const list = document.getElementById("salonList");
  list.innerHTML = "";

  salons.forEach(s => {
    const marker = new google.maps.Marker({ position: { lat: s.lat, lng: s.lng }, map });

    marker.addListener("click", () => openOverlay(s.id));

    list.innerHTML += `
      <div class="salon-card" onclick="openOverlay('${s.id}')">
        <h3>${s.name}</h3>
        <p>${s.address}</p>
        <p>🚶 ${getDistance(lat, lng, s.lat, s.lng)} km</p>
      </div>`;
  });
}

window.openOverlay = async function(id) {
  const snap = await getDoc(doc(db, "salons", id));
  const s = snap.data();
  const div = document.getElementById("overlay");
  div.classList.add("active");
  div.innerHTML = `<h2>${s.name}</h2><p>${s.address}</p><button onclick="closeOverlay()">Đóng</button>`;
};
window.closeOverlay = () => document.getElementById("overlay").classList.remove("active");

// RUN
initMap();
