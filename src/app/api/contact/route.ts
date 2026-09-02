import { Resend } from "resend";
import { site } from "@/lib/site";

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string; // honeypot — real people leave it blank
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Fire a WhatsApp ping via CallMeBot (free relay). Best-effort. */
async function sendWhatsApp(text: string) {
  const apikey = process.env.CALLMEBOT_APIKEY;
  const phone = (process.env.WHATSAPP_TO ?? "353894002480").replace(/\D/g, "");
  if (!apikey || !phone) return { skipped: true };

  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${phone}` +
    `&text=${encodeURIComponent(text)}&apikey=${apikey}`;

  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`callmebot ${res.status}`);
  return { sent: true };
}

/** Telegram push — reliable, no opt-in dance. Best-effort. */
async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { skipped: true };

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`telegram ${res.status}`);
  return { sent: true };
}

async function sendEmail(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true };

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
    to: [process.env.CONTACT_TO ?? site.email],
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `${message}\n\n— ${name} <${email}>`,
  });
  if (error) throw new Error(error.message);
  return { sent: true };
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  // silently accept bots so they don't retry
  if (body.company) return Response.json({ ok: true });

  if (
    name.length < 2 ||
    !EMAIL_RE.test(email) ||
    subject.length < 3 ||
    message.length < 10
  ) {
    return Response.json(
      {
        error:
          "Please fill in your name, a valid email, a subject, and a short message.",
      },
      { status: 422 },
    );
  }

  const ping = `New portfolio message\n${subject}\n${name} (${email})\n\n${message}`;

  const results = await Promise.allSettled([
    sendEmail(name, email, subject, message),
    sendWhatsApp(ping),
    sendTelegram(ping),
  ]);

  const delivered = results.some(
    (r) => r.status === "fulfilled" && r.value.sent,
  );
  const configured = results.some(
    (r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value.skipped),
  );

  if (delivered) return Response.json({ ok: true });

  if (!configured) {
    return Response.json(
      { error: "Email isn't configured yet — reach me on LinkedIn or by email." },
      { status: 503 },
    );
  }

  return Response.json(
    { error: "Something went wrong sending that. Try email instead." },
    { status: 502 },
  );
}
