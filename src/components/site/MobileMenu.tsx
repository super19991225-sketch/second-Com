import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Logo } from "@/components/site/Logo";
import { ContactOpenButton } from "@/components/site/ContactModal";
import { TitleIcon, type TitleIconName } from "@/components/site/TitleIcon";
import { primaryNav } from "@/data/site";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="absolute inset-x-0 top-0 bg-background/95 px-6 pb-8 pt-5 shadow-none backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2 text-base font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-secondary"
              activeProps={{
                className:
                  "inline-flex min-h-11 items-center gap-2 rounded-full bg-secondary px-3 py-2 text-base font-semibold text-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted",
              }}
              onClick={onClose}
            >
              <TitleIcon name={item.icon as TitleIconName} className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <ContactOpenButton
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
          onClick={onClose}
        >
          Start a project
        </ContactOpenButton>
      </div>
    </div>
  );
}
