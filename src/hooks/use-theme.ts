import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "gx-theme";

function getSystemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function resolveTheme(mode: ThemeMode) {
  if (mode === "system") return getSystemDark() ? "dark" : "light";
  return mode;
}

export function applyThemeClass(mode: ThemeMode) {
  const resolved = resolveTheme(mode);
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}

export function readStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    /* ignore */
  }
  return "system";
}

export function writeStoredTheme(mode: ThemeMode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

/** Inline boot script for RootShell — prevents theme flash before hydrate. */
export const themeBootScript = `(function(){try{var k=${JSON.stringify(STORAGE_KEY)};var m=localStorage.getItem(k);if(m!=="light"&&m!=="dark"&&m!=="system")m="system";var d=m==="dark"||(m==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    const initial = readStoredTheme();
    setModeState(initial);
    applyThemeClass(initial);
    setResolved(resolveTheme(initial));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function onSystemChange() {
      const current = readStoredTheme();
      if (current === "system") {
        applyThemeClass("system");
        setResolved(resolveTheme("system"));
      }
    }
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function setMode(next: ThemeMode) {
    writeStoredTheme(next);
    setModeState(next);
    applyThemeClass(next);
    setResolved(resolveTheme(next));
  }

  function cycleMode() {
    const order: ThemeMode[] = ["light", "dark", "system"];
    const index = order.indexOf(mode);
    setMode(order[(index + 1) % order.length]);
  }

  return { mode, resolved, setMode, cycleMode };
}
