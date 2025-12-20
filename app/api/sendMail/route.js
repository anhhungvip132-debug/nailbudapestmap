import { Resend } from "resend";

/**
 * IMPORTANT:
 * - MUST run in Node.js runtime (Resend does NOT support Edge)
 * - MUST use default sender EXACTLY as provided by Resend
 */

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY missing" }),
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();

    const {
      salonName = "Nail Budapest Map",
      customerName,
      customerEmail,
      customerPhone,
      service,
      date,
      time,
      message,
    } = body;

    if (!customerName || !customerEmail || !service || !date || !time) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const html = `
      <h2>💅 New Booking Request</h2>

      <p><strong>Salon:</strong> ${salonName}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>

      <hr />

      <h3>👤 Customer</h3>
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Phone:</strong> ${customerPhone || "N/A"}</p>

      <h3>📝 Message</h3>
      <p>${message || "No message"}</p>
    `;

    const result = await resend.emails.send({
      from: "onboarding@resend.dev", // ⛔ DO NOT CHANGE
      to: ["anhhungvip132@gmail.com"],
      subject: `Booking request – ${salonName}`,
      html,
    });

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { status: 200 }
    );
  } catch (err) {
    console.error("SendMail error:", err);

    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
