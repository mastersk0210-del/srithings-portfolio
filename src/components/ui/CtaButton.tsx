"use client";

import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

type Props = {
  variant?: "primary" | "ghost";
  from: string; // where the click originated, for analytics
  children?: React.ReactNode;
  className?: string;
};

export function CtaButton({
  variant = "primary",
  from,
  children = "Book a call",
  className = "",
}: Props) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-medium tracking-wide transition-all duration-200 will-change-transform hover:-translate-y-0.5";
  const styles =
    variant === "primary"
      ? "bg-cyan text-[#05060a] shadow-[var(--glow-cyan)] hover:shadow-[0_0_18px_rgba(0,229,255,0.8),0_0_60px_rgba(0,229,255,0.35)]"
      : "neon-border text-fg hover:text-cyan";

  return (
    <a
      href={site.calUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
      onClick={() => track("cta_book_click", { from })}
    >
      {children}
    </a>
  );
}
