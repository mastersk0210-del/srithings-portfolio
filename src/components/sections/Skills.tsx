import { Section } from "@/components/ui/Section";

const groups: { title: string; items: string[] }[] = [
  { title: "Modeling", items: ["PyTorch", "TensorFlow", "HF Transformers", "scikit-learn", "XGBoost"] },
  { title: "MLOps", items: ["Docker", "FastAPI", "MLflow", "Weights & Biases", "GitHub Actions"] },
  { title: "Data", items: ["Pandas", "Polars", "DVC", "Postgres", "Vector DBs"] },
  { title: "Cloud", items: ["AWS", "GCP", "Vercel", "Modal / Replicate", "HF Spaces"] },
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="Stack" title="Tools I reach for.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.title} className="neon-border rounded-2xl bg-bg-elev p-5">
            <h3 className="font-display text-sm uppercase tracking-[0.2em] text-cyan">
              {g.title}
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-fg-dim">
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
