"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { track } from "@/lib/analytics";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          track("scroll_reach_contact");
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk about your model.">
      <div ref={ref} className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-lg text-fg-dim">
            {site.tagline} Book a 20-minute call and tell me what you are building.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <CtaButton from="contact" />
            <a
              href={`mailto:${site.email}`}
              className="neon-border inline-flex items-center rounded-full px-6 py-3 font-display text-sm text-fg transition-colors hover:text-cyan"
            >
              Email me
            </a>
          </div>
          <div className="mt-8 flex gap-5 text-sm text-fg-dim">
            <a href={site.links.github} className="hover:text-cyan">GitHub</a>
            <a href={site.links.linkedin} className="hover:text-cyan">LinkedIn</a>
            <a href={site.links.huggingface} className="hover:text-cyan">Hugging Face</a>
            <a href={site.links.kaggle} className="hover:text-cyan">Kaggle</a>
          </div>
        </div>

        {/* Secondary: form — wired to Resend in M5 */}
        <form
          className="neon-border space-y-4 rounded-2xl bg-bg-elev p-6"
          onSubmit={(e) => {
            e.preventDefault();
            track("contact_submit");
          }}
        >
          <input
            required
            name="name"
            placeholder="Name"
            className="w-full rounded-lg bg-[var(--bg)] px-4 py-3 text-sm outline-none ring-1 ring-[var(--border)] focus:ring-cyan"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-lg bg-[var(--bg)] px-4 py-3 text-sm outline-none ring-1 ring-[var(--border)] focus:ring-cyan"
          />
          <textarea
            required
            name="message"
            rows={4}
            placeholder="What are you working on?"
            className="w-full rounded-lg bg-[var(--bg)] px-4 py-3 text-sm outline-none ring-1 ring-[var(--border)] focus:ring-cyan"
          />
          <button
            type="submit"
            className="neon-border rounded-full px-6 py-3 font-display text-sm text-fg transition-colors hover:text-cyan"
          >
            Send
          </button>
        </form>
      </div>
    </Section>
  );
}
