"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ChevronDown,
  ChevronRight,
  Cloud,
  Code2,
  Globe2,
  Mail,
  Menu,
  Phone,
  Search,
  Server,
  Settings,
  Share2,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import { ThemeToggle } from "./theme-toggle";

/* =========================================================
   NAVIGATION
========================================================= */

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
        icon: Globe2,
      },
      {
        label: "Customised Software Development",
        href: "/customised-software-development",
        icon: Code2,
      },
      {
        label: "VPS/Dedicated Servers",
        href: "/vps-dedicated-servers",
        icon: Server,
      },
      {
        label: "Cloud Services",
        href: "/cloud-services",
        icon: Cloud,
      },
      {
        label: "Social Media Marketing",
        href: "/social-media-marketing-services",
        icon: Share2,
      },
      {
        label: "Search Engine Optimization",
        href: "/search-engine-optimization",
        icon: Search,
      },
      {
        label: "Software Support & Maintenance",
        href: "/software-support-maintenance",
        icon: Settings,
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

/* =========================================================
   NAVBAR
========================================================= */

export function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [servicesOpen, setServicesOpen] =
    useState(false);

  const [
    mobileServicesOpen,
    setMobileServicesOpen,
  ] = useState(false);

  /* =======================================================
     SCROLL
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 30
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     CLOSE MENU AFTER ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const isRouteActive = (
    href: string
  ) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(
      href
    );
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/85 shadow-[0_8px_40px_-20px_rgba(15,23,42,.3)] backdrop-blur-2xl dark:border-white/[0.07] dark:bg-[#070c18]/85"
          : "border-b border-slate-200/40 bg-white/90 dark:border-white/[0.05] dark:bg-[#070c18]/90"
      }`}
    >
      {/* ===================================================
          UTILITY BAR
      =================================================== */}

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
            <div className="mx-auto flex max-w-7xl items-center justify-end px-6 py-2">
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

      {/* ===================================================
          MAIN NAVIGATION
      =================================================== */}

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled
            ? "py-3"
            : "py-4"
        }`}
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/"
          className="group flex items-center gap-3"
        >
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
              SIMPLE SOLUTIONS ENGINEERED
              FOR EXTREME
            </div>
          </div>
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map(
            (link) => {
              const active =
                isRouteActive(
                  link.href
                );

              /* =============================================
                 SERVICES
              ============================================= */

              if (link.children) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() =>
                      setServicesOpen(
                        true
                      )
                    }
                    onMouseLeave={() =>
                      setServicesOpen(
                        false
                      )
                    }
                  >
                    {/* SERVICES NAV LINK */}

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
                          servicesOpen
                            ? "rotate-180"
                            : ""
                        }`}
                      />

                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 ${
                          active
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>

                    {/* =======================================
                        PREMIUM SERVICES DROPDOWN
                    ======================================= */}

                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 12,
                            scale:
                              0.98,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 8,
                            scale:
                              0.985,
                          }}
                          transition={{
                            duration:
                              0.18,
                            ease: "easeOut",
                          }}
                          className="absolute left-1/2 top-full w-[430px] -translate-x-1/2 pt-4"
                        >
                          {/* INVISIBLE HOVER BRIDGE */}

                          <div className="absolute left-0 right-0 top-0 h-4" />

                          {/* DROPDOWN PANEL */}

                          <div className="relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/95 p-2.5 shadow-[0_24px_70px_-24px_rgba(15,23,42,0.35)] backdrop-blur-2xl dark:border-white/[0.09] dark:bg-[#0b1220]/95 dark:shadow-[0_28px_80px_-24px_rgba(0,0,0,0.7)]">
                            {/* SUBTLE BACKGROUND */}

                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/[0.08] blur-3xl" />

                            <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-cyan-400/[0.06] blur-3xl" />

                            {/* HEADER */}

                            <div className="relative mb-2 flex items-center justify-between border-b border-slate-100 px-3 pb-3 pt-2 dark:border-white/[0.06]">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                  Our Services
                                </p>

                                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                                  Explore our
                                  technology
                                  solutions
                                </p>
                              </div>

                              <Link
                                href="/services"
                                className="group/all flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                              >
                                View All

                                <ChevronRight
                                  size={
                                    14
                                  }
                                  className="transition-transform duration-200 group-hover/all:translate-x-0.5"
                                />
                              </Link>
                            </div>

                            {/* SERVICE LINKS */}

                            <div className="relative space-y-1">
                              {link.children.map(
                                (
                                  child,
                                  index
                                ) => {
                                  const childActive =
                                    pathname ===
                                    child.href;

                                  const Icon =
                                    child.icon;

                                  return (
                                    <motion.div
                                      key={
                                        child.label
                                      }
                                      initial={{
                                        opacity: 0,
                                        x: -6,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        x: 0,
                                      }}
                                      transition={{
                                        duration:
                                          0.2,
                                        delay:
                                          index *
                                          0.025,
                                      }}
                                    >
                                      <Link
                                        href={
                                          child.href
                                        }
                                        className={`group/item relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 transition-all duration-200 ${
                                          childActive
                                            ? "bg-blue-50 text-blue-700 dark:bg-blue-500/[0.12] dark:text-blue-300"
                                            : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/[0.05]"
                                        }`}
                                      >
                                        {/* LEFT ACTIVE/HOVER LINE */}

                                        <span
                                          className={`absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-gradient-to-b from-blue-500 to-cyan-400 transition-all duration-200 ${
                                            childActive
                                              ? "opacity-100"
                                              : "scale-y-50 opacity-0 group-hover/item:scale-y-100 group-hover/item:opacity-100"
                                          }`}
                                        />

                                        {/* ICON */}

                                        <span
                                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                                            childActive
                                              ? "border-blue-200 bg-white text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400"
                                              : "border-slate-200/80 bg-white text-slate-400 group-hover/item:border-blue-200 group-hover/item:text-blue-600 dark:border-white/[0.07] dark:bg-white/[0.035] dark:text-slate-500 dark:group-hover/item:border-blue-500/20 dark:group-hover/item:text-blue-400"
                                          }`}
                                        >
                                          <Icon
                                            size={
                                              16
                                            }
                                            strokeWidth={
                                              1.8
                                            }
                                          />
                                        </span>

                                        {/* LABEL */}

                                        <span className="min-w-0 flex-1 text-[13px] font-medium transition-colors group-hover/item:text-[#1a2b4a] dark:group-hover/item:text-white">
                                          {
                                            child.label
                                          }
                                        </span>

                                        {/* ARROW */}

                                        <ChevronRight
                                          size={
                                            15
                                          }
                                          className={`shrink-0 transition-all duration-200 ${
                                            childActive
                                              ? "translate-x-0 text-blue-600 dark:text-blue-400"
                                              : "-translate-x-1 text-slate-300 opacity-0 group-hover/item:translate-x-0 group-hover/item:text-blue-500 group-hover/item:opacity-100 dark:text-slate-600"
                                          }`}
                                        />
                                      </Link>
                                    </motion.div>
                                  );
                                }
                              )}
                            </div>

                            {/* BOTTOM ACCENT */}

                            <div className="relative mt-2 h-[2px] overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.05]">
                              <motion.div
                                initial={{
                                  x: "-100%",
                                }}
                                animate={{
                                  x: "0%",
                                }}
                                transition={{
                                  duration:
                                    0.6,
                                  ease: "easeOut",
                                }}
                                className="h-full w-1/3 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              /* =============================================
                 NORMAL NAV LINKS
              ============================================= */

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
                      active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            }
          )}
        </nav>

        {/* =================================================
            THEME + MOBILE BUTTON
        ================================================= */}

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                (previous) =>
                  !previous
              )
            }
            aria-label="Toggle navigation menu"
            aria-expanded={
              mobileOpen
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600 lg:hidden dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200"
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {/* ===================================================
          MOBILE NAVIGATION
      =================================================== */}

      <div
        className={`overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-2xl transition-[max-height] duration-500 lg:hidden dark:border-white/[0.05] dark:bg-[#070c18]/95 ${
          mobileOpen
            ? "max-h-[900px]"
            : "max-h-0 border-t-0"
        }`}
      >
        <nav className="px-5 py-4">
          {navLinks.map(
            (link) => {
              const active =
                isRouteActive(
                  link.href
                );

              /* =============================================
                 MOBILE SERVICES
              ============================================= */

              if (link.children) {
                return (
                  <div
                    key={link.label}
                    className="border-b border-slate-100 py-2 dark:border-white/[0.05]"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={
                          link.href
                        }
                        className={`flex-1 py-2 text-sm font-semibold ${
                          active
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {
                          link.label
                        }
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          setMobileServicesOpen(
                            (
                              previous
                            ) =>
                              !previous
                          )
                        }
                        aria-label="Toggle services"
                        aria-expanded={
                          mobileServicesOpen
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-blue-400"
                      >
                        <ChevronDown
                          size={17}
                          className={`transition-transform duration-300 ${
                            mobileServicesOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* MOBILE SUBMENU */}

                    <div
                      className={`grid transition-all duration-300 ${
                        mobileServicesOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="mb-2 mt-1 space-y-1 rounded-2xl border border-slate-100 bg-slate-50/70 p-2 dark:border-white/[0.06] dark:bg-white/[0.025]">
                          {link.children.map(
                            (
                              child
                            ) => {
                              const Icon =
                                child.icon;

                              const childActive =
                                pathname ===
                                child.href;

                              return (
                                <Link
                                  key={
                                    child.label
                                  }
                                  href={
                                    child.href
                                  }
                                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                                    childActive
                                      ? "bg-white text-blue-600 shadow-sm dark:bg-white/[0.06] dark:text-blue-400"
                                      : "text-slate-600 hover:bg-white hover:text-blue-600 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
                                  }`}
                                >
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition group-hover:border-blue-200 group-hover:text-blue-600 dark:border-white/[0.07] dark:bg-white/[0.035] dark:text-slate-500 dark:group-hover:text-blue-400">
                                    <Icon
                                      size={
                                        15
                                      }
                                    />
                                  </span>

                                  <span className="flex-1">
                                    {
                                      child.label
                                    }
                                  </span>

                                  <ChevronRight
                                    size={
                                      14
                                    }
                                    className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500"
                                  />
                                </Link>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              /* =============================================
                 MOBILE NORMAL LINKS
              ============================================= */

              return (
                <div
                  key={link.label}
                  className="border-b border-slate-100 py-2 last:border-none dark:border-white/[0.05]"
                >
                  <Link
                    href={
                      link.href
                    }
                    className={`block py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-white"
                    }`}
                  >
                    {
                      link.label
                    }
                  </Link>
                </div>
              );
            }
          )}
        </nav>
      </div>
    </header>
  );
}