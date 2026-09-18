import type { ReactNode } from "react";

import { TitleIcon, type TitleIconName } from "@/components/site/TitleIcon";

const chipClass =
  "rounded-full border border-primary/30 bg-background/45 px-2 py-0.5 text-[10px] font-medium tracking-[0.12em] uppercase text-primary";

export function TicketCard({
  image,
  alt,
  eyebrow,
  badge,
  title,
  icon,
  body,
  chips,
  footer,
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  badge?: string;
  title: string;
  icon?: TitleIconName;
  body?: string;
  chips?: readonly string[];
  footer?: ReactNode;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/25">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="glass-surface flex flex-grow flex-col rounded-b-2xl border-t-0 p-6 text-foreground">
        <div className="mb-3 flex items-center justify-between gap-3">
          {eyebrow ? (
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-primary">
              {eyebrow}
            </p>
          ) : (
            <span />
          )}
          {badge ? (
            <span className="rounded-full border border-primary/30 bg-background/45 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.16em] uppercase text-primary">
              {badge}
            </span>
          ) : null}
        </div>
        <h3 className="font-display flex items-center gap-2.5 text-[1.65rem] leading-tight text-foreground">
          {icon ? <TitleIcon name={icon} className="size-5 shrink-0" /> : null}
          {title}
        </h3>
        {body ? (
          <p className="mt-2 text-sm font-light leading-6 text-foreground/90">{body}</p>
        ) : null}
        {chips?.length ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {chips.map((chip) => (
              <li key={chip} className={chipClass}>
                {chip}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-auto" />
        )}
        {footer}
      </div>
    </article>
  );
}
