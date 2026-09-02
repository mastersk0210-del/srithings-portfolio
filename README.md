# SK — Portfolio

High-converting, 3D-interactive portfolio with anti-gravity scroll and a neon
aesthetic, built to showcase 4 AI models and book calls.

Full spec and milestones: [`TASK.md`](./TASK.md).

## Stack

- **Next.js 16** (App Router, SSG) · TypeScript
- **React Three Fiber** + drei + postprocessing — particle-field hero
- **Lenis** + **GSAP ScrollTrigger** — smooth / anti-gravity scroll
- **Tailwind CSS v4** — neon design tokens in [`src/app/globals.css`](./src/app/globals.css)
- **motion** — 2D section reveals
- **Vercel Analytics** — funnel events (`cta_book_click`, `model_open`, …)
- **Cal.com** — primary CTA (Book a call)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Structure

```
src/
  app/
    layout.tsx            root layout: fonts, metadata, SmoothScroll, Analytics
    page.tsx              single-page scroll site
    models/[slug]/        model deep-dive pages (SSG from src/data/models.ts)
    sitemap.ts robots.ts not-found.tsx
  components/
    SmoothScroll.tsx      Lenis provider (GSAP ScrollTrigger wiring in M2)
    SiteNav.tsx Footer.tsx
    sections/             Hero · About · Models · Skills · Contact
    three/ParticleField.tsx   M0 placeholder cloud; full sim in M3
    ui/                   CtaButton · Section
  data/models.ts          the 4 models — fill from TASK.md §6
  lib/                    site config · analytics · hooks (reduced-motion, WebGL)
```

## Configure before launch

Edit [`src/lib/site.ts`](./src/lib/site.ts): real Cal.com URL, social links, domain.
Fill [`src/data/models.ts`](./src/data/models.ts) with the 4 models.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — framework auto-detected.
3. No env vars needed for M0. (M5 adds `RESEND_API_KEY` for the contact form.)
4. Add the custom domain in Project → Settings → Domains, then update
   `site.url` in `src/lib/site.ts`.

CI (`.github/workflows/ci.yml`) runs lint + build on every push and PR.
