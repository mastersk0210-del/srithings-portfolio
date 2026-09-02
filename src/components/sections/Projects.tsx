"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { track } from "@/lib/analytics";

const accentText = {
  cyan: "text-cyan text-glow-cyan",
  magenta: "text-magenta text-glow-magenta",
  violet: "text-violet",
} as const;

export function Projects() {
  return (
    <Section id="work" eyebrow="Work" title="Projects I can talk through end to end.">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            onClick={() => track("project_open", { slug: p.slug, from: "list" })}
            className="neon-border group flex flex-col justify-between rounded-2xl bg-bg-elev p-6 transition-transform duration-200 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-fg-dim">
                {p.task}
              </p>
              <p className="mt-3 text-sm text-fg-dim">{p.summary}</p>
            </div>
            <div className="mt-8 flex items-end justify-between">
              <div>
                <div
                  className={`font-display text-2xl font-bold ${accentText[p.accent]}`}
                >
                  {p.headline.value}
                </div>
                <div className="text-xs text-fg-dim">
                  {p.headline.label}
                  {p.headline.sub ? ` · ${p.headline.sub}` : ""}
                </div>
              </div>
              <span className="text-sm text-fg-dim transition-colors group-hover:text-cyan">
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
