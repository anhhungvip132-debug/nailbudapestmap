import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

/* ===== LOAD GOOGLE MAP ===== */
async function initMap() {
  const salons = await getDocs(collection(db, "salons"));

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.4979, lng: 19.0402 }, // Budapest
    zoom: 12
  });

  salons.forEach(doc => {
    const s = doc.data();
    new google.maps.Marker({
      position: { lat: s.lat, lng: s.lng },
      map,
      title: s.name
    });
  });
}

/* ===== LOAD SALON LIST ===== */
async function loadSalons() {
  const container = document.getElementById("salonList");
  container.innerHTML = "";
  const salons = await getDocs(collection(db, "salons"));

  salons.forEach(doc => {
    const s = doc.data();
    container.innerHTML += `
      <div class="salon-card">
        <h3>${s.name}</h3>
        <p>${s.address}</p>
        <a href="salon.html?id=${doc.id}">Xem dịch vụ</a>
      </div>
    `;
  });
}

initMap();
loadSalons();
