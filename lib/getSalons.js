import salonsJson from "@/data/salons.json";
import admin from "firebase-admin";

export async function getSalons() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
      ),
    });
  }

  const db = admin.firestore();
  const snap = await db.collection("salons").get();

  const overrides = {};
  snap.forEach((doc) => (overrides[doc.id] = doc.data()));

  return salonsJson.map((s) => ({
    ...s,
    ...overrides[String(s.id)],
  }));
}
