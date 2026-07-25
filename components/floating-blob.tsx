"use client";

import { motion } from "motion/react";

interface FloatingBlobProps {
  className?: string;
  color?: string;
  duration?: number;
}

export function FloatingBlob({ className = "", color = "bg-blue-500/15", duration = 14 }: FloatingBlobProps) {
  return (
    <motion.div
      animate={{
        x: [0, 40, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.15, 0.95, 1],
        opacity: [0.5, 0.8, 0.5, 0.5],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none absolute rounded-full blur-3xl ${color} ${className}`}
    />
  );
}