import { Resend } from "resend";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "Nail Budapest <booking@nailbudapest.app>",
      to: "anhhungvip132@gmail.com",
      subject: `New booking from ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return Response.json({ success: true, data: result });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
