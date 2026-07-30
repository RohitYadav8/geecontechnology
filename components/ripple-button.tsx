"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function RippleButton({
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  name,
  value,
  form,
  formAction,
  formEncType,
  formMethod,
  formNoValidate,
  formTarget,
  autoFocus,
  id,
  title,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-disabled": ariaDisabled,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, ripple]);

    window.setTimeout(() => {
      setRipples((prev) =>
        prev.filter((item) => item.id !== ripple.id)
      );
    }, 600);

    onClick?.(e);
  };

  return (
    <motion.div
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className="inline-block"
    >
      <button
        type={type}
        disabled={disabled}
        onClick={handleClick}
        name={name}
        value={value}
        form={form}
        formAction={formAction}
        formEncType={formEncType}
        formMethod={formMethod}
        formNoValidate={formNoValidate}
        formTarget={formTarget}
        autoFocus={autoFocus}
        id={id}
        title={title}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-disabled={ariaDisabled}
        className={`relative overflow-hidden transition-all duration-300 ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        } ${className}`}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{
              width: 0,
              height: 0,
              opacity: 0.4,
            }}
            animate={{
              width: 400,
              height: 400,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute rounded-full bg-white"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    </motion.div>
  );
}