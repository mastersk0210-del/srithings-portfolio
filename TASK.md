# Portfolio Website — Build Task

**Owner:** SK — AI Engineer (recent graduate)
**Goal:** A high-converting, 3D-interactive portfolio with anti-gravity scroll motion and a neon visual style, built to showcase 4 AI models and land calls with recruiters / clients.
**Primary outcome:** A visitor understands "SK builds and ships AI models" within 5 seconds, explores the 4 models, and books a call.

---

## 1. Success criteria

| Metric | Target |
|---|---|
| Hero → contact scroll-through rate | > 25% of sessions reach the contact section |
| Primary CTA ("Book a call") click rate | > 8% of unique visitors |
| "View model" clicks | > 40% of visitors open at least one model page |
| Lighthouse Performance (mobile) | ≥ 80 (3D route), ≥ 95 (fallback) |
| Largest Contentful Paint | < 2.5s on 4G |
| Bounce rate | < 45% |
| Works with WebGL disabled | Yes — graceful 2D fallback |

"High-converting" = clear value prop, one dominant CTA (Book a call) repeated, proof via real metrics + demos, low-friction booking, fast load.

---

## 2. Scope

### In
- Single-page scroll site + `/models/[slug]` deep-dive pages (4 models)
- 3D hero: **glowing particle field** reacting to pointer + scroll velocity (scatter on fast scroll, drift + settle on stop)
- Anti-gravity scroll: elements float in, drift slightly upward at rest, parallax layers, section pinning
- Neon aesthetic: dark base, bloom/glow, gradient light trails
- Sections: Hero, About, Models (×4), Skills/Stack, Testimonials (optional v1), Contact
- Booking (Cal.com, primary CTA) + contact form (secondary)
- Per-model: metrics table, architecture summary, and where feasible a lightweight live inference demo or hosted Space embed
- Analytics + event tracking
- SEO meta, OG images, sitemap
- Responsive (mobile-first), reduced-motion + no-WebGL fallbacks

### Out (v1)
- CMS / blog
- Auth, dashboard
- Multi-language
- Light theme (dark only)
- Self-hosted GPU inference (use hosted demo / HF Space / cached sample outputs instead)

---

## 3. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) | SSG for content, SEO, Vercel deploy |
| 3D | React Three Fiber + drei | Declarative Three.js |
| Post-processing | @react-three/postprocessing | Bloom / glow for neon particle field |
| Scroll | Lenis + GSAP ScrollTrigger | Anti-gravity float, pinning, timelines |
| Styling | Tailwind CSS + CSS custom props for neon tokens | |
| Animation (2D) | Framer Motion | Section reveals, text |
| Forms | React Hook Form + Resend | Contact email delivery |
| Booking | Cal.com embed | Primary CTA |
| Model demos | HF Spaces / Gradio embed, or serverless API route calling a hosted endpoint, or pre-computed sample outputs | Pick per model in M4 |
| Analytics | Vercel Analytics + PostHog (events) | |
| Hosting | Vercel | |

---

## 4. Visual direction — "neon anti-gravity"

- **Palette:** near-black background (#05060A), electric cyan (#00E5FF), magenta (#FF2ECD), violet (#7A5CFF); white text at 90% opacity.
- **Particle field:** 10k–40k points, additive blending, emissive color mixed cyan↔magenta by velocity; bloom post-processing. Curl-noise drift; pointer repulsion; scroll velocity drives scatter amplitude; on scroll stop, points ease back toward a loose form (e.g. a neural-net / point-cloud silhouette).
- **Motion feel:** low gravity — ease with slight overshoot, subtle upward drift at rest.
- **Typography:** one bold display face (Space Grotesk or Clash Display) + Inter for body.
- **Grain + vignette** overlay for depth. Custom glow cursor on desktop.

---

## 5. Section-by-section

1. **Hero** — "SK — AI Engineer. I build and ship models." + one-line specialization + **Book a call** button (secondary: "See the models" scroll). Particle field centerpiece. Scroll hint.
2. **About** — 2–3 sentences: focus area, graduation, stack, availability badge. Headshot or point-cloud avatar. Key facts (degree, focus: NLP / CV / etc., location, open to work).
3. **Models (×4)** — Cards float in with anti-gravity stagger. Each card: model name, task, headline metric (e.g. "F1 0.91", "12ms inference", "SOTA-ish on X"), dataset, one-line what it does. Click → `/models/[slug]`.
4. **Model deep-dive page** — Problem & motivation · Data (source, size, preprocessing) · Architecture (diagram + summary) · Training (hardware, epochs, tricks) · Results (metrics table, comparison baseline, confusion matrix / curves) · Live demo or sample outputs · Limitations · Links (repo, weights, paper/Space). Sticky "next model" + Book a call.
5. **Skills / Stack** — Grid or orbiting 3D logos: Python, PyTorch/TensorFlow, HF Transformers, scikit-learn, CUDA, Docker, FastAPI, AWS/GCP, MLflow/W&B, vector DBs, etc.
6. **Testimonials** *(optional v1)* — advisor / teammate quotes if available; otherwise skip and add later.
7. **Contact** — Big **Book a call** (Cal.com inline embed) + secondary form (name, email, message) + email + GitHub / LinkedIn / Hugging Face / Kaggle. Repeat value prop.

---

## 6. The 4 models — content to gather (fill before M4)

For each model:

| Field | Model 1 | Model 2 | Model 3 | Model 4 |
|---|---|---|---|---|
| Name / slug | | | | |
| Task (e.g. text classification, segmentation) | | | | |
| Dataset (name, size, source, license) | | | | |
| Architecture (base model / from scratch) | | | | |
| Key metrics + baseline to compare | | | | |
| Training setup (GPU, time, framework) | | | | |
| Demo option (HF Space / API / sample outputs) | | | | |
| Repo URL / weights URL | | | | |
| 3 charts or visuals | | | | |
| Known limitations | | | | |

---

## 7. Performance & accessibility rules

- Lazy-load the 3D canvas; gradient/poster until hydrated.
- `prefers-reduced-motion`: disable scroll physics + particle simulation, render a static neon composition.
- WebGL detection; no WebGL → 2D hero (CSS gradient + static point-cloud image). All content reachable.
- Cap DPR ~1.5; pause `useFrame` loop when canvas off-screen (IntersectionObserver).
- Particle sim in a single BufferGeometry; update via shader or typed-array loop, no per-point React state.
- Fonts via `next/font`, subset, `display: swap`.
- Semantic HTML, visible focus, alt text, labels, text contrast ≥ 4.5:1.
- Demo embeds lazy-loaded (`loading="lazy"` iframes), behind a click-to-load poster.

---

## 8. Milestones

- [~] **M0 — Setup:** Next.js 16 + Tailwind v4 + Lenis + R3F + GSAP + motion installed ✓ · neon tokens in `globals.css` ✓ · section skeleton + model route (SSG) ✓ · `next/font` (Space Grotesk + Inter) ✓ · Vercel Analytics + funnel events wired ✓ · CI workflow (lint + build) ✓ · lint + `next build` green ✓ · **remaining:** push to GitHub + import to Vercel, set real Cal.com / social / domain in `src/lib/site.ts`.
- [ ] **M1 — Content skeleton:** All sections as static 2D, real copy, `models` data file with the 4 entries, responsive, Lighthouse ≥ 95.
- [ ] **M2 — Scroll system:** Lenis + ScrollTrigger, anti-gravity stagger/parallax, section pinning, reduced-motion fallback.
- [ ] **M3 — Particle hero:** R3F particle field, pointer repulsion + scroll-velocity scatter + settle-to-form, bloom, WebGL fallback, perf budget met.
- [ ] **M4 — Model pages:** `/models/[slug]` template + 4 filled write-ups with metrics tables and at least 2 live/interactive demos.
- [ ] **M5 — Convert:** Cal.com embed wired as primary CTA everywhere, contact form + Resend, analytics events (`cta_book_click`, `model_open`, `demo_run`, `scroll_reach_contact`).
- [ ] **M6 — Polish & launch:** OG images per model, SEO, cross-browser/device QA, custom domain, README.

---

## 9. Content checklist (gather before M1)

- [ ] One-line value proposition + specialization phrase
- [ ] The 4-models table (section 6) filled
- [ ] Bio (short + long), degree + institution + grad date
- [ ] Headshot / avatar
- [ ] Resume PDF
- [ ] Links: GitHub, LinkedIn, Hugging Face, Kaggle, email, Cal.com URL
- [ ] Domain name
- [ ] Any advisor/teammate testimonials (optional)

---

## 10. Resolved decisions

- **Field:** AI Engineer (creative-dev leaning) — the interactive site doubles as a frontend skill signal.
- **Projects:** 4 AI models, each with a full deep-dive page.
- **Hero:** glowing particle field (curl-noise drift, pointer repulsion, scroll-velocity scatter, settle-to-form on stop).
- **Primary CTA:** Book a call (Cal.com), dominant. Contact form is secondary.
- **Physics:** faked easing only (no Rapier) — particle field doesn't need a physics engine.

## 11. Open decisions

- Specialization to lead with (NLP / CV / multimodal / MLOps) — drives hero copy and skill ordering.
- Demo strategy per model: HF Space embed vs. serverless API vs. pre-computed samples (decide in M4, per model).
- Testimonials in v1 or defer.
- Settle-to-form shape for the particle field (neural net, brain, point-cloud portrait, abstract).
