"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ThemeToggle } from "./theme-toggle";

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

function TwitterIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = {
  facebook:
    "https://www.facebook.com/pages/Geecon-Systems-Pvt-Ltd/595625870489482",
  twitter: "https://x.com/geecongloballtd",
  linkedin:
    "https://www.linkedin.com/company/geecon-systems-pvt-ltd/?originalSubdomain=in",
};

const navLinks = [
  {
    label: "HOME",
    href: "/",
  },
  {
    label: "SERVICES",
    href: "/services",
    children: [
      {
        label: "Website Development",
        href: "/website-development",
      },
      {
        label: "Customised Software Development",
        href: "/customised-software-development",
      },
      {
        label: "VPS/Dedicated Servers",
        href: "/vps-dedicated-servers",
      },
      {
        label: "Cloud Services",
        href: "/cloud-services",
      },
      {
        label: "Social Media Marketing",
        href: "/social-media-marketing-services",
      },
      {
        label: "Search Engine Optimization",
        href: "/search-engine-optimization",
      },
      {
        label: "Software Support & Maintenance",
        href: "/software-support-maintenance",
      },
    ],
  },
  {
    label: "PRODUCTS",
    href: "/products",
  },
  {
    label: "CLIENTELE & ENGAGEMENT",
    href: "/clientele-engagement",
  },
  {
    label: "CAREERS",
    href: "/careers",
  },
  {
    label: "CONTACT US",
    href: "/contact",
  },
];

export function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Normal browser scroll listener.
  // Initial server + client render both start with scrolled = false.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isRouteActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/85 shadow-[0_8px_40px_-20px_rgba(15,23,42,.3)] backdrop-blur-2xl dark:border-white/[0.07] dark:bg-[#070c18]/85"
          : "border-b border-slate-200/40 bg-white/90 dark:border-white/[0.05] dark:bg-[#070c18]/90"
      }`}
    >
      {/* Utility Bar */}
      <AnimatePresence initial={false}>
        {!scrolled && (
          <motion.div
            initial={false}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="hidden overflow-hidden border-b border-slate-100 bg-slate-50/80 text-xs text-slate-500 md:block dark:border-white/[0.05] dark:bg-white/[0.025] dark:text-slate-400"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
              <div className="flex items-center gap-4">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <FacebookIcon />
                </a>

                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <TwitterIcon />
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <LinkedinIcon />
                </a>
              </div>

              <div className="flex items-center gap-6">
                <Link
                  href="/candidate-screening"
                  className="transition-colors hover:text-[#1a2b4a] dark:hover:text-white"
                >
                  Candidate Screening
                </Link>

                <Link
                  href="/careers"
                  className="transition-colors hover:text-[#1a2b4a] dark:hover:text-white"
                >
                  Apply Current Openings
                </Link>

                <a
                  href="mailto:info@geecontechnology.com"
                  className="flex items-center gap-1.5 transition-colors hover:text-[#1a2b4a] dark:hover:text-white"
                >
                  <Mail size={13} />
                  info@geecontechnology.com
                </a>

                <a
                  href="tel:8655263606"
                  className="flex items-center gap-1.5 transition-colors hover:text-[#1a2b4a] dark:hover:text-white"
                >
                  <Phone size={13} />
                  8655263606
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 scale-150 rounded-full bg-blue-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

            <Image
              src="/logo-icon-1.png"
              alt="Geecon Technology"
              width={46}
              height={42}
              priority
              className="relative h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="leading-tight">
            <div className="text-[22px] font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
              GEECON
            </div>

            <div className="text-[8px] font-semibold tracking-[0.13em] text-slate-400 dark:text-slate-500">
              SIMPLE SOLUTIONS ENGINEERED FOR EXTREME
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = isRouteActive(link.href);

            if (link.children) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`group relative flex items-center gap-1 py-2 text-[13px] font-semibold tracking-[0.02em] transition-colors ${
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    {link.label}

                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />

                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>

                  {/* Services Dropdown */}
                  <div
                    className={`absolute left-1/2 top-full w-[290px] -translate-x-1/2 pt-4 transition-all duration-200 ${
                      servicesOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_25px_70px_-25px_rgba(15,23,42,.35)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#0b1220]/95 dark:shadow-black/40">
                      {link.children.map((child) => {
                        const childActive = pathname === child.href;

                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block rounded-xl px-4 py-3 text-sm transition-all ${
                              childActive
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                                : "text-slate-600 hover:bg-slate-50 hover:text-[#1a2b4a] dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`group relative py-2 text-[13px] font-semibold tracking-[0.02em] transition-colors ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {link.label}

                <span
                  className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Theme + Mobile Menu */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600 lg:hidden dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-2xl transition-[max-height] duration-300 lg:hidden dark:border-white/[0.05] dark:bg-[#070c18]/95 ${
          mobileOpen ? "max-h-[700px]" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="px-6 py-4">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="border-b border-slate-100 py-3 last:border-none dark:border-white/[0.05]"
            >
              <Link
                href={link.href}
                className={`text-sm font-semibold ${
                  isRouteActive(link.href)
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-800 dark:text-slate-200"
                }`}
              >
                {link.label}
              </Link>

              {link.children && (
                <div className="mt-3 flex flex-col gap-1 pl-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="rounded-lg px-2 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}