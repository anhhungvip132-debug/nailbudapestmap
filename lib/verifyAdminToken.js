import admin from "firebase-admin";

/**
 * Verify Firebase ID Token & check admin custom claim
 *
 * @param {Request} req
 * @returns {Promise<{ uid: string, email: string | null } | null>}
 */
export async function verifyAdminToken(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const idToken = authHeader.replace("Bearer ", "");

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);

    // ✅ CHECK CUSTOM CLAIM
    if (decoded.admin !== true) {
      return null;
    }

    return {
      uid: decoded.uid,
      email: decoded.email || null,
    };
  } catch (err) {
    console.error("verifyAdminToken failed:", err.message);
    return null;
  }
}
