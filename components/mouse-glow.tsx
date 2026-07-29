"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

/**
 * Wraps content with a radial glow that follows the mouse.
 * Unlike TiltCard, this doesn't rotate the content — useful for
 * forms and text-heavy sections where a 3D tilt would feel odd.
 */
export function MouseGlow({ children, className = "" }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const glowX = useTransform(x, [0, 1], ["0%", "100%"]);
    const glowY = useTransform(y, [0, 1], ["0%", "100%"]);
    const background = useTransform([glowX, glowY], ([gx, gy]: string[]) =>
        `radial-gradient(320px circle at ${gx} ${gy}, rgba(59,130,246,0.14), transparent 70%)`
    );

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    return (
        <div ref={ref} onMouseMove={handleMouseMove} className={`group relative ${className}`}>
            <motion.div
                style={{ background }}
                className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}
