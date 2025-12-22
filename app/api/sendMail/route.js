import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // ✅ CHỐT: không cho crash build
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return Response.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // ✅ KHỞI TẠO RESEND TẠI ĐÂY (KHÔNG Ở TOP LEVEL)
    const resend = new Resend(apiKey);

    const body = await req.json();

    const {
      salonName,
      customerName,
      customerEmail,
      customerPhone,
      service,
      date,
      time,
      message,
    } = body;

    if (!customerName || !customerEmail || !service || !date || !time) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailHtml = `
      <h2>New Booking Request</h2>
      <p><strong>Salon:</strong> ${salonName}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Phone:</strong> ${customerPhone || "Not provided"}</p>

      <h3>Message</h3>
      <p>${message || "No additional message."}</p>
    `;

    const result = await resend.emails.send({
      from: "Nail Budapest Map <booking@nailbudapestmap.com>",
      to: "owner@nailbudapestmap.com",
      subject: `Booking request - ${salonName}`,
      html: emailHtml,
    });

    return Response.json(
      { success: true, result },
      { status: 200 }
    );
  } catch (error) {
    console.error("SendMail API Error:", error);
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
