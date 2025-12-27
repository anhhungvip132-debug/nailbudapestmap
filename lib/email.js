import { Resend } from "resend";

/* ================= INIT ================= */
if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is missing");
}

const resend = new Resend(process.env.RESEND_API_KEY);

/* ================= CONFIG ================= */
const FROM_EMAIL = "Nail Budapest Map <onboarding@resend.dev>";
const ADMIN_EMAIL = "anhhungvip132@gmail.com";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/* ================= TEMPLATE ================= */
function wrapEmail(content) {
  return `
    <div style="font-family:Arial,sans-serif;background:#f9fafb;padding:24px">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:24px">
        <h1 style="color:#e91e63;margin-bottom:16px">💅 Nail Budapest Map</h1>
        ${content}
        <hr style="margin:24px 0"/>
        <p style="font-size:12px;color:#999">
          This is an automated email. Please do not reply.
        </p>
      </div>
    </div>
  `;
}

/* ================= ADMIN ================= */
export async function sendAdminBookingEmail(b) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: "📩 New booking pending approval",
    html: wrapEmail(`
      <p><b>Customer:</b> ${b.name}</p>
      <p><b>Email:</b> ${b.email}</p>
      <p><b>Service:</b> ${b.service}</p>
      <p><b>Date:</b> ${b.date} – ${b.time}</p>
      <p>Status: <b style="color:orange">PENDING</b></p>
    `),
  });
}

/* ================= USER – PENDING ================= */
export async function sendUserBookingEmail(b) {
  if (!b.email) return;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: b.email,
    subject: "✅ Booking received",
    html: wrapEmail(`
      <p>Hi <b>${b.name}</b>,</p>
      <p>Your booking request has been received.</p>

      <ul>
        <li><b>Service:</b> ${b.service}</li>
        <li><b>Date:</b> ${b.date}</li>
        <li><b>Time:</b> ${b.time}</li>
      </ul>

      <p>
        👉 <a href="${SITE_URL}/booking-status"
             style="color:#e91e63;font-weight:bold">
          Check booking status
        </a>
      </p>
    `),
  });
}

/* ================= USER – APPROVED ================= */
export async function sendBookingApprovedEmail(b) {
  if (!b.email) return;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: b.email,
    subject: "🎉 Booking confirmed",
    html: wrapEmail(`
      <p>Hi <b>${b.name}</b>,</p>
      <p>Your booking has been <b style="color:green">CONFIRMED</b>.</p>

      <ul>
        <li><b>Service:</b> ${b.service}</li>
        <li><b>Date:</b> ${b.date}</li>
        <li><b>Time:</b> ${b.time}</li>
      </ul>

      <p>
        👉 <a href="${SITE_URL}/booking-status"
             style="color:#e91e63;font-weight:bold">
          View booking details
        </a>
      </p>
    `),
  });
}

/* ================= USER – REJECTED ================= */
export async function sendBookingRejectedEmail(b) {
  if (!b.email) return;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: b.email,
    subject: "❌ Booking declined",
    html: wrapEmail(`
      <p>Hi <b>${b.name}</b>,</p>
      <p>Your booking on <b>${b.date}</b> at <b>${b.time}</b> was declined.</p>

      <p>
        👉 <a href="${SITE_URL}/booking-status"
             style="color:#e91e63;font-weight:bold">
          Check other bookings
        </a>
      </p>
    `),
  });
}
