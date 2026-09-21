import { Link } from "@tanstack/react-router";

import { company } from "@/data/site";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 rounded-sm ${onDark ? "text-footer-foreground" : "text-foreground"}`}
    >
      <img
        src="/images/genxalab-logo.png"
        alt=""
        aria-hidden
        className="size-8 shrink-0 object-contain"
      />
      <span className="text-sm font-semibold tracking-tight">{company.name}</span>
    </Link>
  );
}
