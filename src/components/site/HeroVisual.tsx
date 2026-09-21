export function HeroVisual() {
  return (
    <div
      className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card"
      role="img"
      aria-label="Editorial composition of a product dashboard, mathematical notation, a waveform, and abstract model nodes"
    >
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
        <rect width="400" height="400" fill="oklch(0.995 0.006 90)" />
        <rect
          x="28"
          y="36"
          width="220"
          height="148"
          rx="10"
          fill="oklch(0.97 0.012 90)"
          stroke="oklch(0.9 0.015 85)"
        />
        <rect x="44" y="56" width="72" height="8" rx="4" fill="oklch(0.45 0.17 264)" />
        <rect x="44" y="76" width="188" height="6" rx="3" fill="oklch(0.9 0.015 85)" />
        <rect x="44" y="92" width="150" height="6" rx="3" fill="oklch(0.9 0.015 85)" />
        <polyline
          points="44,150 70,132 96,140 122,118 148,126 174,108 210,120"
          fill="none"
          stroke="oklch(0.45 0.17 264)"
          strokeWidth="2"
        />
        <circle
          cx="310"
          cy="78"
          r="38"
          fill="none"
          stroke="oklch(0.45 0.1 300)"
          strokeWidth="1.5"
        />
        <circle cx="310" cy="78" r="3" fill="oklch(0.45 0.17 264)" />
        <path
          d="M272 78 Q310 40 348 78"
          fill="none"
          stroke="oklch(0.45 0.17 264)"
          strokeWidth="1.25"
        />
        <text x="36" y="230" fill="oklch(0.24 0.05 260)" fontSize="18" fontFamily="Georgia, serif">
          ∇ · E = ρ / ε₀
        </text>
        <text x="36" y="258" fill="oklch(0.45 0.03 260)" fontSize="14" fontFamily="Georgia, serif">
          f(x) = Σ wᵢ φᵢ(x)
        </text>
        <g stroke="oklch(0.45 0.17 264)" strokeWidth="1.2">
          <circle cx="86" cy="318" r="8" fill="oklch(0.45 0.17 264 / 0.15)" />
          <circle cx="136" cy="302" r="8" fill="oklch(0.45 0.17 264 / 0.15)" />
          <circle cx="136" cy="338" r="8" fill="oklch(0.45 0.17 264 / 0.15)" />
          <circle cx="192" cy="320" r="8" fill="oklch(0.45 0.17 264 / 0.15)" />
          <line x1="94" y1="318" x2="128" y2="306" />
          <line x1="94" y1="318" x2="128" y2="334" />
          <line x1="144" y1="302" x2="184" y2="316" />
          <line x1="144" y1="338" x2="184" y2="324" />
        </g>
        <rect x="250" y="250" width="118" height="110" rx="10" fill="oklch(0.45 0.17 264 / 0.08)" />
        <rect x="266" y="270" width="18" height="58" rx="3" fill="oklch(0.45 0.17 264 / 0.45)" />
        <rect x="292" y="292" width="18" height="36" rx="3" fill="oklch(0.45 0.1 300 / 0.45)" />
        <rect x="318" y="280" width="18" height="48" rx="3" fill="oklch(0.45 0.17 264 / 0.7)" />
      </svg>
    </div>
  );
}
