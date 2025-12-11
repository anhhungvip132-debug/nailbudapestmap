import { Resend } from "resend";

export async function POST(req) {
  const { email } = await req.json();
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: email,
    subject: "Đăng ký thành công!",
    html: "<p>Cảm ơn bạn đã đăng ký nhận thông tin từ Nail Budapest Map!</p>",
  });

  return Response.json({ success: true });
}
