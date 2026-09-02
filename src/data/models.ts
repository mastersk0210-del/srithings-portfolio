export type Metric = { label: string; value: string; sub?: string };

export type Model = {
  slug: string;
  name: string;
  task: string;
  summary: string; // one line for the card
  /** headline metric shown on the card */
  headline: Metric;
  dataset: string;
  architecture: string;
  training: string;
  metrics: Metric[];
  baseline?: string;
  demo?: { kind: "hf-space" | "api" | "samples"; url?: string; note?: string };
  links: { repo?: string; weights?: string; paper?: string; space?: string };
  limitations: string[];
  accent: "cyan" | "magenta" | "violet";
};

/**
 * Placeholder content for the 4 models.
 * Fill each entry from section 6 of TASK.md before M4.
 */
export const models: Model[] = [
  {
    slug: "model-one",
    name: "Model One",
    task: "Text classification",
    summary: "Fine-tuned transformer for multi-label intent detection.",
    headline: { label: "Macro F1", value: "0.91", sub: "+0.07 vs baseline" },
    dataset: "TODO — name, size, source, license",
    architecture: "TODO — base model / from scratch",
    training: "TODO — GPU, epochs, framework",
    metrics: [
      { label: "Macro F1", value: "0.91" },
      { label: "Accuracy", value: "0.94" },
      { label: "Inference", value: "12 ms", sub: "batch 1, T4" },
    ],
    baseline: "TODO — baseline model + score",
    demo: { kind: "samples", note: "Pre-computed sample outputs for M4" },
    links: { repo: "", weights: "" },
    limitations: ["TODO", "TODO"],
    accent: "cyan",
  },
  {
    slug: "model-two",
    name: "Model Two",
    task: "Image segmentation",
    summary: "U-Net variant for medical image segmentation.",
    headline: { label: "Dice", value: "0.88" },
    dataset: "TODO",
    architecture: "TODO",
    training: "TODO",
    metrics: [
      { label: "Dice", value: "0.88" },
      { label: "IoU", value: "0.79" },
    ],
    demo: { kind: "hf-space", url: "", note: "Gradio Space embed" },
    links: { repo: "" },
    limitations: ["TODO"],
    accent: "magenta",
  },
  {
    slug: "model-three",
    name: "Model Three",
    task: "Sequence-to-sequence",
    summary: "Distilled seq2seq model for on-device summarization.",
    headline: { label: "ROUGE-L", value: "38.2" },
    dataset: "TODO",
    architecture: "TODO",
    training: "TODO",
    metrics: [
      { label: "ROUGE-L", value: "38.2" },
      { label: "Params", value: "60M" },
    ],
    demo: { kind: "api", note: "Serverless route → hosted endpoint" },
    links: { repo: "" },
    limitations: ["TODO"],
    accent: "violet",
  },
  {
    slug: "model-four",
    name: "Model Four",
    task: "Tabular / forecasting",
    summary: "Gradient-boosted ensemble for demand forecasting.",
    headline: { label: "MAPE", value: "6.4%" },
    dataset: "TODO",
    architecture: "TODO",
    training: "TODO",
    metrics: [
      { label: "MAPE", value: "6.4%" },
      { label: "RMSE", value: "TODO" },
    ],
    demo: { kind: "samples" },
    links: { repo: "" },
    limitations: ["TODO"],
    accent: "cyan",
  },
];

export const getModel = (slug: string) => models.find((m) => m.slug === slug);
