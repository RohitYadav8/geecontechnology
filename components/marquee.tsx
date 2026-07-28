interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for one full loop
}

/**
 * Infinite horizontal scroll of items. Self-contained CSS keyframes
 * (scoped via a unique animation name) so it doesn't depend on
 * tailwind.config having a marquee animation predefined.
 */
export function Marquee({ items, speed = 24 }: MarqueeProps) {
  const loopItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <style>{`
        @keyframes geecon-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex w-max items-center gap-12"
        style={{ animation: `geecon-marquee ${speed}s linear infinite` }}
      >
        {loopItems.map((item, i) => (
          <span
            key={i}
            className="text-2xl font-bold uppercase tracking-widest text-slate-300 dark:text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
