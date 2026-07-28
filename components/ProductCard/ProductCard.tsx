"use client";

import { ReactNode } from "react";
import { TiltCard } from "../tilt-card";

interface ProductCardProps {
  /** Your existing card content — e.g. the current Flip Card markup. */
  children: ReactNode;
  className?: string;
}

/**
 * Thin semantic wrapper around the existing TiltCard.
 * Reuses your tilt-card.tsx (mouse tilt + cursor glow) as-is,
 * so Phase 2+ (FloatingLogo, Shine, animated border) can layer
 * on top of this one file without touching TiltCard.
 */
export default function ProductCard({ children, className = "" }: ProductCardProps) {
  return <TiltCard className={className}>{children}</TiltCard>;
}
