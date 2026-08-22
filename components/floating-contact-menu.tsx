"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Briefcase,
  Mail,
  Phone,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

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
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
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

const items = [
  {
    label: "Email",
    href: "mailto:info@geecontechnology.com",
    icon: Mail,
  },
  {
    label: "Call",
    href: "tel:8655263606",
    icon: Phone,
  },
  {
    label: "Careers",
    href: "/careers",
    icon: Briefcase,
  },
];

export function FloatingContactMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 12,
            }}
            className="absolute bottom-20 right-0 flex flex-col items-end gap-3"
          >
            {items.map(
              ({ label, href, icon: Icon }, index) => (
                <motion.div
                  key={label}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                >
                  <Link
                    href={href}
                    className="group flex items-center gap-2"
                  >
                    <span className="rounded-full bg-slate-950/90 px-3 py-1.5 text-xs text-white shadow-lg backdrop-blur">
                      {label}
                    </span>

                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={18} />
                    </span>
                  </Link>
                </motion.div>
              )
            )}

            <a
              href="https://www.facebook.com/pages/Geecon-Systems-Pvt-Ltd/595625870489482"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg"
            >
              <FacebookIcon />
            </a>

            <a
              href="https://x.com/geecongloballtd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg"
            >
              <TwitterIcon />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://www.linkedin.com/company/geecon-systems-pvt-ltd/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg"
            >
              <LinkedinIcon />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() =>
          setOpen((value) => !value)
        }
        whileTap={{
          scale: 0.95,
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-xl shadow-violet-500/30"
        aria-label={
          open
            ? "Close contact menu"
            : "Open contact menu"
        }
      >
        <motion.span
          animate={{
            rotate: open ? 90 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          {open ? (
            <X size={22} />
          ) : (
            <Phone size={21} />
          )}
        </motion.span>
      </motion.button>
    </div>
  );
}