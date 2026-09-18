export function CaseStudyVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-56 w-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="case-visual h-full w-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
