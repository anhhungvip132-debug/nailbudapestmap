import admin from "firebase-admin";
import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { writeAuditLog } from "@/lib/auditLog";

/**
 * checkAdminAuth
 * - DEV: x-admin-key
 * - PROD: Firebase ID Token + custom claim { admin: true }
 * - Return: NextResponse (error) OR null (authorized)
 */
export async function checkAdminAuth(req) {
  try {
    /* ================= DEV ADMIN KEY ================= */
    const devKey = req.headers.get("x-admin-key");
    if (
      devKey &&
      devKey === process.env.NEXT_PUBLIC_ADMIN_API_KEY
    ) {
      return null;
    }

    /* ================= PROD TOKEN ================= */
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      await auditAuthFail(req, "MISSING_AUTH_HEADER");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = await admin.auth().verifyIdToken(token);

    if (!decoded?.admin) {
      await auditAuthFail(req, "MISSING_ADMIN_CLAIM", {
        uid: decoded?.uid || null,
        email: decoded?.email || null,
      });

      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return null; // ✅ authorized
  } catch (err) {
    await auditAuthFail(req, "TOKEN_VERIFY_FAILED", {
      message: err?.message,
    });

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

/* =====================================================
   Helpers
   ===================================================== */

async function auditAuthFail(req, reason, extra = {}) {
  try {
    await writeAuditLog({
      type: "auth",
      action: "ADMIN_AUTH_FAILED",
      meta: {
        reason,
        path: new URL(req.url).pathname,
        ...extra,
      },
      req,
    });
  } catch (_) {
    // ❌ audit failure must NOT block request
  }
}
