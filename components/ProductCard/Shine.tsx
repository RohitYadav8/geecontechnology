/**
 * Light-sweep shine effect. Pure CSS/Tailwind, no JS needed —
 * triggers off the same group-hover/card scope as the flip card,
 * so it fires whenever the outer ProductCard is hovered.
 */
export default function Shine() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-white/20 transition-all duration-700 group-hover/card:left-[160%]" />
    </div>
  );
}
