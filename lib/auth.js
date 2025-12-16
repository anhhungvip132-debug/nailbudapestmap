"use client";

import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/* ========= AUTH ========= */

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function listenAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

/* ========= ROLE ========= */
/**
 * users/{uid}
 * {
 *   role: "admin" | "owner"
 * }
 */
export async function getUserRole(uid) {
  if (!uid) return null;
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
