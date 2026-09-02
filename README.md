# Srikaran Sankar — Portfolio

Interactive portfolio with a scroll-reactive particle-portrait hero and a
neon aesthetic. Live at **[srithings.info](https://srithings.info)**.

## Stack

- **Next.js 16** (App Router, SSG) · TypeScript · **Tailwind CSS v4**
- **React Three Fiber** + three.js — the photo-to-particles scatter hero
- **Lenis** — smooth scroll
- **react-hook-form** + **Resend** / CallMeBot / Telegram — contact form delivery
- **react-icons** (Simple Icons) — the Stack logos
- **Vercel Analytics** — funnel events (`cta_click`, `project_open`, `contact_submit`, …)

## Develop

```bash
npm install
cp .env.example .env.local   # fill in contact-form keys (optional for local)
npm run dev                  # http://localhost:3000
npm run lint
npm run build
```

## Structure

```
src/
  app/
    layout.tsx              fonts, metadata, SmoothScroll, Analytics
    page.tsx                the single-page site
    work/[slug]/            project deep-dives (SSG from src/data/projects.ts)
    api/contact/route.ts    form delivery → email + WhatsApp + Telegram
    sitemap.ts robots.ts not-found.tsx
  components/
    sections/               Hero · About · Projects · Experience · Skills · Contact
    three/ParticleField.tsx  scatter hero
    SmoothScroll · SiteNav · Footer · ui/
  data/projects.ts          the projects (some fields still TODO)
  lib/                       site config · avatarPoints · analytics · hooks
```

## Deploy (Vercel + srithings.info)

1. **GitHub** — repo pushed as `srithings-portfolio`.
2. **Import** at [vercel.com/new](https://vercel.com/new) → pick the repo → Next.js is auto-detected → Deploy.
3. **Environment variables** (Project → Settings → Environment Variables):
   - `RESEND_API_KEY` — for the contact form email (see [`.env.example`](./.env.example))
   - optional: `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`, `CALLMEBOT_APIKEY`
   - Redeploy after adding.
4. **Domain** — Project → Settings → Domains → add `srithings.info` and `www.srithings.info`.
   At GoDaddy (Domain → DNS), set:
   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |
   Remove any old `A` / `CNAME` on `@` and `www` first. Propagation is usually minutes.

CI ([`.github/workflows/ci.yml`](./.github/workflows/ci.yml)) runs lint + build on every push.

## Still to fill in

- [`src/data/projects.ts`](./src/data/projects.ts) — real model scores, dataset sources, repo + demo URLs.
- [`src/lib/site.ts`](./src/lib/site.ts) — Instagram handle.
- A résumé PDF in `public/`.
