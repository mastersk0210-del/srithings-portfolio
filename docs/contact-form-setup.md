# Contact form — make it deliver

The form + `/api/contact` are built. It sends to **email + WhatsApp + Telegram**
and succeeds if *any one* channel is configured and works. Do at least one.

Set the values in **two places**:
- Local: a file named `.env.local` in the project root (gitignored).
- Production: Vercel → your project → **Settings → Environment Variables**, then **Redeploy**.

---

## Option A — Telegram  (recommended: 1 min, always works)

1. Open Telegram, search **@BotFather**, start it.
2. Send `/newbot` → give it a name → give it a username ending in `bot`.
3. Copy the **token** it gives you (looks like `8123456789:AAH....`).
4. Search for your new bot by its username, open it, send it any message (e.g. `hi`).
5. In a browser open (paste your token in):
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
6. In the JSON, find `"chat":{"id":123456789,...}` → that number is your **chat id**.

Env vars:
```
TELEGRAM_BOT_TOKEN=8123456789:AAH....
TELEGRAM_CHAT_ID=123456789
```

---

## Option B — Email via Resend

1. Go to https://resend.com → sign up (GitHub login is fine).
2. Left menu → **API Keys** → **Create API Key** → name it `portfolio`, permission
   **Sending access** → **Create**.
3. Copy the key (starts with `re_`). It's shown once.

Env var:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```
That's enough — mail arrives from `onboarding@resend.dev` to your Gmail, with the
sender's address as reply-to.

(Optional, later: Resend → **Domains** → add `srithings.info`, add the 3 DNS
records it shows, then set `CONTACT_FROM="Srikaran <hello@srithings.info>"`.)

---

## Option C — WhatsApp via CallMeBot  (free but a flaky relay)

1. On your **phone**, tap this link:
   `https://wa.me/34644442107?text=I%20allow%20callmebot%20to%20send%20me%20messages`
2. Send the pre-filled message.
3. CallMeBot replies with your **apikey** (a number).

Env var:
```
CALLMEBOT_APIKEY=123456
```
(Your number `353894002480` is already the default in the code.)

---

## After setting the vars

- **Local:** restart `npm run dev`, go to the Contact section, submit a test.
- **Vercel:** add the vars → **Deployments → … → Redeploy**, then test on the live site.

Success = the form swaps to a **"Message sent."** panel and you get the ping.
Until then it shows *"Email isn't configured yet…"* on submit.
