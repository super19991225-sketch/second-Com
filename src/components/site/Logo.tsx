import { Link } from "@tanstack/react-router";

import { company } from "@/data/site";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 rounded-sm ${onDark ? "text-footer-foreground" : "text-foreground"}`}
    >
      {/* Same GX mark — light = brand brown, dark = white. Geometry unchanged. */}
      {onDark ? (
        <img
          src="/images/genixalab-mark-dark.png"
          alt=""
          aria-hidden
          className="size-8 shrink-0 object-contain"
        />
      ) : (
        <>
          <img
            src="/images/genixalab-mark-light.png"
            alt=""
            aria-hidden
            className="size-8 shrink-0 object-contain dark:hidden"
          />
          <img
            src="/images/genixalab-mark-dark.png"
            alt=""
            aria-hidden
            className="hidden size-8 shrink-0 object-contain dark:block"
          />
        </>
      )}
      <span className="text-sm font-semibold tracking-tight">{company.brand}</span>
    </Link>
  );
}
