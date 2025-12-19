import { Resend } from "resend";

/**
 * POST /api/sendMail
 * Body:
 * {
 *   salonName,
 *   customerName,
 *   customerEmail,
 *   customerPhone,
 *   service,
 *   date,
 *   time,
 *   message
 * }
 */
export async function POST(req) {
  try {
    // ✅ CHECK ENV RUNTIME (KHÔNG CRASH BUILD)
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
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

    // ✅ VALIDATION
    if (!customerName || !customerEmail || !service || !date || !time) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // ✅ EMAIL TEMPLATE
    const emailHtml = `
      <h2>💅 New Booking Request</h2>

      <p><strong>Salon:</strong> ${salonName}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>

      <hr />

      <h3>👤 Customer Information</h3>
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Phone:</strong> ${customerPhone || "Not provided"}</p>

      <h3>📝 Message</h3>
      <p>${message || "No additional message."}</p>
    `;

    // ✅ SEND EMAIL
    const result = await resend.emails.send({
      from: "Nail Budapest Map <onboarding@resend.dev>",
      to: ["anhhungvip132@gmail.com"], // 👉 đổi thành email salon sau
      subject: `Booking request – ${salonName}`,
      html: emailHtml,
    });

    return new Response(
      JSON.stringify({ success: true, result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("SendMail API Error:", error);

    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
