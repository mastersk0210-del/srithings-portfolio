"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaXmark } from "react-icons/fa6";
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
  const [open, setOpen] = useState(false);

  // close the mobile menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
        <div className="flex items-center gap-2">
          <CtaButton from="nav" className="!px-4 !py-2 !text-xs">
            LinkedIn
          </CtaButton>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full border border-[var(--border)] text-fg transition-colors hover:text-cyan md:hidden"
          >
            {open ? <FaXmark className="size-4" /> : <FaBars className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="container-page mt-2 md:hidden">
          <ul className="neon-border rounded-2xl bg-[color-mix(in_oklab,var(--bg-elev)_92%,transparent)] p-2 backdrop-blur-md">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 font-display text-base text-fg-dim transition-colors hover:bg-bg hover:text-cyan"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
