import { useEffect, useRef, useState } from "react";

const fields = [
  { title: "AI/ML Engineering", image: "/images/hero-network.png" },
  { title: "Web Development", image: "/images/work-product.png" },
  { title: "AI Training", image: "/images/work-desk.png" },
  { title: "Mathematics & Physics AI", image: "/images/work-model.png" },
  { title: "Data Engineering & MLOps", image: "/images/work-dashboard.png" },
  { title: "AI Strategy", image: "/images/team-office.png" },
];

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function WaterField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || prefersReducedMotion()) return;

    const view = canvas.getContext("2d", { alpha: false });
    if (!view) return;

    let cancelled = false;
    let raf = 0;
    let simW = 0;
    let simH = 0;
    let srcW = 0;
    let srcH = 0;
    let bufA = new Float32Array(0);
    let bufB = new Float32Array(0);
    let sourcePixels = new Uint8ClampedArray(0);
    let lastX = -1;
    let lastY = -1;

    const splash = (cx: number, cy: number, radius: number, force: number) => {
      const r2 = radius * radius;
      const x0 = Math.max(1, Math.floor(cx - radius));
      const x1 = Math.min(simW - 2, Math.ceil(cx + radius));
      const y0 = Math.max(1, Math.floor(cy - radius));
      const y1 = Math.min(simH - 2, Math.ceil(cy + radius));
      for (let y = y0; y <= y1; y += 1) {
        for (let x = x0; x <= x1; x += 1) {
          const dx = x - cx;
          const dy = y - cy;
          const d2 = dx * dx + dy * dy;
          if (d2 > r2) continue;
          bufA[y * simW + x] += force * (1 - d2 / r2);
        }
      }
    };

    const pointer = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * simW;
      const y = ((clientY - rect.top) / rect.height) * simH;
      if (lastX < 0) {
        splash(x, y, 18, 3.2);
      } else {
        const dist = Math.hypot(x - lastX, y - lastY);
        const steps = Math.max(1, Math.ceil(dist / 3));
        const force = Math.min(6.2, 2 + dist * 0.14);
        for (let i = 0; i <= steps; i += 1) {
          const t = i / steps;
          splash(lastX + (x - lastX) * t, lastY + (y - lastY) * t, 16, force);
        }
      }
      lastX = x;
      lastY = y;
    };

    const onPointerMove = (event: PointerEvent) => pointer(event.clientX, event.clientY);
    const onPointerDown = (event: PointerEvent) => {
      lastX = -1;
      pointer(event.clientX, event.clientY);
    };
    const onPointerLeave = () => {
      lastX = -1;
    };

    let frame = view.createImageData(1, 1);

    const paint = (now: number) => {
      if (simW < 3 || sourcePixels.length === 0) return;

      const next = bufB;
      const curr = bufA;
      for (let y = 1; y < simH - 1; y += 1) {
        const row = y * simW;
        for (let x = 1; x < simW - 1; x += 1) {
          const i = row + x;
          next[i] = (curr[i - 1] + curr[i + 1] + curr[i - simW] + curr[i + simW]) / 2 - next[i];
          next[i] *= 0.968;
        }
      }
      bufA = next;
      bufB = curr;

      if (frame.width !== simW || frame.height !== simH) {
        frame = view.createImageData(simW, simH);
      }
      const out = frame.data;
      const drift = (now * 0.018) % Math.max(1, srcW - simW);
      const wave = now * 0.0012;

      for (let y = 0; y < simH; y += 1) {
        const row = y * simW;
        for (let x = 0; x < simW; x += 1) {
          const i = row + x;
          const left = x > 0 ? bufA[i - 1] : bufA[i];
          const right = x < simW - 1 ? bufA[i + 1] : bufA[i];
          const up = y > 0 ? bufA[i - simW] : bufA[i];
          const down = y < simH - 1 ? bufA[i + simW] : bufA[i];
          const dx = (left - right) * 1.55;
          const dy = (up - down) * 1.55;
          const flowX = Math.sin(y * 0.045 + wave) * 1.8;
          const flowY = Math.cos(x * 0.03 + wave * 0.85) * 1.2;
          let sx = Math.round(x + drift + dx + flowX);
          let sy = Math.round(y + dy + flowY);
          sx = Math.max(0, Math.min(srcW - 1, sx));
          sy = Math.max(0, Math.min(srcH - 1, sy));
          const si = (sy * srcW + sx) * 4;
          const oi = i * 4;
          const light = 1 + Math.max(-0.1, Math.min(0.14, dx * 0.035));
          out[oi] = sourcePixels[si] * light;
          out[oi + 1] = sourcePixels[si + 1] * light;
          out[oi + 2] = sourcePixels[si + 2] * light;
          out[oi + 3] = 255;
        }
      }

      view.putImageData(frame, 0, 0);
    };

    const compose = (images: HTMLImageElement[]) => {
      const box = host.getBoundingClientRect();
      const cssW = Math.max(1, Math.floor(box.width));
      const cssH = Math.max(1, Math.floor(box.height));
      simW = Math.max(160, Math.min(720, Math.floor(cssW / 2.2)));
      simH = Math.max(120, Math.min(420, Math.floor(cssH / 2.2)));
      srcW = Math.floor(simW * 2.35);
      srcH = simH;
      canvas.width = simW;
      canvas.height = simH;
      bufA = new Float32Array(simW * simH);
      bufB = new Float32Array(simW * simH);

      const source = document.createElement("canvas");
      source.width = srcW;
      source.height = srcH;
      const sctx = source.getContext("2d", { alpha: false });
      if (!sctx) return;

      sctx.filter = "saturate(0.72) contrast(1.04)";
      const panelW = srcW / images.length;
      images.forEach((image, index) => {
        const scale = Math.max(panelW / image.naturalWidth, srcH / image.naturalHeight);
        const dw = image.naturalWidth * scale;
        const dh = image.naturalHeight * scale;
        sctx.drawImage(image, index * panelW + (panelW - dw) / 2, (srcH - dh) / 2, dw, dh);
      });
      sctx.filter = "none";
      sctx.fillStyle = "rgba(38, 48, 68, 0.16)";
      sctx.fillRect(0, 0, srcW, srcH);

      images.forEach((_, index) => {
        const label = fields[index].title;
        sctx.font = "500 10px Outfit, ui-sans-serif, system-ui, sans-serif";
        const width = sctx.measureText(label).width + 22;
        const x = index * panelW + 14;
        const y = srcH - 36;
        sctx.fillStyle = "rgba(252, 249, 242, 0.94)";
        sctx.beginPath();
        sctx.roundRect(x, y, width, 18, 999);
        sctx.fill();
        sctx.fillStyle = "rgb(36, 42, 58)";
        sctx.fillText(label, x + 11, y + 12);
      });

      sourcePixels = sctx.getImageData(0, 0, srcW, srcH).data;
    };

    const tick = (now: number) => {
      paint(now);
      raf = requestAnimationFrame(tick);
    };

    let imagesCache: HTMLImageElement[] | null = null;
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (cancelled || !imagesCache) return;
        compose(imagesCache);
      }, 120);
    };

    void Promise.all(fields.map((field) => loadImage(field.image)))
      .then((images) => {
        if (cancelled) return;
        imagesCache = images;
        compose(images);
        setLive(true);
        host.addEventListener("pointermove", onPointerMove, { passive: true });
        host.addEventListener("pointerdown", onPointerDown, { passive: true });
        host.addEventListener("pointerleave", onPointerLeave);
        window.addEventListener("resize", onResize);
        raf = requestAnimationFrame(tick);
      })
      .catch(() => {
        setLive(false);
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 overflow-hidden" aria-hidden>
      {!live ? (
        <div className="water-drift absolute inset-y-0 left-[-18%] h-full w-[230%] min-w-[2200px]">
          <div className="flex h-full">
            {fields.map((field) => (
              <figure
                key={field.title}
                className="relative h-full w-[16.66%] min-w-[320px] shrink-0"
              >
                <img
                  src={field.image}
                  alt=""
                  className="h-full w-full object-cover saturate-[0.72] contrast-[1.04]"
                />
                <div className="absolute inset-0 bg-[oklch(0.32_0.04_255/0.18)]" />
                <figcaption className="absolute bottom-20 left-6">
                  <span className="inline-block rounded-full bg-background/92 px-3 py-1.5 text-[10px] font-medium tracking-[0.18em] uppercase text-foreground shadow-sm">
                    {field.title}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 size-full ${live ? "opacity-100" : "opacity-0"}`}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,color-mix(in_oklch,var(--background)_90%,transparent)_0%,color-mix(in_oklch,var(--background)_55%,transparent)_24%,color-mix(in_oklch,var(--background)_15%,transparent)_55%,transparent_100%)]" />
      <div
        className="water-caustic pointer-events-none absolute inset-0 mix-blend-soft-light dark:opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 42% 16% at 18% 28%, oklch(1 0 0 / 0.42), transparent 62%), radial-gradient(ellipse 28% 12% at 68% 48%, oklch(1 0 0 / 0.28), transparent 58%), radial-gradient(ellipse 46% 18% at 46% 78%, oklch(1 0 0 / 0.22), transparent 62%)",
          backgroundSize: "160% 160%",
        }}
      />
      <svg
        className="water-surface pointer-events-none absolute inset-x-0 bottom-[-1px] h-16 w-[200%] text-background"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 42C180 72 360 8 540 38C720 68 900 12 1080 40C1260 68 1380 28 1440 36V80H0Z"
        />
      </svg>
    </div>
  );
}
