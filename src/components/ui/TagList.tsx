export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-fg-dim"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
