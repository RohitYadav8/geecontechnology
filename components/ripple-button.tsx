"use client";

import { useState } from "react";
import type { ReactNode, MouseEvent } from "react";

interface Ripple {
    id: number;
    x: number;
    y: number;
    size: number;
}

interface RippleButtonProps {
    children: ReactNode;
    className?: string;
    type?: "button" | "submit";
    /** Use "div" when nesting inside a Link (avoids invalid <button> inside <a>). */
    as?: "button" | "div";
    onClick?: () => void;
}

export function RippleButton({
    children,
    className = "",
    type = "button",
    as = "button",
    onClick,
}: RippleButtonProps) {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const addRipple = (e: MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const id = Date.now();
        setRipples((prev) => [...prev, { id, x, y, size }]);
        window.setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
    };

    const sharedClassName = `relative overflow-hidden transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97] ${className}`;

    const content = (
        <>
            <style>{`
        @keyframes geecon-ripple {
          from { transform: scale(0); opacity: 0.55; }
          to { transform: scale(1); opacity: 0; }
        }
      `}</style>
            {ripples.map((r) => (
                <span
                    key={r.id}
                    className="pointer-events-none absolute rounded-full bg-white/50"
                    style={{
                        left: r.x,
                        top: r.y,
                        width: r.size,
                        height: r.size,
                        animation: "geecon-ripple 0.6s ease-out",
                    }}
                />
            ))}
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        </>
    );

    if (as === "div") {
        return (
            <div
                onClick={(e) => {
                    addRipple(e);
                    onClick?.();
                }}
                className={sharedClassName}
            >
                {content}
            </div>
        );
    }

    return (
        <button
            type={type}
            onClick={(e) => {
                addRipple(e);
                onClick?.();
            }}
            className={sharedClassName}
        >
            {content}
        </button>
    );
}
