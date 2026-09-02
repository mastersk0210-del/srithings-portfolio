"use client";

import dynamic from "next/dynamic";
import { site } from "@/lib/site";
import { CtaButton } from "@/components/ui/CtaButton";
import { useHasWebGL, useReducedMotion } from "@/lib/hooks";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false },
);

export function Hero() {
  const hasWebGL = useHasWebGL();
  const reduced = useReducedMotion();
  const show3D = hasWebGL === true && !reduced;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* neon wash behind the figure */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(38%_46%_at_72%_46%,rgba(122,92,255,0.16),transparent_70%),radial-gradient(24%_30%_at_80%_66%,rgba(255,46,205,0.10),transparent_70%)]" />

      {/* figure: 3D particle field, or a static photo fallback */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {show3D ? (
          <ParticleField />
        ) : (
          hasWebGL !== null && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/avatar.jpg"
              alt={`${site.name}, ${site.role}`}
              className="absolute right-0 top-1/2 h-[86%] max-w-[52vw] -translate-y-1/2 object-contain opacity-95 [mask-image:radial-gradient(58%_72%_at_50%_50%,#000_58%,transparent_100%)] sm:h-[92%]"
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
        {/* on small screens the figure sits behind the copy — scrim it back */}
        <div className="absolute inset-0 bg-[var(--bg)]/60 md:hidden" />
      </div>

      <div className="container-page">
        <h1 className="max-w-[9ch] font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          {site.name}
          <span className="text-cyan text-glow-cyan">.</span>
        </h1>
        <p className="mt-4 font-display text-xs uppercase tracking-[0.3em] text-cyan text-glow-cyan sm:text-sm">
          {site.role} &nbsp;·&nbsp; {site.location}
        </p>

        <p className="mt-8 max-w-xl font-display text-xl font-medium leading-snug text-fg sm:text-3xl">
          {site.tagline}
        </p>
        <p className="mt-4 max-w-md text-base text-fg-dim">
          {site.specialization}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <CtaButton from="hero" />
          <a
            href="#work"
            className="neon-border inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm text-fg transition-colors hover:text-cyan"
          >
            See the work
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-fg-dim">
        scroll
      </div>
    </section>
  );
}
