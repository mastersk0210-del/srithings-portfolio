import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  posts,
  getPost,
  readingMinutes,
  formatDate,
  type PostBlock,
} from "@/data/posts";
import { CtaButton } from "@/components/ui/CtaButton";
import { TagList } from "@/components/ui/TagList";
import { Figure } from "@/components/blog/Figures";
import { site } from "@/lib/site";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <SiteNav />
      <main className="container-page pt-32 pb-24">
        <Link href="/blog" className="text-sm text-fg-dim hover:text-cyan">
          ← All posts
        </Link>

        <article className="mt-6 max-w-3xl">
          <header>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.15em] text-fg-dim">
              <span>{site.name}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{readingMinutes(post)} min read</span>
              {post.draft && <span className="text-magenta">Draft</span>}
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-fg-dim">{post.summary}</p>
            <TagList tags={post.tags} />
          </header>

          <div className="mt-12 space-y-6 leading-relaxed text-fg-dim">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </article>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--border)] pt-10">
          <p className="text-fg-dim">Want to talk about this?</p>
          <CtaButton from={`blog:${post.slug}`} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return (
        <h2 className="pt-4 font-display text-2xl font-semibold text-fg">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="list-disc space-y-1 pl-5">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-cyan pl-5 text-lg italic text-fg">
          {block.text}
        </blockquote>
      );
    case "figure":
      return <Figure name={block.name} caption={block.caption} />;
    case "code":
      return (
        <pre className="neon-border overflow-x-auto rounded-2xl bg-bg-elev p-5 text-sm text-fg">
          <code data-lang={block.lang}>{block.code}</code>
        </pre>
      );
  }
}
