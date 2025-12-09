import { Resend } from "resend";

export async function POST(req) {
  const { email, name, message } = await req.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Booking <onboarding@resend.dev>",
      to: email,
      subject: "Booking Received",
      html: `<p>Hello ${name}, we received your message: ${message}</p>`
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
