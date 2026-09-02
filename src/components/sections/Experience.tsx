import { Section } from "@/components/ui/Section";

type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  points: string[];
};

const roles: Role[] = [
  {
    company: "Amazon Development Center",
    title: "Associate — Machine Learning Engineer",
    period: "Sep 2024 – Aug 2025",
    location: "Chennai, India",
    points: [
      "Designed and ran scalable ETL/ELT pipelines ingesting millions of product-catalog data points from databases, APIs and files.",
      "Built data validation and transformation workflows that improved validation efficiency by ~40%.",
      "Developed Python rule engines and ML classifiers to flag non-compliant, duplicate and miscategorised records at ~90% accuracy.",
      "Tuned storage and query performance for high-volume semi-structured data; shipped pipeline code via Git and CI/CD.",
    ],
  },
  {
    company: "Ennuviz Technology",
    title: "Trainee — Data Process Intelligence",
    period: "Dec 2023 – Jun 2024",
    location: "Chennai, India",
    points: [
      "Performed ETL — preprocessing, cleansing and transformation — on large, complex datasets for analytical models.",
      "Built interactive Power BI validations and dashboards to support business decisions.",
      "Worked with the RPA team to integrate AI-driven automation into the company's digital-transformation work.",
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've done this.">
      <ol className="space-y-10">
        {roles.map((r) => (
          <li
            key={r.company}
            className="neon-border rounded-2xl bg-bg-elev p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-semibold">
                {r.title}
                <span className="text-fg-dim"> · {r.company}</span>
              </h3>
              <p className="text-xs uppercase tracking-[0.15em] text-fg-dim">
                {r.period} · {r.location}
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-fg-dim">
              {r.points.map((p, i) => (
                <li key={i} className="pl-4 -indent-4">
                  <span className="text-cyan">▹ </span>
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
