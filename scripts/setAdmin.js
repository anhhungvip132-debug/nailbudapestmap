/**
 * Run once to grant admin role
 * node scripts/setAdmin.js your-email@gmail.com
 */

const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = JSON.parse(
  fs.readFileSync("./firebase-admin.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = process.argv[2];
if (!email) {
  console.error("❌ Missing email");
  process.exit(1);
}

async function run() {
  const user = await admin.auth().getUserByEmail(email);

  await admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });

  console.log(`✅ Admin role granted for ${email}`);
  process.exit(0);
}

run();
