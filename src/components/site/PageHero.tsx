import type { ReactNode } from "react";

import { TitleIcon, type TitleIconName } from "@/components/site/TitleIcon";
import type { StageKind } from "@/components/site/TopicStage";

export function PageHero({
  kind: _kind,
  eyebrow,
  title,
  icon,
  children,
  actions,
  poster,
  footer,
  compact = false,
}: {
  kind?: StageKind;
  eyebrow?: string;
  title: string;
  icon?: TitleIconName;
  children?: ReactNode;
  actions?: ReactNode;
  poster?: { src: string; alt: string };
  footer?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden bg-transparent ${compact ? "min-h-[28rem] py-16" : "min-h-[36rem] py-24 md:min-h-[40rem] md:py-32"}`}
    >
      {poster ? (
        <img
          src={poster.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full object-cover object-[center_22%]"
        />
      ) : null}

      <div className="hero-enter relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="glass-surface rounded-3xl px-6 py-10 sm:px-10">
          {eyebrow ? (
            <p className="inline-flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
              {icon ? <TitleIcon name={icon} className="size-3.5" /> : null}
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display mt-5 text-5xl font-normal leading-[1.05] tracking-tight text-foreground md:text-6xl">
            {title}
          </h1>
          {children ? (
            <div className="mx-auto mt-6 max-w-2xl text-lg font-normal leading-8 text-foreground">
              {children}
            </div>
          ) : null}
          {actions ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">{actions}</div>
          ) : null}
          {footer ? <div className="mt-10 flex justify-center">{footer}</div> : null}
        </div>
      </div>
    </section>
  );
}
