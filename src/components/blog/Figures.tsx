import {
  FaCode,
  FaEnvelope,
  FaGraduationCap,
  FaLanguage,
  FaMusic,
} from "react-icons/fa6";
import type { FigureName } from "@/data/posts";

/**
 * Inline SVG infographics for blog posts. Drawn in the site's neon tokens so they
 * stay crisp at any size and need no image assets.
 */
export function Figure({ name, caption }: { name: FigureName; caption?: string }) {
  const Svg = figures[name];
  return (
    <figure className="neon-border my-10 rounded-2xl bg-bg-elev p-4 sm:p-6">
      <div className="overflow-x-auto">
        <Svg />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-fg-dim">{caption}</figcaption>
      )}
    </figure>
  );
}

const svgClass = "mx-auto block w-full min-w-[520px] font-display";

const stroke = {
  cyan: "stroke-cyan",
  magenta: "stroke-magenta",
  violet: "stroke-violet",
} as const;
const fill = {
  cyan: "fill-cyan",
  magenta: "fill-magenta",
  violet: "fill-violet",
} as const;
type Accent = keyof typeof stroke;

function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" className="fill-fg-dim" />
      </marker>
    </defs>
  );
}

function Card({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent: Accent;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={14}
        className={`fill-bg ${stroke[accent]}`}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 6}
        textAnchor="middle"
        className={`${fill[accent]} text-[19px] font-bold`}
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 20}
          textAnchor="middle"
          className="fill-fg-dim text-[13px]"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */

function Ingredients() {
  const cards: { x: number; title: string; sub: string; accent: Accent }[] = [
    { x: 20, title: "Data", sub: "text · images · code", accent: "cyan" },
    { x: 220, title: "Model", sub: "billions of parameters", accent: "violet" },
    { x: 420, title: "Compute", sub: "thousands of chips", accent: "magenta" },
  ];
  return (
    <svg viewBox="0 0 600 270" className={svgClass} role="img" aria-label="Data, a model and computing power combine to produce a trained AI model">
      <ArrowDefs id="arrow-ingredients" />
      {cards.map((c) => (
        <g key={c.title}>
          <Card x={c.x} y={20} w={160} h={84} title={c.title} sub={c.sub} accent={c.accent} />
          <line
            x1={c.x + 80}
            y1={108}
            x2={300 + (c.x + 80 - 300) * 0.35}
            y2={180}
            className="stroke-fg-dim"
            strokeWidth={1.5}
            markerEnd="url(#arrow-ingredients)"
          />
        </g>
      ))}
      <Card x={170} y={186} w={260} h={64} title="Trained AI model" accent="cyan" />
    </svg>
  );
}

function TrainingLoop() {
  const steps = ["Guess", "Check", "Measure loss", "Adjust", "Repeat"];
  const cx = 300;
  const cy = 170;
  const w = 140;
  const h = 46;
  const nodes = steps.map((label, i) => {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    return { label, x: cx + 215 * Math.cos(a), y: cy + 118 * Math.sin(a) };
  });
  // trim a centre-to-centre line to the edges of both pills
  const edge = (dx: number, dy: number) =>
    Math.min(w / 2 / Math.abs(dx || 1e-6), h / 2 / Math.abs(dy || 1e-6)) + 0.06;

  return (
    <svg viewBox="0 0 600 340" className={svgClass} role="img" aria-label="Training loop: guess, check, measure loss, adjust, repeat">
      <ArrowDefs id="arrow-loop" />
      {nodes.map((n, i) => {
        const m = nodes[(i + 1) % nodes.length];
        const dx = m.x - n.x;
        const dy = m.y - n.y;
        const t = edge(dx, dy);
        return (
          <line
            key={`l${i}`}
            x1={n.x + dx * t}
            y1={n.y + dy * t}
            x2={m.x - dx * t}
            y2={m.y - dy * t}
            className="stroke-fg-dim"
            strokeWidth={1.5}
            markerEnd="url(#arrow-loop)"
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect
            x={n.x - w / 2}
            y={n.y - h / 2}
            width={w}
            height={h}
            rx={23}
            className={`fill-bg ${i === 2 ? "stroke-magenta" : "stroke-cyan"}`}
            strokeWidth={1.5}
          />
          <text x={n.x} y={n.y + 6} textAnchor="middle" className="fill-fg text-[16px] font-semibold">
            <tspan className={i === 2 ? "fill-magenta" : "fill-cyan"}>{i + 1}</tspan>
            <tspan dx={8}>{n.label}</tspan>
          </text>
        </g>
      ))}
      <text x={cx} y={cy - 2} textAnchor="middle" className="fill-fg text-[24px] font-bold">
        × millions
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" className="fill-fg-dim text-[13px]">
        each loop nudges the parameters
      </text>
    </svg>
  );
}

function NeuralNetwork() {
  const layers = [
    { x: 80, n: 5, title: "Input", sub: "pixels" },
    { x: 230, n: 4, title: "Early layers", sub: "edges & colours" },
    { x: 380, n: 4, title: "Middle layers", sub: "eyes & ears" },
    { x: 520, n: 1, title: "Output", sub: "“cat”" },
  ];
  const ys = (n: number) =>
    Array.from({ length: n }, (_, i) => 130 + (i - (n - 1) / 2) * 44);

  return (
    <svg viewBox="0 0 600 320" className={svgClass} role="img" aria-label="A neural network: input pixels pass through layers that detect edges, then shapes, then output the label cat">
      {layers.slice(0, -1).map((l, li) => {
        const next = layers[li + 1];
        return ys(l.n).flatMap((y1, a) =>
          ys(next.n).map((y2, b) => (
            <line
              key={`${li}-${a}-${b}`}
              x1={l.x}
              y1={y1}
              x2={next.x}
              y2={y2}
              className="stroke-violet"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
          )),
        );
      })}
      {layers.map((l, li) =>
        ys(l.n).map((y, i) => (
          <circle
            key={`${li}-${i}`}
            cx={l.x}
            cy={y}
            r={li === layers.length - 1 ? 20 : 11}
            className={`fill-bg ${li === layers.length - 1 ? "stroke-magenta" : "stroke-cyan"}`}
            strokeWidth={2}
          />
        )),
      )}
      <text x={520} y={136} textAnchor="middle" className="fill-magenta text-[14px] font-bold">
        cat
      </text>
      {layers.map((l) => (
        <g key={l.title}>
          <text x={l.x} y={268} textAnchor="middle" className="fill-fg text-[14px] font-semibold">
            {l.title}
          </text>
          <text x={l.x} y={290} textAnchor="middle" className="fill-fg-dim text-[13px]">
            {l.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

function NextToken() {
  const tokens = ["The", "sun", "rises", "in", "the"];
  let x = 20;
  const chips = tokens.map((t) => {
    const w = t.length * 11 + 28;
    const chip = { t, x, w };
    x += w + 10;
    return chip;
  });
  const options = [
    { word: "east", p: 0.82 },
    { word: "morning", p: 0.09 },
    { word: "sky", p: 0.06 },
    { word: "west", p: 0.03 },
  ];

  return (
    <svg viewBox="0 0 600 330" className={svgClass} role="img" aria-label="A language model splits text into tokens, scores every possible next token, and picks east as the most likely">
      <text x={20} y={24} className="fill-magenta text-[12px] font-semibold uppercase tracking-[0.2em]">
        1 · Your text as tokens
      </text>
      {chips.map((c) => (
        <g key={c.x}>
          <rect x={c.x} y={38} width={c.w} height={38} rx={10} className="fill-bg stroke-cyan" strokeWidth={1.5} />
          <text x={c.x + c.w / 2} y={63} textAnchor="middle" className="fill-fg text-[16px]">
            {c.t}
          </text>
        </g>
      ))}
      <rect x={x} y={38} width={70} height={38} rx={10} className="fill-none stroke-magenta" strokeWidth={1.5} strokeDasharray="5 4" />
      <text x={x + 35} y={64} textAnchor="middle" className="fill-magenta text-[18px] font-bold">
        ?
      </text>

      <text x={20} y={118} className="fill-magenta text-[12px] font-semibold uppercase tracking-[0.2em]">
        2 · Score every possible next token
      </text>
      {options.map((o, i) => {
        const y = 134 + i * 34;
        const top = i === 0;
        return (
          <g key={o.word}>
            <text x={20} y={y + 18} className={`${top ? "fill-cyan font-bold" : "fill-fg-dim"} text-[15px]`}>
              {o.word}
            </text>
            <rect x={110} y={y + 4} width={380} height={18} rx={9} className="fill-bg" />
            <rect
              x={110}
              y={y + 4}
              width={Math.max(8, 380 * o.p)}
              height={18}
              rx={9}
              className={top ? "fill-cyan" : "fill-violet"}
              fillOpacity={top ? 1 : 0.6}
            />
            <text x={500} y={y + 18} className={`${top ? "fill-cyan font-bold" : "fill-fg-dim"} text-[14px]`}>
              {Math.round(o.p * 100)}%
            </text>
          </g>
        );
      })}

      <text x={20} y={300} className="fill-magenta text-[12px] font-semibold uppercase tracking-[0.2em]">
        3 · Add it to the reply
      </text>
      <text x={20} y={322} className="fill-fg text-[14px]">
        “…rises in the <tspan className="fill-cyan font-bold">east</tspan>” → then predict the next token again
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */

function EverydayAi() {
  const uses = [
    { Icon: FaEnvelope, label: "Writes emails", color: "text-cyan" },
    { Icon: FaMusic, label: "Suggests songs", color: "text-magenta" },
    { Icon: FaCode, label: "Fixes code", color: "text-violet" },
    { Icon: FaLanguage, label: "Translates menus", color: "text-cyan" },
    { Icon: FaGraduationCap, label: "Explains concepts at 2 a.m.", color: "text-magenta" },
  ];
  return (
    <div className="font-display">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-magenta">
        AI in an ordinary day
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {uses.map(({ Icon, label, color }) => (
          <li
            key={label}
            className="flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-bg px-3 py-5 text-center last:col-span-2 sm:last:col-span-1"
          >
            <Icon aria-hidden className={`size-7 ${color}`} />
            <span className="text-sm text-fg">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pill({
  x,
  y,
  w,
  label,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  accent: Accent;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={44} rx={22} className={`fill-bg ${stroke[accent]}`} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + 28} textAnchor="middle" className={`${fill[accent]} text-[16px] font-semibold`}>
        {label}
      </text>
    </g>
  );
}

function RulesVsLearning() {
  const panels = [
    {
      x0: 10,
      title: "Traditional program",
      sub: "a person writes the rules",
      inputs: [
        { label: "Rules", accent: "magenta" as Accent },
        { label: "Data", accent: "violet" as Accent },
      ],
      box: "Program",
      output: { label: "Answers", accent: "violet" as Accent },
    },
    {
      x0: 310,
      title: "Machine learning",
      sub: "the machine finds the rules",
      inputs: [
        { label: "Data", accent: "violet" as Accent },
        { label: "Answers", accent: "violet" as Accent },
      ],
      box: "Learning",
      output: { label: "Rules", accent: "cyan" as Accent },
    },
  ];
  return (
    <svg viewBox="0 0 600 320" className={svgClass} role="img" aria-label="A traditional program takes rules and data and produces answers. Machine learning takes data and answers and produces the rules.">
      <ArrowDefs id="arrow-rules" />
      <line x1={300} y1={20} x2={300} y2={300} className="stroke-violet" strokeOpacity={0.4} strokeDasharray="4 6" />
      {panels.map((p) => (
        <g key={p.title}>
          <text x={p.x0 + 140} y={26} textAnchor="middle" className="fill-fg text-[17px] font-bold">
            {p.title}
          </text>
          <text x={p.x0 + 140} y={46} textAnchor="middle" className="fill-fg-dim text-[13px]">
            {p.sub}
          </text>
          {p.inputs.map((inp, i) => {
            const x = p.x0 + 10 + i * 135;
            return (
              <g key={inp.label}>
                <Pill x={x} y={66} w={125} label={inp.label} accent={inp.accent} />
                <line
                  x1={x + 62}
                  y1={112}
                  x2={p.x0 + 140 + (i ? 28 : -28)}
                  y2={150}
                  className="stroke-fg-dim"
                  strokeWidth={1.5}
                  markerEnd="url(#arrow-rules)"
                />
              </g>
            );
          })}
          <Card x={p.x0 + 55} y={154} w={170} h={52} title={p.box} accent="violet" />
          <line
            x1={p.x0 + 140}
            y1={210}
            x2={p.x0 + 140}
            y2={238}
            className="stroke-fg-dim"
            strokeWidth={1.5}
            markerEnd="url(#arrow-rules)"
          />
          <Pill x={p.x0 + 70} y={244} w={140} label={p.output.label} accent={p.output.accent} />
        </g>
      ))}
    </svg>
  );
}

function CatHead({ cx, cy, s, accent }: { cx: number; cy: number; s: number; accent: Accent }) {
  const ear = (dir: 1 | -1) =>
    `${cx + dir * s * 0.92},${cy - s * 0.25} ${cx + dir * s * 0.78},${cy - s * 1.3} ${cx + dir * s * 0.2},${cy - s * 0.88}`;
  return (
    <g>
      <polygon points={ear(-1)} className={`fill-bg ${stroke[accent]}`} strokeWidth={1.5} strokeLinejoin="round" />
      <polygon points={ear(1)} className={`fill-bg ${stroke[accent]}`} strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={s} className={`fill-bg ${stroke[accent]}`} strokeWidth={1.5} />
      <circle cx={cx - s * 0.38} cy={cy - s * 0.12} r={s * 0.13} className={fill[accent]} />
      <circle cx={cx + s * 0.38} cy={cy - s * 0.12} r={s * 0.13} className={fill[accent]} />
      <path
        d={`M${cx - s * 0.16},${cy + s * 0.28} L${cx},${cy + s * 0.42} L${cx + s * 0.16},${cy + s * 0.28}`}
        className={stroke[accent]}
        fill="none"
        strokeWidth={1.5}
      />
    </g>
  );
}

function LearnByExample() {
  const accents: Accent[] = ["cyan", "magenta", "violet", "violet", "cyan", "magenta"];
  return (
    <svg viewBox="0 0 600 270" className={svgClass} role="img" aria-label="The model sees many labelled cat photos, learns the pattern, and recognises a cat in a photo it has never seen">
      <ArrowDefs id="arrow-cats" />
      <text x={105} y={26} textAnchor="middle" className="fill-magenta text-[12px] font-semibold uppercase tracking-[0.15em]">
        Many examples
      </text>
      {accents.map((a, i) => {
        const x = 20 + (i % 3) * 60;
        const y = 50 + Math.floor(i / 3) * 90;
        return (
          <g key={i}>
            <rect x={x} y={y} width={50} height={72} rx={8} className="fill-bg stroke-violet" strokeOpacity={0.6} strokeWidth={1} />
            <CatHead cx={x + 25} cy={y + 30} s={13} accent={a} />
            <text x={x + 25} y={y + 63} textAnchor="middle" className="fill-fg-dim text-[11px]">
              “cat”
            </text>
          </g>
        );
      })}

      <line x1={202} y1={135} x2={246} y2={135} className="stroke-fg-dim" strokeWidth={1.5} markerEnd="url(#arrow-cats)" />
      <Card x={252} y={98} w={140} h={74} title="Model" sub="finds the pattern" accent="violet" />
      <line x1={398} y1={135} x2={442} y2={135} className="stroke-fg-dim" strokeWidth={1.5} markerEnd="url(#arrow-cats)" />

      <text x={510} y={26} textAnchor="middle" className="fill-magenta text-[12px] font-semibold uppercase tracking-[0.15em]">
        A new photo
      </text>
      <rect x={450} y={60} width={120} height={120} rx={12} className="fill-bg stroke-cyan" strokeWidth={1.5} />
      <CatHead cx={510} cy={126} s={30} accent="cyan" />
      <Pill x={455} y={198} w={110} label="“cat” ✓" accent="cyan" />
    </svg>
  );
}

function GenerativeAi() {
  const ins = ["Text", "Images", "Code"];
  const outs = ["Replies", "Pictures", "New code"];
  const ys = [40, 100, 160];
  return (
    <svg viewBox="0 0 600 290" className={svgClass} role="img" aria-label="A generative model is trained on text, images and code, and produces new replies, pictures and code by predicting what comes next. Fluent does not always mean correct.">
      <ArrowDefs id="arrow-gen" />
      <text x={85} y={24} textAnchor="middle" className="fill-magenta text-[12px] font-semibold uppercase tracking-[0.15em]">
        Trained on
      </text>
      <text x={515} y={24} textAnchor="middle" className="fill-magenta text-[12px] font-semibold uppercase tracking-[0.15em]">
        Produces
      </text>
      {ins.map((label, i) => (
        <g key={label}>
          <Pill x={20} y={ys[i]} w={130} label={label} accent="violet" />
          <line x1={154} y1={ys[i] + 22} x2={198} y2={126 + (i - 1) * 16} className="stroke-fg-dim" strokeWidth={1.5} markerEnd="url(#arrow-gen)" />
        </g>
      ))}
      <Card x={202} y={84} w={196} h={84} title="Generative AI" sub="predicts what comes next" accent="cyan" />
      {outs.map((label, i) => (
        <g key={label}>
          <line x1={402} y1={126 + (i - 1) * 16} x2={446} y2={ys[i] + 22} className="stroke-fg-dim" strokeWidth={1.5} markerEnd="url(#arrow-gen)" />
          <Pill x={450} y={ys[i]} w={130} label={label} accent="cyan" />
        </g>
      ))}
      <rect x={120} y={234} width={360} height={40} rx={20} className="fill-none stroke-magenta" strokeWidth={1.5} strokeDasharray="5 4" />
      <text x={300} y={259} textAnchor="middle" className="fill-magenta text-[14px] font-semibold">
        Fluent and confident ≠ always correct
      </text>
    </svg>
  );
}

const figures: Record<FigureName, () => React.JSX.Element> = {
  "everyday-ai": EverydayAi,
  "rules-vs-learning": RulesVsLearning,
  "learn-by-example": LearnByExample,
  "generative-ai": GenerativeAi,
  ingredients: Ingredients,
  "training-loop": TrainingLoop,
  "neural-network": NeuralNetwork,
  "next-token": NextToken,
};
