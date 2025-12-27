import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function createBooking(payload) {
  const docRef = await addDoc(collection(db, "bookings"), {
    ...payload,
    createdAt: serverTimestamp(),
    status: "pending",
  });
  return docRef.id;
}
