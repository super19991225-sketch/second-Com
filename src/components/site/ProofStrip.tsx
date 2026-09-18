const items = ["AI/ML Systems", "Web Platforms", "Technical Training", "Scientific AI"];

export function ProofStrip() {
  return (
    <section aria-label="Proof" className="border-y border-border/20 bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="section-type text-sm font-medium text-foreground">
          Built with practical engineering, rigorous evaluation, and clear communication.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium tracking-[0.12em] uppercase text-foreground">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
