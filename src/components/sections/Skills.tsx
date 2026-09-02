import type { IconType } from "react-icons";
import {
  SiPython,
  SiR,
  SiTypescript,
  SiJavascript,
  SiOpenjdk,
  SiMysql,
  SiPostgresql,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiHuggingface,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiFastapi,
  SiFlask,
  SiStreamlit,
  SiGooglecloud,
  SiGit,
  SiGithubactions,
  SiDocker,
  SiMlflow,
  SiWeightsandbiases,
  SiUipath,
} from "react-icons/si";
import { Section } from "@/components/ui/Section";

/** official Simple Icons brand hex — shown on a light tile so dark marks stay legible */
const LOGOS: { name: string; Icon: IconType; color: string }[] = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "R", Icon: SiR, color: "#276DC3" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Java", Icon: SiOpenjdk, color: "#437291" },
  { name: "MySQL / Oracle", Icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
  { name: "scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
  { name: "Hugging Face", Icon: SiHuggingface, color: "#FFD21E" },
  { name: "Pandas", Icon: SiPandas, color: "#150458" },
  { name: "NumPy", Icon: SiNumpy, color: "#013243" },
  { name: "Jupyter", Icon: SiJupyter, color: "#F37626" },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  { name: "Flask", Icon: SiFlask, color: "#000000" },
  { name: "Streamlit", Icon: SiStreamlit, color: "#FF4B4B" },
  { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "MLflow", Icon: SiMlflow, color: "#0194E2" },
  { name: "W&B", Icon: SiWeightsandbiases, color: "#FFBE00" },
  { name: "UiPath", Icon: SiUipath, color: "#FA4616" },
];

const ALSO = [
  "ETL / ELT pipelines",
  "Data quality & governance",
  "Data modeling — snowflake schemas",
  "Data lakes",
  "Azure Data Factory",
  "NLP",
  "LLMs & Generative AI",
  "RPA + AI integration",
  "Power BI",
  "Tableau",
  "Excel",
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="Stack" title="Tools I reach for.">
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-x-8">
        {LOGOS.map(({ name, Icon, color }) => (
          <li
            key={name}
            className="group flex w-20 flex-col items-center gap-2.5 sm:w-24"
            title={name}
          >
            <span className="grid size-16 place-items-center rounded-2xl bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_24px_-8px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_0_0_1px_rgba(0,229,255,0.35),0_0_28px_-4px_rgba(0,229,255,0.35)]">
              <Icon color={color} aria-hidden className="size-9" />
            </span>
            <span className="text-center text-[11px] leading-tight text-fg-dim transition-colors group-hover:text-fg">
              {name}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-16 border-t border-[var(--border)] pt-8">
        <p className="mb-4 font-display text-xs uppercase tracking-[0.25em] text-fg-dim">
          Also working with
        </p>
        <ul className="flex flex-wrap gap-2">
          {ALSO.map((item) => (
            <li
              key={item}
              className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-fg-dim"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
