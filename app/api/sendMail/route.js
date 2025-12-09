import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.email) {
      return Response.json(
        { success: false, message: "Missing email" },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: body.email,
      subject: "Booking Confirmation",
      html: `<p>Thank you for booking!</p>`,
    });

    return Response.json({ success: true, result });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
