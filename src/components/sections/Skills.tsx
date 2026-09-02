import { Section } from "@/components/ui/Section";

const groups: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["Python", "SQL (Oracle, MySQL)", "R", "TypeScript / JavaScript", "Java (basics)"],
  },
  {
    title: "ML / AI",
    items: ["scikit-learn", "PyTorch", "TensorFlow / Keras", "NLP", "LLMs & Generative AI"],
  },
  {
    title: "Data engineering",
    items: ["ETL / ELT pipelines", "Data quality & governance", "Data modeling (snowflake schemas)", "Data lakes", "Azure Data Factory"],
  },
  {
    title: "Delivery",
    items: ["FastAPI · Flask", "Streamlit", "GCP", "Git · CI/CD", "Pandas · NumPy"],
  },
  {
    title: "Analytics & BI",
    items: ["Power BI", "Tableau", "Excel"],
  },
  {
    title: "Automation",
    items: ["UiPath", "RPA + AI integration", "Rule engines"],
  },
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="Stack" title="Tools I reach for.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
