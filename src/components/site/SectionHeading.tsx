import type { ReactNode } from "react";

import { TitleIcon, type TitleIconName } from "@/components/site/TitleIcon";

export function SectionHeading({
  eyebrow,
  title,
  icon,
  children,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  icon?: TitleIconName;
  children?: ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="max-w-xl">
      <p
        className={`section-type inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase ${
          invert ? "text-band-foreground" : "text-primary"
        }`}
      >
        {icon ? <TitleIcon name={icon} className="size-3.5" /> : null}
        {eyebrow}
      </p>
      <h2
        className={`section-type font-display mt-3 text-4xl font-normal leading-tight tracking-tight md:text-5xl ${
          invert ? "text-band-foreground" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      <span
        aria-hidden
        className={`mt-4 block h-px w-12 ${invert ? "bg-band-foreground/50" : "bg-primary/50"}`}
      />
      {children ? (
        <p
          className={`section-type mt-5 max-w-[40ch] text-base font-medium leading-7 ${
            invert ? "text-band-foreground" : "text-foreground"
          }`}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}
