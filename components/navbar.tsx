"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Mail, Phone, ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "../components/theme-toggle";

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

function TwitterIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const navLinks = [
  { label: "HOME", href: "/" },
  {
    label: "SERVICES",
    href: "/services",
    children: [
      { label: "Website Development", href: "/website-development" },
      { label: "Customised Software Development", href: "/customised-software-development" },
      { label: "VPS/Dedicated Servers", href: "/vps-dedicated-servers" },
      { label: "Cloud Services", href: "/cloud-services" },
      { label: "Social Media Marketing", href: "/social-media-marketing-services" },
      { label: "Search Engine Optimization", href: "/search-engine-optimization" },
      { label: "Software Support & Maintenance", href: "/software-support-maintenance" },
    ],
  },
  { label: "PRODUCTS", href: "/products" },
  { label: "CLIENTELE & ENGAGEMENT", href: "/clientele-engagement" },
  { label: "CAREERS", href: "/careers" },
  { label: "CONTACT US", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0)",
        boxShadow: scrolled ? "0 8px 30px rgba(15,23,42,0.08)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`sticky top-0 z-50 w-full border-b transition-[border-color] duration-500 dark:bg-slate-950/0 ${
        scrolled
          ? "border-slate-200/70 backdrop-blur-xl dark:border-slate-800/70 dark:!bg-slate-950/75"
          : "border-transparent dark:!bg-slate-950/0"
      }`}
    >
      {/* Top utility bar */}
      <motion.div
        animate={{ height: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="hidden overflow-hidden border-b border-slate-100 bg-slate-50/60 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400 md:block"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-3.5">
            <a href="#" aria-label="Facebook" className="text-slate-400 transition-colors duration-200 hover:text-[#1a2b4a] dark:text-slate-500 dark:hover:text-white">
              <FacebookIcon size={14} />
            </a>
            <a href="#" aria-label="Twitter" className="text-slate-400 transition-colors duration-200 hover:text-[#1a2b4a] dark:text-slate-500 dark:hover:text-white">
              <TwitterIcon size={14} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-slate-400 transition-colors duration-200 hover:text-[#1a2b4a] dark:text-slate-500 dark:hover:text-white">
              <LinkedinIcon size={14} />
            </a>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/candidate-screening" className="font-medium text-slate-500 transition-colors duration-200 hover:text-[#1a2b4a] dark:text-slate-400 dark:hover:text-white">
              Candidate Screening
            </Link>
            <Link href="/careers" className="font-medium text-slate-500 transition-colors duration-200 hover:text-[#1a2b4a] dark:text-slate-400 dark:hover:text-white">
              Apply Current Openings
            </Link>
            <a href="mailto:info@geecontechnology.com" className="flex items-center gap-1.5 font-medium text-slate-500 transition-colors duration-200 hover:text-[#1a2b4a] dark:text-slate-400 dark:hover:text-white">
              <Mail size={13} /> info@geecontechnology.com
            </a>
            <a href="tel:8655263606" className="flex items-center gap-1.5 font-medium text-slate-500 transition-colors duration-200 hover:text-[#1a2b4a] dark:text-slate-400 dark:hover:text-white">
              <Phone size={13} /> 8655263606
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main nav */}
      <motion.div
        animate={{ paddingTop: scrolled ? 10 : 14, paddingBottom: scrolled ? 10 : 14 }}
        transition={{ duration: 0.35 }}
        className="mx-auto flex max-w-7xl items-center justify-between px-6"
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/logo-icon-1.png"
            alt="Geecon Technology"
            width={44}
            height={40}
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="leading-tight">
            <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              GEECON
            </div>
            <div className="text-[9px] font-medium tracking-wide text-slate-400 dark:text-slate-500">
              SIMPLE SOLUTIONS ENGINEERED FOR EXTREME
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  className="group relative flex items-center gap-1 py-2 text-sm font-semibold text-slate-800 transition-colors duration-200 hover:text-[#1a2b4a] dark:text-slate-200 dark:hover:text-white"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-[#1a2b4a] transition-all duration-300 ease-out group-hover:w-full dark:bg-white" />
                </Link>

                <div
                  className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    servicesOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white/95 py-2 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50 hover:text-[#1a2b4a] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="group relative py-2 text-sm font-semibold text-slate-800 transition-colors duration-200 hover:text-[#1a2b4a] dark:text-slate-200 dark:hover:text-white"
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#1a2b4a] transition-all duration-300 ease-out dark:bg-white ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl transition-[max-height] duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950/95 lg:hidden ${
          mobileOpen ? "max-h-[600px]" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="px-6 py-4">
          {navLinks.map((link) => (
            <div key={link.label} className="border-b border-slate-50 py-3 last:border-0 dark:border-slate-900">
              <Link
                href={link.href}
                className="block text-sm font-semibold text-slate-800 transition-colors duration-200 dark:text-slate-200"
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="mt-2.5 flex flex-col gap-2.5 pl-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="text-sm text-slate-500 transition-colors duration-200 hover:text-[#1a2b4a] dark:text-slate-400 dark:hover:text-white"
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
    </motion.header>
  );
}