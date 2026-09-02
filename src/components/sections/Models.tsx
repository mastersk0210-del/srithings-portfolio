"use client";

import Link from "next/link";
import { models } from "@/data/models";
import { Section } from "@/components/ui/Section";
import { track } from "@/lib/analytics";

const accentText = {
  cyan: "text-cyan text-glow-cyan",
  magenta: "text-magenta text-glow-magenta",
  violet: "text-violet",
} as const;

export function Models() {
  return (
    <Section id="models" eyebrow="Work" title="Four models, shipped.">
      <div className="grid gap-6 sm:grid-cols-2">
        {models.map((m) => (
          <Link
            key={m.slug}
            href={`/models/${m.slug}`}
            onClick={() => track("model_open", { slug: m.slug, from: "list" })}
            className="neon-border group flex flex-col justify-between rounded-2xl bg-bg-elev p-6 transition-transform duration-200 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold">{m.name}</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-fg-dim">
                  {m.task}
                </span>
              </div>
              <p className="mt-3 text-sm text-fg-dim">{m.summary}</p>
            </div>
            <div className="mt-8 flex items-end justify-between">
              <div>
                <div
                  className={`font-display text-3xl font-bold ${accentText[m.accent]}`}
                >
                  {m.headline.value}
                </div>
                <div className="text-xs text-fg-dim">
                  {m.headline.label}
                  {m.headline.sub ? ` · ${m.headline.sub}` : ""}
                </div>
              </div>
              <span className="text-sm text-fg-dim transition-colors group-hover:text-cyan">
                View →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
