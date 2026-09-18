import { useEffect, useRef } from "react";

export type StageKind =
  | "mosaic"
  | "orbit"
  | "film"
  | "float"
  | "sweep"
  | "ink"
  | "breathe"
  | "paper";

export function TopicStage({ kind }: { kind: StageKind }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (kind !== "ink") return;
    const host = hostRef.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      host.style.setProperty("--tilt-x", x.toFixed(3));
      host.style.setProperty("--tilt-y", y.toFixed(3));
    };
    const onLeave = () => {
      host.style.setProperty("--tilt-x", "0");
      host.style.setProperty("--tilt-y", "0");
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [kind]);

  if (kind !== "ink" && kind !== "sweep") return null;

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{ ["--tilt-x" as string]: 0, ["--tilt-y" as string]: 0 }}
    >
      {kind === "ink" ? (
        <>
          <div className="stage-ink absolute right-[28%] top-[46%]" />
          <div className="stage-ink stage-ink-delay absolute right-[28%] top-[46%]" />
        </>
      ) : null}
      {kind === "sweep" ? <div className="stage-light absolute inset-0" /> : null}
    </div>
  );
}
