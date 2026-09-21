import { Monitor, Moon, Sun } from "lucide-react";

import { useTheme, type ThemeMode } from "@/hooks/use-theme";

const labels: Record<ThemeMode, string> = {
  light: "Light mode",
  dark: "Dark mode",
  system: "System theme",
};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { mode, cycleMode } = useTheme();

  const Icon = mode === "dark" ? Moon : mode === "light" ? Sun : Monitor;

  return (
    <button
      type="button"
      onClick={cycleMode}
      aria-label={`${labels[mode]}. Click to change theme.`}
      title={labels[mode]}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-primary/25 dark:hover:border-primary/50 ${className}`}
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}
