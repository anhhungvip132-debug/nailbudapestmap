import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email, salon } = await req.json();

  await resend.emails.send({
    from: "Nail Budapest <no-reply@nailbudapestmap.com>",
    to: email,
    subject: "Xác nhận đặt lịch",
    html: `<p>Bạn đã đặt lịch tại <b>${salon}</b></p>`,
  });

  return Response.json({ success: true });
}
