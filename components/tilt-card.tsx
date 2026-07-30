"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import type { ReactNode, MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({
  children,
  className = "",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [6, -6]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-6, 6]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  const glowX = useTransform(
    x,
    [-0.5, 0.5],
    ["0%", "100%"]
  );

  const glowY = useTransform(
    y,
    [-0.5, 0.5],
    ["0%", "100%"]
  );

  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(
        280px circle at ${gx} ${gy},
        rgba(59,130,246,0.18),
        transparent 70%
      )`
  );

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    x.set(
      (e.clientX - rect.left) / rect.width - 0.5
    );

    y.set(
      (e.clientY - rect.top) / rect.height - 0.5
    );
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      className={`relative group ${className}`}
    >
      {/* Mouse-following glow */}
      <motion.div
        style={{
          background: glowBackground,
        }}
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Content */}
      {children}
    </motion.div>
  );
}