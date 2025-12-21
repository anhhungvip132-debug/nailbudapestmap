const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// =======================
// INIT APP
// =======================
const app = express();
const PORT = process.env.PORT || 3001;

// =======================
// MIDDLEWARE
// =======================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  })
);
app.use(express.json());

// =======================
// FIREBASE ADMIN INIT
// =======================
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "admin-server",
    time: new Date().toISOString(),
  });
});

// =======================
// GET /bookings
// =======================
app.get("/bookings", async (req, res) => {
  try {
    const snapshot = await db
      .collection("bookings")
      .orderBy("createdAt", "desc")
      .get();

    const bookings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("GET /bookings error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch bookings",
    });
  }
});

// =======================
// POST /booking (ADMIN)
// =======================
app.post("/booking", async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      source: "admin",
    };

    const ref = await db.collection("bookings").add(data);

    res.json({
      success: true,
      id: ref.id,
    });
  } catch (error) {
    console.error("POST /booking error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create booking",
    });
  }
});

/* =====================================================
   REVIEW MODERATION (MỚI – KHÔNG PHÁ CŨ)
   ===================================================== */

// GET /reviews?status=pending
app.get("/reviews", async (req, res) => {
  try {
    const status = req.query.status || "pending";

    const snapshot = await db
      .collection("reviews")
      .where("status", "==", status)
      .orderBy("createdAt", "desc")
      .get();

    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error("GET /reviews error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch reviews",
    });
  }
});

// PATCH /reviews/:id
app.patch("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status",
      });
    }

    await db.collection("reviews").doc(id).update({
      status,
      reviewedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
      success: true,
      id,
      status,
    });
  } catch (error) {
    console.error("PATCH /reviews/:id error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update review",
    });
  }
});

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`✅ Admin server running on port ${PORT}`);
});
