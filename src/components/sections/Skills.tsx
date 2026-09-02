import type { IconType } from "react-icons";
import {
  SiPython,
  SiR,
  SiTypescript,
  SiJavascript,
  SiOpenjdk,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiOpencv,
  SiSpacy,
  SiHuggingface,
  SiLangchain,
  SiClaude,
  SiDeepseek,
  SiOllama,
  SiGradio,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiMysql,
  SiPostgresql,
  SiFastapi,
  SiFlask,
  SiStreamlit,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiMlflow,
  SiWeightsandbiases,
  SiGooglecloud,
  SiGooglecolab,
  SiKaggle,
  SiUipath,
} from "react-icons/si";
import { Section } from "@/components/ui/Section";

/**
 * `color` = the official Simple Icons brand hex.
 * A few brand marks are (by design) near-black — Pandas, NumPy, Flask,
 * LangChain, Ollama — so on a near-black page they use the brand's own
 * dark-mode treatment: white.
 */
const LOGOS: { name: string; Icon: IconType; color: string }[] = [
  // languages
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "R", Icon: SiR, color: "#276DC3" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Java", Icon: SiOpenjdk, color: "#437291" },

  // ML / DL
  { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
  { name: "Keras", Icon: SiKeras, color: "#D00000" },
  { name: "scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
  { name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8" },
  { name: "spaCy", Icon: SiSpacy, color: "#09A3D5" },

  // LLMs / GenAI
  { name: "Hugging Face", Icon: SiHuggingface, color: "#FFD21E" },
  { name: "LangChain", Icon: SiLangchain, color: "#FFFFFF" },
  { name: "Claude", Icon: SiClaude, color: "#D97757" },
  { name: "DeepSeek", Icon: SiDeepseek, color: "#4D6BFE" },
  { name: "Ollama", Icon: SiOllama, color: "#FFFFFF" },
  { name: "Gradio", Icon: SiGradio, color: "#FF7C00" },

  // data
  { name: "pandas", Icon: SiPandas, color: "#FFFFFF" },
  { name: "NumPy", Icon: SiNumpy, color: "#FFFFFF" },
  { name: "Jupyter", Icon: SiJupyter, color: "#F37626" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },

  // ship
  { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  { name: "Flask", Icon: SiFlask, color: "#FFFFFF" },
  { name: "Streamlit", Icon: SiStreamlit, color: "#FF4B4B" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
  { name: "MLflow", Icon: SiMlflow, color: "#0194E2" },
  { name: "Weights & Biases", Icon: SiWeightsandbiases, color: "#FFBE00" },

  // platforms
  { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4" },
  { name: "Google Colab", Icon: SiGooglecolab, color: "#F9AB00" },
  { name: "Kaggle", Icon: SiKaggle, color: "#20BEFF" },

  // automation
  { name: "UiPath", Icon: SiUipath, color: "#FA4616" },
];

const ALSO = [
  "ChatGPT",
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
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-10 sm:gap-x-12">
        {LOGOS.map(({ name, Icon, color }) => (
          <li
            key={name}
            className="group flex w-24 flex-col items-center gap-3"
            title={name}
          >
            <Icon
              color={color}
              aria-hidden
              className="size-12 shrink-0 opacity-95 drop-shadow-[0_0_13px_currentColor] transition-transform duration-200 group-hover:scale-110 sm:size-14"
            />
            <span className="text-center font-display text-xs font-medium tracking-wide text-fg-dim transition-colors group-hover:text-fg">
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
              className="rounded-full border border-[var(--border)] px-3 py-1.5 font-display text-xs text-fg-dim"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
