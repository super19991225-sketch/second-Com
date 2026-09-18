export function ScientificVisual() {
  return (
    <svg
      viewBox="0 0 480 280"
      className="h-auto w-full"
      role="img"
      aria-label="Abstract scientific visual with a waveform, orbit, and geometric mesh"
    >
      <rect width="480" height="280" fill="transparent" />
      <path
        d="M20 150 C60 90, 100 210, 140 150 S220 90, 260 150 S340 210, 380 150 S440 90, 460 140"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <ellipse
        cx="360"
        cy="88"
        rx="56"
        ry="22"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        transform="rotate(-18 360 88)"
      />
      <circle cx="360" cy="88" r="3" fill="currentColor" />
      <g stroke="currentColor" strokeOpacity="0.28" fill="none">
        <path d="M48 210 L88 186 L128 214 L168 188 L208 216" />
        <path d="M88 186 L108 160 L148 168 L168 188" />
        <path d="M128 214 L148 168 L188 176 L208 216" />
      </g>
    </svg>
  );
}
