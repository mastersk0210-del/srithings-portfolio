"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { CtaButton } from "@/components/ui/CtaButton";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Stack" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="container-page mt-4 flex items-center justify-between rounded-full bg-[color-mix(in_oklab,var(--bg-elev)_80%,transparent)] px-5 py-3 backdrop-blur-md neon-border">
        <Link href="/" className="font-display text-sm font-bold tracking-widest">
          {site.shortName}<span className="text-cyan">.</span>
        </Link>
        <ul className="hidden gap-7 text-sm text-fg-dim md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <CtaButton from="nav" className="!px-4 !py-2 !text-xs">
          LinkedIn
        </CtaButton>
      </nav>
    </header>
  );
}
