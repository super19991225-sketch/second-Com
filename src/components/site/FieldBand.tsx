import type { ReactNode } from "react";

export function FieldBand({ children }: { children: ReactNode }) {
  return (
    <section className="relative bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-20">{children}</div>
    </section>
  );
}
