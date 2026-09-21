import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

import { ContactForm } from "@/components/site/ContactForm";
import { company } from "@/data/site";

type ContactModalContextValue = {
  open: boolean;
  openContact: () => void;
  closeContact: () => void;
};

type Phase = "hidden" | "opening" | "ready" | "closing";

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

const COLS = 5;
const ROWS = 4;
const FRAGMENT_COUNT = COLS * ROWS;
const OPEN_MS = 1000;
const CLOSE_MS = 950;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function buildFragments() {
  const midCol = (COLS - 1) / 2;
  const midRow = (ROWS - 1) / 2;

  return Array.from({ length: FRAGMENT_COUNT }, (_, index) => {
    const col = index % COLS;
    const row = Math.floor(index / COLS);
    const dx = col - midCol;
    const dy = row - midRow;
    const dist = Math.hypot(dx, dy) || 1;
    const nx = dx / dist;
    const ny = dy / dist;
    const travel = 150 + dist * 58;
    const ring = Math.round(dist);
    // Oversize tiles so they fuse into one surface on arrival
    const pad = 10;

    return {
      id: index,
      left: `calc(${(col / COLS) * 100}% - ${pad}px)`,
      top: `calc(${(row / ROWS) * 100}% - ${pad}px)`,
      width: `calc(${100 / COLS}% + ${pad * 2}px)`,
      height: `calc(${100 / ROWS}% + ${pad * 2}px)`,
      delay: `${ring * 28}ms`,
      outDelay: `${ring * 24}ms`,
      fx: `${(nx * travel).toFixed(1)}px`,
      fy: `${(ny * travel).toFixed(1)}px`,
    };
  });
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const timers = useRef<number[]>([]);
  const fragments = useMemo(() => buildFragments(), []);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const openContact = useCallback(() => {
    clearTimers();
    if (prefersReducedMotion()) {
      setPhase("ready");
      return;
    }
    setPhase("opening");
    timers.current.push(window.setTimeout(() => setPhase("ready"), OPEN_MS));
  }, [clearTimers]);

  const closeContact = useCallback(() => {
    clearTimers();
    if (phase === "hidden" || phase === "closing") return;
    if (prefersReducedMotion()) {
      setPhase("hidden");
      return;
    }
    setPhase("closing");
    timers.current.push(window.setTimeout(() => setPhase("hidden"), CLOSE_MS));
  }, [clearTimers, phase]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (phase === "hidden") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContact();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [phase, closeContact]);

  const value = useMemo(
    () => ({
      open: phase !== "hidden",
      openContact,
      closeContact,
    }),
    [phase, openContact, closeContact],
  );

  const showShell = phase !== "hidden";
  const fragmentMode = phase === "opening" ? "in" : phase === "closing" ? "out" : null;
  const panelClass =
    phase === "opening"
      ? "contact-modal-panel-in"
      : phase === "closing"
        ? "contact-modal-panel-out"
        : phase === "ready"
          ? "contact-modal-panel-ready"
          : "";

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      {showShell ? (
        <div
          className="fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <button
            type="button"
            className={`absolute inset-0 bg-ink/50 backdrop-blur-[3px] ${phase === "closing" ? "contact-modal-backdrop-out" : "contact-modal-backdrop"}`}
            aria-label="Close contact dialog"
            onClick={closeContact}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            <div className="relative h-[min(88vh,40rem)] w-full max-w-2xl">
              {fragmentMode ? (
                <div
                  className={`contact-merge-plate absolute inset-0 rounded-3xl bg-background ${
                    fragmentMode === "out" ? "contact-merge-plate-out" : "contact-merge-plate-in"
                  }`}
                  aria-hidden
                />
              ) : null}

              {fragmentMode
                ? fragments.map((fragment) => (
                    <span
                      key={`${fragmentMode}-${fragment.id}`}
                      className={`contact-shard absolute rounded-md bg-background ${fragmentMode === "out" ? "contact-fragment-out" : "contact-fragment"}`}
                      style={{
                        left: fragment.left,
                        top: fragment.top,
                        width: fragment.width,
                        height: fragment.height,
                        animationDelay: fragmentMode === "out" ? fragment.outDelay : fragment.delay,
                        ["--fx" as string]: fragment.fx,
                        ["--fy" as string]: fragment.fy,
                      }}
                    />
                  ))
                : null}

              <div
                className={`pointer-events-auto absolute inset-0 overflow-y-auto rounded-3xl border border-border/40 bg-background/97 p-6 shadow-2xl backdrop-blur-md sm:p-8 ${panelClass}`}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                      Contact
                    </p>
                    <h2
                      id="contact-modal-title"
                      className="font-display mt-2 text-3xl text-foreground md:text-4xl"
                    >
                      Tell us what you are building.
                    </h2>
                    <p className="mt-3 max-w-xl text-sm font-light leading-6 text-muted-foreground">
                      Share the challenge, users, available data, and desired outcome. We will reply
                      with a practical next step.
                    </p>
                    <p className="mt-3 text-sm">
                      <a href={`mailto:${company.email}`} className="text-primary hover:underline">
                        {company.email}
                      </a>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeContact}
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Close"
                  >
                    <X className="size-5" aria-hidden />
                  </button>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return ctx;
}

export function ContactOpenButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { openContact } = useContactModal();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openContact();
      }}
    >
      {children}
    </button>
  );
}
