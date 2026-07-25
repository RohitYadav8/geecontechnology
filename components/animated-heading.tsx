"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";

export function AnimatedHeading({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.3em] align-top">
          <motion.span
            initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
            whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}