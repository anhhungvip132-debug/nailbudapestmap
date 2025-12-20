import { Resend } from "resend";

/**
 * ⚠️ BẮT BUỘC
 * ép Vercel chạy bằng NodeJS
 * nếu không → KHÔNG có Functions
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("❌ RESEND_API_KEY missing");
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
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Phone:</strong> ${customerPhone || "-"}</p>
      <p>${message || ""}</p>
    `;

    const result = await resend.emails.send({
      from: "Nail Budapest Map <onboarding@resend.dev>",
      to: ["anhhungvip132@gmail.com"],
      subject: `Booking – ${salonName}`,
      html,
    });

    console.log("✅ EMAIL SENT:", result.id);

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ SENDMAIL ERROR:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500 }
    );
  }
}
