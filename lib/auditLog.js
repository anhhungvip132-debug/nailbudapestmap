// lib/auditLog.js

import admin from "firebase-admin";

/**
 * Ghi audit log cho admin / cron / auth actions
 *
 * @param {Object} params
 * @param {"admin_action" | "cron" | "auth"} params.type
 * @param {string} params.action
 * @param {Object} [params.admin]
 * @param {string|null} params.admin.uid
 * @param {string|null} params.admin.email
 * @param {Object} [params.target]
 * @param {string} params.target.collection
 * @param {string} params.target.id
 * @param {Object} [params.meta]
 * @param {Request} [params.req] - Next.js Request (optional, để lấy IP, UA)
 */
export async function writeAuditLog({
  type,
  action,
  admin: adminUser = null,
  target = null,
  meta = {},
  req = null,
}) {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }

    const db = admin.firestore();

    let ip = null;
    let userAgent = null;

    if (req) {
      ip =
        req.headers.get("x-forwarded-for") ||
        req.headers.get("x-real-ip") ||
        null;

      userAgent = req.headers.get("user-agent") || null;
    }

    const payload = {
      type,
      action,
      adminUid: adminUser?.uid || null,
      adminEmail: adminUser?.email || null,
      target: target
        ? {
            collection: target.collection,
            id: target.id,
          }
        : null,
      meta,
      ip,
      userAgent,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("auditLogs").add(payload);
  } catch (err) {
    // ❗ Tuyệt đối KHÔNG throw
    // Audit log không được làm crash business logic
    console.error("[AUDIT_LOG_ERROR]", err);
  }
}
