import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { models, getModel } from "@/data/models";
import { CtaButton } from "@/components/ui/CtaButton";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(
  props: PageProps<"/models/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const model = getModel(slug);
  if (!model) return {};
  return {
    title: model.name,
    description: `${model.task} — ${model.summary}`,
  };
}

export default async function ModelPage(props: PageProps<"/models/[slug]">) {
  const { slug } = await props.params;
  const model = getModel(slug);
  if (!model) notFound();

  const idx = models.findIndex((m) => m.slug === slug);
  const next = models[(idx + 1) % models.length];

  return (
    <>
      <SiteNav />
      <main className="container-page pt-32">
        <Link href="/#models" className="text-sm text-fg-dim hover:text-cyan">
          ← All models
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-[0.25em] text-magenta">
            {model.task}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl">
            {model.name}
          </h1>
          <p className="mt-4 text-lg text-fg-dim">{model.summary}</p>
        </header>

        {/* Metrics */}
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {model.metrics.map((m) => (
            <div
              key={m.label}
              className="neon-border rounded-2xl bg-bg-elev p-5"
            >
              <div className="font-display text-3xl font-bold text-cyan text-glow-cyan">
                {m.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-fg-dim">
                {m.label}
              </div>
              {m.sub && <div className="mt-1 text-xs text-fg-dim">{m.sub}</div>}
            </div>
          ))}
        </section>

        {/* Write-up — filled in M4 */}
        <div className="mt-16 grid gap-12 md:grid-cols-[2fr_1fr]">
          <article className="space-y-8 text-fg-dim">
            <Block title="Problem & motivation">TODO</Block>
            <Block title="Data">{model.dataset}</Block>
            <Block title="Architecture">{model.architecture}</Block>
            <Block title="Training">{model.training}</Block>
            <Block title="Results">
              {model.baseline
                ? `Baseline: ${model.baseline}. See metrics above.`
                : "See metrics above. TODO: baseline comparison + curves."}
            </Block>
            <Block title="Limitations">
              <ul className="list-disc space-y-1 pl-5">
                {model.limitations.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </Block>
          </article>

          <aside className="space-y-6">
            <div className="neon-border rounded-2xl bg-bg-elev p-5">
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-cyan">
                Demo
              </h3>
              <p className="mt-2 text-sm text-fg-dim">
                {model.demo
                  ? `${model.demo.kind}${model.demo.note ? ` — ${model.demo.note}` : ""}`
                  : "TODO"}
              </p>
            </div>
            <div className="neon-border rounded-2xl bg-bg-elev p-5">
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-cyan">
                Links
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                {Object.entries(model.links).map(([k, v]) =>
                  v ? (
                    <li key={k}>
                      <a href={v} className="text-fg-dim hover:text-cyan">
                        {k}
                      </a>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
            <CtaButton from={`model:${model.slug}`} />
          </aside>
        </div>

        {/* Next */}
        <div className="mt-20 border-t border-[var(--border)] py-10">
          <Link
            href={`/models/${next.slug}`}
            className="group flex items-center justify-between"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-fg-dim">
              Next model
            </span>
            <span className="font-display text-2xl font-bold transition-colors group-hover:text-cyan">
              {next.name} →
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-sm uppercase tracking-[0.2em] text-fg">
        {title}
      </h2>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </section>
  );
}
