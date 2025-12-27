// scripts/importSalons.js

require("dotenv").config({ path: ".env.local" });

const admin = require("firebase-admin");
const salons = require("../data/salons.json");

if (!process.env.FIREBASE_ADMIN_CREDENTIALS) {
  console.error("❌ FIREBASE_ADMIN_CREDENTIALS is missing");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
  ),
});

const db = admin.firestore();

(async () => {
  for (const s of salons) {
    await db.collection("salons").doc(String(s.id)).set(
      {
        featured: !!s.featured,
        premium: !!s.premium,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  console.log("✅ Import salons done");
  process.exit(0);
})();
