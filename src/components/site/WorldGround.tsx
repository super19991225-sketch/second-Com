export function WorldGround() {
  return (
    <div className="site-world pointer-events-none fixed inset-0 z-0 opacity-100" aria-hidden>
      <img
        src="/images/room-gallery.png?v=hall"
        alt=""
        className="stage-ken-soft absolute inset-0 size-full object-cover object-left opacity-100"
      />
    </div>
  );
}
