// ==========================================
// MAP.JS — Google Maps ES Module Version FIX
// ==========================================

// IMPORT GOOGLE MAP LOADER ĐÚNG CHUẨN
import { Loader } from "https://unpkg.com/@googlemaps/js-api-loader/dist/index.esm.js";

// FIREBASE
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

// ===== Haversine =====
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6
