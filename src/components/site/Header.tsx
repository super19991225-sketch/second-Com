import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/site/Logo";
import { ContactOpenButton } from "@/components/site/ContactModal";
import { MobileMenu } from "@/components/site/MobileMenu";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { TitleIcon, type TitleIconName } from "@/components/site/TitleIcon";
import { primaryNav } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-background/90 backdrop-blur-xl dark:border-primary/15 dark:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Logo />
        <nav
          className="hidden items-center gap-1 text-[13px] text-muted-foreground lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2 font-medium tracking-wide transition-colors duration-200 hover:bg-secondary/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-secondary dark:hover:text-primary"
              activeProps={{
                className:
                  "inline-flex min-h-11 items-center gap-1.5 rounded-full bg-secondary px-3 py-2 font-semibold tracking-wide text-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted dark:bg-secondary dark:text-primary",
              }}
            >
              <TitleIcon name={item.icon as TitleIconName} className="size-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-[13px] font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:shadow-[0_0_20px_oklch(0.9_0.04_85/0.2)]">
            Start a project
          </ContactOpenButton>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-4" aria-hidden />
          </button>
        </div>
      </div>
      <div id="mobile-menu">
        <MobileMenu open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
}
