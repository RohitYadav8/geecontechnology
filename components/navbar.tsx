"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";

import { contactInfo, primaryNav, siteMap } from "../lib/site-nav";
import { ThemeToggle } from "./theme-toggle";

/* =========================================================
   SITE HEADER
   A thin bar with a few primary links and an "Index" button
   that opens a full-screen site map. No dropdowns.
========================================================= */

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  // Close the index when the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll and allow Escape while the index is open
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="site sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center gap-6 px-5 sm:px-8 lg:h-[72px] lg:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Geecon Technology home"
          >
            <Image
              src="/logo-icon-1.png"
              alt=""
              width={34}
              height={32}
              priority
              className="h-8 w-auto"
            />
            <span className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
              Geecon
            </span>
          </Link>

          {/* Primary links */}
          <nav
            aria-label="Primary"
            className="ml-6 hidden items-center gap-7 lg:flex"
          >
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[14px] font-medium transition-colors hover:text-ink ${
                  isActive(link.href) ? "text-ink" : "text-muted"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-[25px] left-0 h-[2px] w-full bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 bg-accent px-4 py-2.5 text-[13px] font-semibold text-accent-ink transition-colors hover:bg-ink hover:text-paper sm:inline-flex"
            >
              Start a project
              <ArrowUpRight size={15} />
            </Link>

            <ThemeToggle variant="line" />

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-index"
              className="flex h-9 items-center gap-2 border border-line px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
            >
              <span className="flex flex-col gap-[3px]" aria-hidden>
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
              Index
            </button>
          </div>
        </div>
      </header>

      {/* ================= FULL-SCREEN INDEX ================= */}
      {open && (
        <div
          id="site-index"
          role="dialog"
          aria-modal="true"
          aria-label="Site index"
          className="site fixed inset-0 z-[70] overflow-y-auto"
        >
          <div className="mx-auto flex min-h-full w-full max-w-[1320px] flex-col px-5 sm:px-8 lg:px-12">
            <div className="flex h-16 items-center justify-between border-b border-line lg:h-[72px]">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Index
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 items-center gap-2 border border-ink px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <X size={14} />
                Close
              </button>
            </div>

            <Link
              href="/"
              className="group flex items-baseline justify-between border-b border-line py-6"
            >
              <span className="font-display text-4xl font-semibold text-ink transition-colors group-hover:text-accent sm:text-6xl">
                Home
              </span>
              <ArrowUpRight className="text-muted group-hover:text-accent" />
            </Link>

            <div className="grid flex-1 gap-x-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
              {siteMap.map((group) => (
                <div key={group.title} className="mb-10">
                  {group.href ? (
                    <Link
                      href={group.href}
                      className="group flex items-center gap-2 border-b border-ink pb-3 font-display text-2xl font-semibold text-ink"
                    >
                      {group.title}
                      <ArrowUpRight
                        size={18}
                        className="text-muted group-hover:text-accent"
                      />
                    </Link>
                  ) : (
                    <p className="border-b border-ink pb-3 font-display text-2xl font-semibold text-ink">
                      {group.title}
                    </p>
                  )}

                  <ul className="mt-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block border-b border-line py-2.5 text-[15px] transition-colors hover:text-accent ${
                            pathname === link.href
                              ? "text-accent"
                              : "text-ink-2"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-line py-6 font-mono text-[12px] text-muted">
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-ink"
              >
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phone}`} className="hover:text-ink">
                {contactInfo.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
