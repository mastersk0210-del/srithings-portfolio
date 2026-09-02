import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/data/projects";
import { CtaButton } from "@/components/ui/CtaButton";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: `${project.task} — ${project.summary}`,
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const hasNext = projects.length > 1 && next.slug !== slug;

  return (
    <>
      <SiteNav />
      <main className="container-page pt-32">
        <Link href="/#work" className="text-sm text-fg-dim hover:text-cyan">
          ← All work
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-[0.25em] text-magenta">
            {project.context}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 text-lg text-fg-dim">{project.summary}</p>
        </header>

        {/* Metrics */}
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="neon-border rounded-2xl bg-bg-elev p-5"
            >
              <div className="font-display text-2xl font-bold text-cyan text-glow-cyan">
                {m.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-fg-dim">
                {m.label}
              </div>
              {m.sub && <div className="mt-1 text-xs text-fg-dim">{m.sub}</div>}
            </div>
          ))}
        </section>

        <div className="mt-16 grid gap-12 md:grid-cols-[2fr_1fr]">
          <article className="space-y-8 text-fg-dim">
            <Block title="Problem">{project.problem}</Block>
            <Block title="Data">{project.data}</Block>
            <Block title="Approach">{project.approach}</Block>
            <Block title="Outcome">{project.outcome}</Block>
            <Block title="Limitations / next">
              <ul className="list-disc space-y-1 pl-5">
                {project.limitations.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </Block>
          </article>

          <aside className="space-y-6">
            <div className="neon-border rounded-2xl bg-bg-elev p-5">
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-cyan">
                Stack
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-fg-dim">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            {project.demo && (
              <div className="neon-border rounded-2xl bg-bg-elev p-5">
                <h3 className="font-display text-sm uppercase tracking-[0.2em] text-cyan">
                  Demo
                </h3>
                <p className="mt-2 text-sm text-fg-dim">
                  {project.demo.kind}
                  {project.demo.note ? ` — ${project.demo.note}` : ""}
                </p>
              </div>
            )}
            {(project.links.repo || project.links.demo || project.links.writeup) && (
              <div className="neon-border rounded-2xl bg-bg-elev p-5">
                <h3 className="font-display text-sm uppercase tracking-[0.2em] text-cyan">
                  Links
                </h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {Object.entries(project.links).map(([k, v]) =>
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
            )}
            <CtaButton from={`work:${project.slug}`} />
          </aside>
        </div>

        {hasNext && (
          <div className="mt-20 border-t border-[var(--border)] py-10">
            <Link
              href={`/work/${next.slug}`}
              className="group flex items-center justify-between"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-fg-dim">
                Next project
              </span>
              <span className="font-display text-2xl font-bold transition-colors group-hover:text-cyan">
                {next.name} →
              </span>
            </Link>
          </div>
        )}
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
