"use client";

import React from "react";

/*
 * Plain button (kept under the old name so existing imports keep
 * working). The ripple / scale effects were removed for the
 * editorial design system: square, flat, no motion.
 */

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function RippleButton({
  children,
  className = "",
  disabled = false,
  type = "button",
  ...rest
}: RippleButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 transition-colors ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
