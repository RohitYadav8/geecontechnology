"use client";

import { motion, useInView } from "motion/react";
import { Fragment, useRef, type ElementType } from "react";

export function AnimatedHeading({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
  highlightFrom,
  highlightClassName = "",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: ElementType;
  /** Word index from which words get `highlightClassName`. */
  highlightFrom?: number;
  highlightClassName?: string;
}) {
  const words = text.split(" ");

  // Observe the whole heading: the individual words start translated
  // out of their overflow-hidden wrappers, so they never intersect.
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="inline-block overflow-hidden pb-1 align-top">
            <motion.span
              initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
              animate={
                inView
                  ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                  : undefined
              }
              transition={{
                duration: 0.6,
                delay: delay + i * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className={`inline-block ${
                highlightFrom !== undefined && i >= highlightFrom
                  ? highlightClassName
                  : ""
              }`}
            >
              {word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
