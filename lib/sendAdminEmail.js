// lib/sendAdminEmail.js

import nodemailer from "nodemailer";

export async function sendAdminEmail({ subject, html }) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    ADMIN_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ADMIN_EMAIL) {
    throw new Error("Missing SMTP / ADMIN_EMAIL env");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"NailBudapestMap" <${SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject,
    html,
  });
}
