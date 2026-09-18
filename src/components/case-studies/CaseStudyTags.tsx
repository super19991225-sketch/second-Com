export function CaseStudyTags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] uppercase text-amber-300"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
