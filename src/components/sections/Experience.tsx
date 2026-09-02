import { Section } from "@/components/ui/Section";

type Entry = {
  kind: "work" | "study";
  period: string;
  title: string;
  org: string;
  location: string;
  current?: boolean;
  stats?: { value: string; label: string }[];
  points: string[];
  tags?: string[];
};

const entries: Entry[] = [
  {
    kind: "study",
    period: "2025 – 2026 (expected)",
    title: "MSc, Artificial Intelligence",
    org: "National College of Ireland",
    location: "Dublin, Ireland",
    current: true,
    stats: [{ value: "2", label: "production-minded projects" }],
    points: [
      "Modules: Machine Learning, AI-Driven Decision Making, Programming for AI, Engineering & Evaluation in AI, Data Analytics for AI.",
      "Two end-to-end projects — an autonomous CV-screening agent and a skill-gap severity predictor (see Work).",
    ],
    tags: ["Machine Learning", "Evaluation", "Agents", "Streamlit"],
  },
  {
    kind: "work",
    period: "Sep 2024 – Aug 2025",
    title: "Associate — Machine Learning Engineer",
    org: "Amazon Development Center",
    location: "Chennai, India",
    stats: [
      { value: "~90%", label: "classification accuracy" },
      { value: "+40%", label: "validation efficiency" },
      { value: "millions", label: "records / day" },
    ],
    points: [
      "Designed and ran scalable ETL/ELT pipelines ingesting millions of product-catalog data points from databases, APIs and files.",
      "Built data validation and transformation workflows that lifted validation efficiency by ~40%.",
      "Developed Python rule engines and ML classifiers to flag non-compliant, duplicate and miscategorised records at ~90% accuracy.",
      "Tuned storage and query performance for high-volume semi-structured data; shipped pipeline code via Git and CI/CD.",
    ],
    tags: ["Python", "ETL / ELT", "ML classifiers", "Rule engines", "Git · CI/CD"],
  },
  {
    kind: "work",
    period: "Dec 2023 – Jun 2024",
    title: "Trainee — Data Process Intelligence",
    org: "Ennuviz Technology",
    location: "Chennai, India",
    points: [
      "Performed ETL — preprocessing, cleansing and transformation — on large, complex datasets for analytical models.",
      "Built interactive Power BI validations and dashboards to support business decisions.",
      "Worked with the RPA team to fold AI-driven automation into the company's digital-transformation work.",
    ],
    tags: ["ETL", "Power BI", "RPA", "Data cleansing"],
  },
  {
    kind: "study",
    period: "2019 – 2023",
    title: "B.E., Mechanical Engineering",
    org: "Kongu Engineering College",
    location: "Erode, India",
    points: [
      "Modules included Data Structures, Web Engineering and Mathematics — the on-ramp into software and data.",
    ],
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="From mechanical engineering to shipping ML."
    >
      <ol className="relative ml-3 border-l border-[var(--border)]">
        {entries.map((e) => {
          const accent = e.kind === "work" ? "text-cyan" : "text-magenta";
          return (
            <li key={e.title} className="relative ml-8 pb-12 last:pb-0">
              {/* node */}
              <span
                className={`absolute -left-[41px] top-1.5 grid size-4 place-items-center rounded-full bg-[var(--bg)] ring-1 ring-[var(--border)]`}
              >
                <span
                  className={`size-2 rounded-full ${
                    e.kind === "work" ? "bg-cyan" : "bg-magenta"
                  } ${e.current ? "animate-pulse shadow-[0_0_10px_currentColor]" : ""}`}
                />
              </span>

              <div className="neon-border rounded-2xl bg-bg-elev p-6 transition-transform duration-200 hover:-translate-y-0.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    className={`font-display text-[10px] uppercase tracking-[0.2em] ${accent}`}
                  >
                    {e.kind === "work" ? "Work" : "Study"}
                  </span>
                  <span className="font-mono text-xs text-fg-dim">
                    {e.period}
                  </span>
                  {e.current && (
                    <span className="rounded-full border border-magenta/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-magenta">
                      Now
                    </span>
                  )}
                </div>

                <h3 className="mt-2 font-display text-lg font-semibold">
                  {e.title}
                </h3>
                <p className="text-sm text-fg-dim">
                  {e.org} · {e.location}
                </p>

                {e.stats && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2"
                      >
                        <div className="font-display text-base font-bold text-cyan text-glow-cyan">
                          {s.value}
                        </div>
                        <div className="text-[11px] text-fg-dim">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-fg-dim">
                  {e.points.map((p, i) => (
                    <li key={i} className="pl-4 -indent-4">
                      <span className={accent}>▹ </span>
                      {p}
                    </li>
                  ))}
                </ul>

                {e.tags && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] text-fg-dim"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
