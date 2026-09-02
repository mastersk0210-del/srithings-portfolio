import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";

const facts = [
  { k: "Focus", v: site.specialization },
  { k: "Location", v: site.location },
  { k: "Status", v: site.availability },
  { k: "Degree", v: "B.S. — AI Engineering (TODO)" },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Recent AI Engineering graduate, already shipping models.">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-lg text-fg-dim">
          <p>
            I design, train, and deploy machine-learning models end to end — from
            data pipeline to evaluation to a running inference endpoint. TODO:
            replace with real bio (2–3 sentences).
          </p>
          <p>
            The four models below are production-minded: each has a metrics table,
            a baseline comparison, and a way to try it.
          </p>
        </div>
        <dl className="neon-border grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[var(--border)]">
          {facts.map((f) => (
            <div key={f.k} className="bg-bg-elev p-5">
              <dt className="font-display text-xs uppercase tracking-[0.2em] text-fg-dim">
                {f.k}
              </dt>
              <dd className="mt-1 text-sm text-fg">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
