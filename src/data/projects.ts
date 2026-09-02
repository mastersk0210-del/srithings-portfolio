export type Metric = { label: string; value: string; sub?: string };

export type Project = {
  slug: string;
  name: string;
  context: string; // e.g. "MSc Artificial Intelligence · NCI Dublin"
  task: string;
  summary: string; // one line for the card
  /** headline metric shown on the card */
  headline: Metric;
  problem: string;
  data: string;
  approach: string;
  stack: string[];
  metrics: Metric[];
  outcome: string;
  demo?: { kind: "streamlit" | "repo" | "video" | "samples"; url?: string; note?: string };
  links: { repo?: string; demo?: string; writeup?: string };
  limitations: string[];
  accent: "cyan" | "magenta" | "violet";
};

/**
 * Real projects from the CV. Fields marked TODO need numbers/links only Srikaran has
 * (final model scores, repo URLs, live demo links).
 */
export const projects: Project[] = [
  {
    slug: "hr-recruitment-automation",
    name: "AI-Driven HR Recruitment Automation",
    context: "MSc Artificial Intelligence · National College of Ireland",
    task: "Agentic automation · document ETL",
    summary:
      "An autonomous agent that ingests, validates and screens CVs end to end.",
    headline: { label: "CV processing time", value: "6 min → 4.4 s", sub: "~80× faster" },
    problem:
      "Manual CV intake and screening was slow and inconsistent — roughly six minutes of human effort per application before a recruiter could even compare candidates.",
    data:
      "Unstructured CVs (PDF / DOCX) of varying layout. Built a robust ETL step for intake, parsing and field-level validation before any scoring. TODO: dataset size / source.",
    approach:
      "An autonomous agent orchestrated with UiPath and Python drives a multi-stage pipeline: extract → normalise → validate → score → route. Each stage is independently checkpointed so a bad document fails loudly instead of silently corrupting downstream steps.",
    stack: ["Python", "UiPath", "ETL / document parsing", "Pandas"],
    metrics: [
      { label: "CV processing time", value: "6 min → 4.4 s" },
      { label: "Pipeline stages", value: "5", sub: "each checkpointed" },
      { label: "Manual review", value: "TODO", sub: "reduction %" },
    ],
    outcome:
      "Processing time per CV dropped from ~6 minutes to 4.4 seconds, turning a manual bottleneck into a background job. TODO: accuracy vs. human screening.",
    demo: { kind: "video", note: "Screen-recording of a run — add in M4" },
    links: { repo: "", demo: "" },
    limitations: [
      "TODO: parsing failure modes on unusual CV layouts",
      "TODO: bias / fairness checks on the scoring step",
    ],
    accent: "cyan",
  },
  {
    slug: "skill-gap-severity-prediction",
    name: "Career Readiness & Skill-Gap Severity Prediction",
    context: "MSc Artificial Intelligence · National College of Ireland",
    task: "Supervised ML · comparative modelling",
    summary:
      "A comparative ML pipeline that predicts how severe a candidate's skill gap is, served in a live app.",
    headline: { label: "Engineered features", value: "82", sub: "from raw profile data" },
    problem:
      "Given a person's profile and a target role, how far are they from being job-ready — and which gaps matter most? A single yes/no readiness label hides the severity.",
    data:
      "Profile + role data transformed into an 82-feature engineered dataset covering skills, experience and education signals. Full ingestion and transformation handled in-pipeline. TODO: rows / source / label definition.",
    approach:
      "Trained and compared multiple model families on the same features and split, then wrapped the best one in a Streamlit app that does ingestion, transformation and real-time inference from user input.",
    stack: ["Python", "scikit-learn", "Pandas / NumPy", "Streamlit"],
    metrics: [
      { label: "Engineered features", value: "82" },
      { label: "Models compared", value: "TODO" },
      { label: "Best score", value: "TODO", sub: "metric + value" },
    ],
    outcome:
      "A working app that takes a profile and returns a severity score with the driving gaps, not just a binary label. TODO: chosen model + headline metric.",
    demo: { kind: "streamlit", url: "", note: "Deployed Streamlit app — add link in M4" },
    links: { repo: "", demo: "" },
    limitations: [
      "TODO: label subjectivity / ground-truth source",
      "TODO: generalisation beyond the training population",
    ],
    accent: "magenta",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
