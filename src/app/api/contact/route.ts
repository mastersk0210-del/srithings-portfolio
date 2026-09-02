import { Resend } from "resend";
import { site } from "@/lib/site";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot — real people leave it blank
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  // silently accept bots so they don't retry
  if (body.company) return Response.json({ ok: true });

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return Response.json(
      { error: "Please fill in your name, a valid email, and a short message." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email isn't configured yet — reach me on LinkedIn or by email." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
    to: [process.env.CONTACT_TO ?? site.email],
    replyTo: email,
    subject: `Portfolio contact — ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
  });

  if (error) {
    return Response.json(
      { error: "Something went wrong sending that. Try email instead." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
