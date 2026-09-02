import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-6xl font-bold text-cyan text-glow-cyan">404</p>
      <p className="text-fg-dim">This page drifted out of orbit.</p>
      <Link href="/" className="neon-border rounded-full px-6 py-3 text-sm hover:text-cyan">
        Back home
      </Link>
    </main>
  );
}
