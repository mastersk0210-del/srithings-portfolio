import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";

const facts = [
  { k: "Focus", v: "Data engineering + applied ML" },
  { k: "Based in", v: site.location },
  { k: "Status", v: site.availability },
  { k: "Studying", v: "MSc Artificial Intelligence — NCI Dublin (2026)" },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="I make data trustworthy, then make it predict."
    >
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-lg text-fg-dim">
          <p>
            AI/ML Engineer with two years of hands-on experience building
            end-to-end data solutions — designing and optimising ETL/ELT
            pipelines, enforcing data quality, and turning that clean foundation
            into machine-learning systems that run in production.
          </p>
          <p>
            I&apos;ve shipped this work at Amazon and Ennuviz, and I&apos;m
            finishing an MSc in Artificial Intelligence in Dublin. I like the
            unglamorous middle of the stack: the validation rules, the schema
            decisions, the pipeline that fails loudly instead of quietly
            corrupting a model.
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
