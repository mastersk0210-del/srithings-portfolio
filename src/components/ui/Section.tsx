type Props = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className = "" }: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-24 sm:py-32 ${className}`}
    >
      <div className="container-page">
        {eyebrow && (
          <p className="mb-3 font-display text-xs font-medium uppercase tracking-[0.25em] text-magenta text-glow-magenta">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mb-12 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
