"use client";

import {
  useRef,
  type PointerEvent,
  type ReactNode,
} from "react";

type MouseGlowProps = {
  children: ReactNode;
  className?: string;
};

export function MouseGlow({
  children,
  className = "",
}: MouseGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const element = containerRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    element.style.setProperty(
      "--mouse-x",
      `${x}px`
    );

    element.style.setProperty(
      "--mouse-y",
      `${y}px`
    );
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`group relative ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.16), rgba(59,130,246,0.06) 35%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}