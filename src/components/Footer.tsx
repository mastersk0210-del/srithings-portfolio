import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="container-page border-t border-[var(--border)] py-10 text-sm text-fg-dim">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} {site.name} — {site.role}
        </p>
        <div className="flex gap-5">
          <a href={site.links.github} className="hover:text-cyan">GitHub</a>
          <a href={site.links.linkedin} className="hover:text-cyan">LinkedIn</a>
          <a href={`mailto:${site.email}`} className="hover:text-cyan">Email</a>
        </div>
      </div>
    </footer>
  );
}
