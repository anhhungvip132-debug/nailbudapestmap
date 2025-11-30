import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const box = document.getElementById("salonDetail");

async function loadInfo() {
  const snap = await getDoc(doc(db, "salons", id));
  const s = snap.data();

  box.innerHTML = `
    <h2>${s.name}</h2>
    <p>${s.address}</p>
    <p>${s.phone}</p>
    <a href="booking.html?id=${id}" class="btn">Đặt lịch ngay</a>
  `;
}

loadInfo();
