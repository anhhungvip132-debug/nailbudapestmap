// lib/userRole.js
"use client";

import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * users/{uid}
 * {
 *   role: "admin" | "owner" | "user",
 *   salonId?: string
 * }
 */
export async function getUserRole(uid) {
  if (!uid) return null;

  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return snap.data();
  } catch (err) {
    console.error("getUserRole error", err);
    return null;
  }
}
