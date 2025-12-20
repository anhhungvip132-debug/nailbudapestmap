import { Resend } from "resend";

export const runtime = "nodejs"; // ⚠️ BẮT BUỘC cho Resend

export async function POST(req) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY missing" }),
        { status: 500 }
      );
    }

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

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: "Nail Budapest Map <onboarding@resend.dev>",
      to: ["delivered@resend.dev"], // TEST CHẮC CHẮN
      subject: `Booking request – ${salonName}`,
      html: `
        <h2>💅 New Booking</h2>
        <p><b>Customer:</b> ${customerName}</p>
        <p><b>Email:</b> ${customerEmail}</p>
        <p><b>Phone:</b> ${customerPhone || "-"}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Date:</b> ${date} ${time}</p>
        <p>${message || ""}</p>
      `,
    });

    return Response.json({ success: true, result });
  } catch (err) {
    console.error("SendMail error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
