// lib/firebaseAdmin.js

import admin from "firebase-admin";

let app;

/* ================= INIT ADMIN ================= */
function initAdmin() {
  if (app) return app;

  const credentials = process.env.FIREBASE_ADMIN_CREDENTIALS;
  if (!credentials) {
    throw new Error("Missing FIREBASE_ADMIN_CREDENTIALS");
  }

  let serviceAccount;

  try {
    serviceAccount = JSON.parse(credentials);

    // ⚠️ FIX QUAN TRỌNG CHO WINDOWS
    // private_key thường bị lỗi \n khi lưu trong .env
    if (serviceAccount.private_key) {
      serviceAccount.private_key =
        serviceAccount.private_key.replace(/\\n/g, "\n");
    }
  } catch (err) {
    throw new Error("Invalid FIREBASE_ADMIN_CREDENTIALS JSON");
  }

  if (!admin.apps.length) {
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    app = admin.app();
  }

  return app;
}

/* ================= EXPORTS ================= */
export function getAdminApp() {
  return initAdmin();
}

export function getAdminDb() {
  return initAdmin().firestore();
}

export function getAdminTimestamp() {
  return admin.firestore.Timestamp.now();
}
