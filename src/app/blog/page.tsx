import Link from "next/link";
import type { Metadata } from "next";
import { posts, readingMinutes, formatDate } from "@/data/posts";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { TagList } from "@/components/ui/TagList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on AI, machine learning and shipping models to production.",
};

export default function BlogPage() {
  return (
    <>
      <SiteNav />
      <main className="container-page min-h-[70svh] pt-32 pb-24">
        <header className="max-w-3xl">
          <p className="font-display text-xs uppercase tracking-[0.25em] text-magenta text-glow-magenta">
            Blog
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl">
            {"AI isn't Magic, It's a Tool. Here is How to Use it Well."}
          </h1>
          <p className="mt-4 text-lg text-fg-dim">
            Notes on machine learning, LLMs and shipping models to production.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-16 text-fg-dim">First post coming soon.</p>
        ) : (
          <ul className="mt-16 space-y-6">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="neon-border group block rounded-2xl bg-bg-elev p-6 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.15em] text-fg-dim">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{readingMinutes(p)} min read</span>
                    {p.draft && <span className="text-magenta">Draft</span>}
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-semibold transition-colors group-hover:text-cyan">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-fg-dim">{p.summary}</p>
                  <TagList tags={p.tags} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
