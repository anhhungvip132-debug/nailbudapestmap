// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkq0DKue8884V3AAu_O-cpEmlcalJhDOs",
  authDomain: "nailfinder-6146a.firebaseapp.com",
  projectId: "nailfinder-6146a",
  storageBucket: "nailfinder-6146a.firebasestorage.app",
  messagingSenderId: "703195233020",
  appId: "1:703195233020:web:d0fd8877b2986f03a27579",
  measurementId: "G-DSW8H0CZN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
