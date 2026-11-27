"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Briefcase,
  Mail,
  Phone,
  Share2,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

/* =====================================================
   FACEBOOK ICON
===================================================== */

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

/* =====================================================
   LINKEDIN ICON
===================================================== */

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

/* =====================================================
   INSTAGRAM ICON
===================================================== */

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.3"
        cy="6.7"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/* =====================================================
   X / TWITTER ICON
===================================================== */

function TwitterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* =====================================================
   MENU ITEMS
===================================================== */

const menuItems = [
  {
    label: "Email",
    href: "mailto:info@geecontechnology.com",
    icon: Mail,
    external: false,
  },
  {
    label: "Call",
    href: "tel:8655263606",
    icon: Phone,
    external: false,
  },
  {
    label: "Careers",
    href: "/careers",
    icon: Briefcase,
    external: false,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/pages/Geecon-Systems-Pvt-Ltd/595625870489482",
    customIcon: FacebookIcon,
    external: true,
  },
  {
    label: "X",
    href: "https://x.com/geecongloballtd",
    customIcon: TwitterIcon,
    external: true,
  },
  {
    label: "Instagram",
    href: "#",
    customIcon: InstagramIcon,
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/geecon-systems-pvt-ltd/?originalSubdomain=in",
    customIcon: LinkedinIcon,
    external: true,
  },
];

/* =====================================================
   RADIAL POSITIONS

   IMPORTANT:
   Sabhi x values negative hain.
   Isliye koi icon right side se cut nahi hoga.
===================================================== */

const positions = [
  { x: -45, y: -150 },   // Email
  { x: -105, y: -125 },  // Call
  { x: -150, y: -80 },   // Careers
  { x: -175, y: -20 },   // Facebook
  { x: -165, y: 48 },    // X
  { x: -125, y: 105 },   // Instagram
  { x: -60, y: 135 },    // LinkedIn
];

/* =====================================================
   COMPONENT
===================================================== */

export function FloatingContactMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed right-8 top-[55%] z-[9999] -translate-y-1/2 sm:right-12"
    >
      {/* =================================================
          RADIAL MENU
      ================================================= */}

      <AnimatePresence>
        {open && (
          <div
            className="absolute right-8 top-8 h-0 w-0 overflow-visible"
          >
            {menuItems.map((item, index) => {
              const position = positions[index];

              const Icon = item.icon;
              const CustomIcon = item.customIcon;

              const button = (
                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0.25,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: position.x,
                    y: position.y,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.25,
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                    delay: index * 0.035,
                  }}
                  whileHover={{
                    scale: 1.12,
                  }}
                  className="group absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500 text-white shadow-[0_12px_32px_rgba(124,58,237,0.42)] transition-shadow duration-300 hover:shadow-[0_14px_38px_rgba(124,58,237,0.55)]"
                >
                  {/* LUCIDE ICON */}

                  {Icon && (
                    <Icon
                      size={18}
                      strokeWidth={2}
                    />
                  )}

                  {/* CUSTOM SOCIAL ICON */}

                  {CustomIcon && (
                    <CustomIcon />
                  )}

                  {/* =========================================
                      TOOLTIP
                  ========================================= */}

                  <span
                    className="pointer-events-none absolute right-[58px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-950/95 px-2.5 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100"
                  >
                    {item.label}
                  </span>
                </motion.span>
              );

              /* =============================================
                 EXTERNAL LINKS
              ============================================= */

              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="absolute left-0 top-0"
                  >
                    {button}
                  </a>
                );
              }

              /* =============================================
                 INTERNAL / EMAIL / PHONE
              ============================================= */

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  onClick={() => setOpen(false)}
                  className="absolute left-0 top-0"
                >
                  {button}
                </Link>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* =================================================
          MAIN OPEN / CLOSE BUTTON
      ================================================= */}

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileHover={{
          scale: 1.06,
        }}
        whileTap={{
          scale: 0.94,
        }}
        aria-label={
          open
            ? "Close contact menu"
            : "Open contact menu"
        }
        className="relative z-20 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-violet-600 via-violet-500 to-sky-400 text-white shadow-[0_15px_40px_rgba(124,58,237,0.48)] transition-shadow duration-300 hover:shadow-[0_18px_48px_rgba(124,58,237,0.58)]"
      >
        {/* ===============================================
            OUTER GLOW
        =============================================== */}

        <span
          className="pointer-events-none absolute inset-[-10px] -z-10 rounded-full bg-violet-500/15 blur-md"
        />

        {/* ===============================================
            ICON
        =============================================== */}

        <motion.span
          animate={{
            rotate: open ? 90 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          {open ? (
            <X size={27} />
          ) : (
            <Share2 size={24} />
          )}
        </motion.span>
      </motion.button>
    </div>
  );
}