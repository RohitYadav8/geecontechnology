"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function GlowButton({
  children,
  variant = "primary",
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
}) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      onClick={onClick}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      initial="rest"
      className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
        isPrimary
          ? "bg-white text-[#1a2b4a]"
          : "border border-white/30 text-white backdrop-blur-sm"
      }`}
    >
      {isPrimary && (
        <motion.span
          variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1.4 } }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/40 via-cyan-300/40 to-blue-400/40 blur-xl"
        />
      )}
      <span className="relative flex items-center gap-2">
        {children}
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
          transition={{ duration: 0.3 }}
          className="flex"
        >
          <ArrowRight size={16} />
        </motion.span>
      </span>
    </motion.button>
  );
}