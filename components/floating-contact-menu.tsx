"use client";

import { useState } from "react";
import { Share2, X } from "lucide-react";

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
   SOCIAL LINKS
   Email, phone and careers are already in the header and
   footer, so this menu only holds the social profiles.
===================================================== */

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/geecon-systems-pvt-ltd/?originalSubdomain=in",
    Icon: LinkedinIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/pages/Geecon-Systems-Pvt-Ltd/595625870489482",
    Icon: FacebookIcon,
  },
  {
    label: "X",
    href: "https://x.com/geecongloballtd",
    Icon: TwitterIcon,
  },
];

/* =====================================================
   COMPONENT
===================================================== */

export function FloatingContactMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="site fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-px bg-transparent sm:bottom-8 sm:right-8">
      {open &&
        socialLinks.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-11 items-center gap-3 border border-line bg-paper px-3 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
              {label}
            </span>
            <Icon />
          </a>
        ))}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close social links" : "Open social links"}
        className="flex h-11 w-11 items-center justify-center bg-ink text-paper transition-colors hover:bg-accent hover:text-accent-ink"
      >
        {open ? <X size={18} /> : <Share2 size={17} />}
      </button>
    </div>
  );
}
