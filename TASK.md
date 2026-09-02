# Portfolio Website — Build Task

**Owner:** Srikaran Sankar — AI/ML Engineer (Dublin; MSc Artificial Intelligence, NCI, 2026)
**Goal:** A high-converting, 3D-interactive portfolio with anti-gravity scroll motion and a neon visual style, positioning Srikaran as an engineer who owns the path from raw data to production ML.
**Primary outcome:** A recruiter understands "Srikaran builds trustworthy data pipelines and ships ML on top of them" within 5 seconds, reads a project or two, and connects on LinkedIn.

---

## 1. Success criteria

| Metric | Target |
|---|---|
| Hero → contact scroll-through rate | > 25% of sessions reach the contact section |
| Primary CTA (LinkedIn) click rate | > 8% of unique visitors |
| Project-open rate | > 40% of visitors open at least one `/work/[slug]` page |
| Lighthouse Performance (mobile) | ≥ 80 (3D route), ≥ 95 (fallback) |
| Largest Contentful Paint | < 2.5s on 4G |
| Bounce rate | < 45% |
| Works with WebGL disabled | Yes — graceful 2D fallback |

"High-converting" = clear value prop, one dominant CTA (Connect on LinkedIn) repeated, proof via real metrics, low friction, fast load.

---

## 2. Scope

### In
- Single-page scroll site + `/work/[slug]` deep-dive pages (2 projects for v1)
- 3D hero: **glowing particle field** reacting to pointer + scroll velocity (scatter on fast scroll, drift + settle on stop)
- Anti-gravity scroll: elements float in, drift slightly upward at rest, parallax layers, section pinning
- Neon aesthetic: dark base, bloom/glow, gradient light trails
- Sections: Hero, About, Work (×2), Experience, Skills/Stack, Contact
- Primary CTA → LinkedIn; secondary → email; contact form (Resend) as tertiary
- Per-project: metrics tiles + problem / data / approach / outcome / limitations, and a demo (Streamlit link or screen-recording) where available
- Analytics + event tracking
- SEO meta, OG images, sitemap
- Responsive (mobile-first), reduced-motion + no-WebGL fallbacks

### Out (v1)
- CMS / blog
- Auth, dashboard
- Multi-language
- Light theme (dark only)
- **Amazon "Fisher Model" as a case study** — confidential, not shown. Amazon appears in Experience only, described at CV level.

---

## 3. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | SSG for content, SEO, Vercel deploy |
| 3D | React Three Fiber + drei | Declarative Three.js |
| Post-processing | @react-three/postprocessing | Bloom / glow for the particle field |
| Scroll | Lenis + GSAP ScrollTrigger | Anti-gravity float, pinning, timelines |
| Styling | Tailwind CSS v4 + CSS custom props for neon tokens | |
| Animation (2D) | motion | Section reveals, text |
| Forms | React Hook Form + Resend | Contact email delivery (M5) |
| Analytics | Vercel Analytics | Funnel events |
| Hosting | Vercel | Domain: `srithings.info` |

---

## 4. Visual direction — "neon anti-gravity"

- **Palette:** near-black background (#05060A), electric cyan (#00E5FF), magenta (#FF2ECD), violet (#7A5CFF); white text at ~90% opacity.
- **Particle field:** 10k–40k points, additive blending, emissive color mixed cyan↔magenta by velocity; bloom post-processing. Curl-noise drift; pointer repulsion; scroll velocity drives scatter amplitude; on scroll stop, points ease back toward a loose form.
- **Motion feel:** low gravity — ease with slight overshoot, subtle upward drift at rest.
- **Typography:** Space Grotesk (display) + Inter (body), via `next/font`.
- **Grain + vignette** overlay for depth. Custom glow cursor on desktop.

---

## 5. Section-by-section

1. **Hero** — "AI/ML Engineer" eyebrow + "I build the pipeline from raw data to production ML." + one-line specialization + **Connect on LinkedIn** (secondary: "See the work"). Particle field centerpiece. Scroll hint.
2. **About** — 2–3 sentences: data-engineering + applied-ML focus, Amazon/Ennuviz, MSc AI Dublin. Facts: focus, location, status (open to work · Stamp 2), studying. Headshot / point-cloud avatar.
3. **Work (×2)** — Cards float in with anti-gravity stagger. Each card: name, task, headline metric, one-liner. Click → `/work/[slug]`.
   - `hr-recruitment-automation` — AI-Driven HR Recruitment Automation (MSc). Headline: 6 min → 4.4 s CV processing.
   - `skill-gap-severity-prediction` — Career Readiness & Skill-Gap Severity Prediction (MSc). Headline: 82 engineered features.
4. **Project deep-dive page** — Problem · Data · Approach · Outcome · Limitations/next · Stack · Demo · Links · "Next project" + CTA.
5. **Experience** — Amazon (Associate ML Engineer, Sep 2024–Aug 2025) and Ennuviz (Trainee, Dec 2023–Jun 2024), CV-level bullets, no confidential detail.
6. **Skills / Stack** — Languages · ML/AI · Data engineering · Delivery · Analytics & BI · Automation.
7. **Contact** — **Connect on LinkedIn** (primary) + Email (secondary) + form (name, email, message) + GitHub / LinkedIn / srithings.info.

---

## 6. Content still needed from Srikaran (fill the `TODO`s in `src/data/projects.ts`)

**AI-Driven HR Recruitment Automation**
- [ ] Dataset: size / source of the CVs used
- [ ] Accuracy of screening vs. a human baseline (or whatever eval you ran)
- [ ] % reduction in manual review
- [ ] Repo URL · demo video / screen-recording
- [ ] Real parsing failure modes + any bias check

**Career Readiness & Skill-Gap Severity Prediction**
- [ ] Dataset: rows, source, how "severity" is labelled
- [ ] Which model families you compared, and how many
- [ ] Best model + its headline metric (accuracy / F1 / MAE …)
- [ ] Live Streamlit URL · repo URL
- [ ] Real limitations (label subjectivity, population)

**Site-wide**
- [ ] Headshot → `public/`
- [ ] Résumé PDF → `public/` (link it from About / Contact)
- [ ] Confirm `srithings.info` is the deploy target (replacing the current site)
- [ ] A 3rd project? (optional — 2 is fine, 3 fills the grid better)

---

## 7. Performance & accessibility rules

- Lazy-load the 3D canvas; gradient/poster until hydrated.
- `prefers-reduced-motion`: disable scroll physics + particle simulation, render a static neon composition.
- WebGL detection; no WebGL → 2D hero (CSS gradient). All content reachable.
- Cap DPR ~1.5; pause `useFrame` loop when canvas off-screen (IntersectionObserver).
- Particle sim in a single BufferGeometry; typed-array / shader update, no per-point React state.
- Fonts via `next/font`, subset, `display: swap`.
- Semantic HTML, visible focus, alt text, labels, text contrast ≥ 4.5:1.

---

## 8. Milestones

- [x] **M0 — Setup:** Next.js 16 + Tailwind v4 + Lenis + R3F + GSAP + motion ✓ · neon tokens ✓ · full section skeleton personalised from CV ✓ · `/work/[slug]` SSG route ✓ · `next/font` (Space Grotesk + Inter) ✓ · Vercel Analytics + events ✓ · CI (lint + build) ✓ · lint + `next build` green ✓ · **remaining:** push to GitHub + import to Vercel.
- [ ] **M1 — Content:** fill every `TODO` in `src/data/projects.ts` from §6, add headshot + résumé, tighten copy, Lighthouse ≥ 95.
- [ ] **M2 — Scroll system:** Lenis + ScrollTrigger, anti-gravity stagger/parallax, section pinning, reduced-motion fallback.
- [ ] **M3 — Particle hero:** R3F particle field, pointer repulsion + scroll-velocity scatter + settle-to-form, bloom, WebGL fallback, perf budget met.
- [ ] **M4 — Project pages:** polish the `/work/[slug]` template, add charts/screenshots, embed or link the demos.
- [ ] **M5 — Convert:** contact form + Resend, confirm analytics events (`cta_click`, `project_open`, `demo_run`, `scroll_reach_contact`, `contact_submit`).
- [ ] **M6 — Polish & launch:** OG images per project, SEO, cross-browser/device QA, point `srithings.info` at Vercel.

---

## 9. Resolved decisions

- **Positioning:** data-engineering ↔ applied-ML bridge, with a punchy outcome headline ("raw data to production ML").
- **Work:** 2 real projects (both MSc). Fisher Model excluded (confidential). A 3rd optional.
- **Hero:** glowing particle field (curl-noise drift, pointer repulsion, scroll-velocity scatter, settle-to-form on stop).
- **Primary CTA:** Connect on LinkedIn. Email secondary. No Cal.com.
- **Physics:** faked easing only (no Rapier).
- **Domain:** `srithings.info` (pending Srikaran's confirmation).

## 10. Open decisions

- Settle-to-form shape for the particle field (neural net, brain, abstract point cloud).
- Whether to add a 3rd project.
- Whether `srithings.info` fully replaces the current site there.
