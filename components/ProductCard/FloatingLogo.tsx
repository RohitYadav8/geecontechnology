"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface FloatingLogoProps {
  src?: string;
  alt: string;
  logoText?: string;
  size?: number;
}

/**
 * Continuously floats the product logo up/down.
 * Falls back to logoText (initials) if no image is provided —
 * matches the existing behaviour in products-data.
 */
export default function FloatingLogo({ src, alt, logoText, size = 120 }: FloatingLogoProps) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="flex h-full w-full items-center justify-center"
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="h-24 w-24 object-contain"
        />
      ) : (
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{logoText}</span>
      )}
    </motion.div>
  );
}
