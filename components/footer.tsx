"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Briefcase,
  ChevronRight,
  Link2,
  Package,
  Phone,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";

import { footerLinks } from "../lib/home-data";

import { AnimateIn } from "./animate-in";
import {
  StaggerContainer,
  StaggerItem,
} from "./stagger-container";

/* =========================================================
   FOOTER COLUMN CONFIG
========================================================= */

const columnIcons = {
  services: Briefcase,
  products: Package,
  about: User,
  popular: Link2,
};

const columnTitles = {
  services: "Services",
  products: "Products & Solutions",
  about: "About Geecon",
  popular: "Popular Links",
};

/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({
  columnKey,
  links,
}: {
  columnKey: keyof typeof columnIcons;
  links: {
    label: string;
    href: string;
  }[];
}) {
  const Icon = columnIcons[columnKey];

  return (
    <div className="min-w-0">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-sm dark:border-blue-500/15 dark:from-blue-500/10 dark:to-cyan-500/5 dark:text-blue-400">
          <Icon size={16} strokeWidth={1.7} />
        </div>

        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
            {columnTitles[columnKey]}
          </h4>

          <span className="mt-2 block h-[2px] w-7 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
        </div>
      </div>

      <ul className="mt-4 space-y-1">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex min-w-0 items-start justify-between gap-3 rounded-lg px-2 py-1.5 text-[13px] text-slate-500 transition-all duration-200 hover:bg-blue-50/70 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
            >
              <span className="min-w-0 break-words leading-5">
                {link.label}
              </span>

              <ChevronRight
                size={12}
                className="mt-1 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-500 dark:text-slate-700 dark:group-hover:text-blue-400"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

export function Footer() {
  const [email, setEmail] = useState("");

  const [
    newsletterLoading,
    setNewsletterLoading,
  ] = useState(false);

  const [
    newsletterMessage,
    setNewsletterMessage,
  ] = useState("");

  const [
    newsletterError,
    setNewsletterError,
  ] = useState("");

  /* =======================================================
     NEWSLETTER SUBMIT
  ======================================================= */

  const handleNewsletterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    setNewsletterMessage("");
    setNewsletterError("");

    if (!cleanEmail) {
      setNewsletterError(
        "Please enter your email address."
      );

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setNewsletterError(
        "Please enter a valid email address."
      );

      return;
    }

    try {
      setNewsletterLoading(true);

      const response = await fetch(
        "/api/newsletter",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: cleanEmail,
          }),
        }
      );

      const text = await response.text();

      let data: {
        success?: boolean;
        message?: string;
        error?: string;
      } = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          console.error(
            "Invalid newsletter API response:",
            text
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Subscription failed. Please try again."
        );
      }

      setNewsletterMessage(
        data.message ||
          "Thank you for subscribing!"
      );

      setEmail("");
    } catch (error) {
      console.error(
        "Newsletter subscribe error:",
        error
      );

      setNewsletterError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-[#f8fbff] text-slate-500 dark:border-white/[0.06] dark:bg-[#050914] dark:text-slate-400">
      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(59,130,246,0.08),transparent_25%),radial-gradient(circle_at_88%_22%,rgba(124,58,237,0.06),transparent_28%)] dark:bg-[radial-gradient(circle_at_10%_15%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_88%_20%,rgba(124,58,237,0.09),transparent_28%)]" />

      <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 opacity-30 [background-image:radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] dark:opacity-10" />

      <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* ================================================= */}
        {/* MAIN FOOTER */}
        {/* ================================================= */}

        <div className="grid gap-8 py-9 sm:py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 lg:py-12 xl:grid-cols-[280px_minmax(0,1fr)]">
          {/* ================================================= */}
          {/* COMPANY + NEWSLETTER */}
          {/* ================================================= */}

          <AnimateIn direction="left">
            <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-5 shadow-[0_12px_35px_-28px_rgba(15,23,42,0.5)] backdrop-blur-xl lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:border-white/[0.07] dark:bg-white/[0.03] lg:dark:bg-transparent">
              {/* Logo */}

              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <Image
                  src="/logo-icon-1.png"
                  alt="Geecon Technology"
                  width={45}
                  height={42}
                  className="h-9 w-auto"
                />

                <div className="leading-tight">
                  <div className="text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">
                    GEECON
                  </div>

                  <div className="text-[8px] font-semibold tracking-[0.22em] text-blue-600 dark:text-blue-400">
                    TECHNOLOGY
                  </div>
                </div>
              </Link>

              {/* Description */}

              <p className="mt-4 max-w-sm text-[13px] leading-6 text-slate-500 dark:text-slate-400">
                Delivering innovative technology
                solutions that help businesses grow,
                transform and succeed in the digital
                world.
              </p>

              {/* ================================================= */}
              {/* STAY UPDATED */}
              {/* ================================================= */}

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
                  Stay Updated
                </h4>

                <p className="mt-1.5 text-[13px] leading-5 text-slate-500 dark:text-slate-400">
                  Subscribe to our newsletter for the
                  latest updates and insights.
                </p>

                <form
                  onSubmit={
                    handleNewsletterSubmit
                  }
                  className={`mt-3 flex w-full max-w-[250px] items-center gap-1 rounded-lg border bg-white p-1 shadow-sm transition-all dark:bg-white/[0.04] ${
                    newsletterError
                      ? "border-red-400 focus-within:border-red-500 dark:border-red-500/50"
                      : newsletterMessage
                        ? "border-emerald-400 focus-within:border-emerald-500 dark:border-emerald-500/40"
                        : "border-slate-200 focus-within:border-blue-400 dark:border-white/[0.08]"
                  }`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(
                        event.target.value
                      );

                      if (
                        newsletterError
                      ) {
                        setNewsletterError(
                          ""
                        );
                      }

                      if (
                        newsletterMessage
                      ) {
                        setNewsletterMessage(
                          ""
                        );
                      }
                    }}
                    placeholder="Enter your email"
                    disabled={
                      newsletterLoading
                    }
                    autoComplete="email"
                    aria-label="Email address"
                    className="min-w-0 flex-1 bg-transparent px-2.5 py-1.5 text-[13px] text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60 dark:text-white dark:placeholder:text-slate-600"
                  />

                  <button
                    type="submit"
                    disabled={
                      newsletterLoading
                    }
                    aria-label={
                      newsletterLoading
                        ? "Subscribing"
                        : "Subscribe"
                    }
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {newsletterLoading ? (
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    ) : (
                      <Send size={13} />
                    )}
                  </button>
                </form>

                {/* Success */}

                {newsletterMessage && (
                  <div
                    role="status"
                    className="mt-2 flex max-w-[250px] items-start gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
                  >
                    <span>✓</span>

                    <span>
                      {
                        newsletterMessage
                      }
                    </span>
                  </div>
                )}

                {/* Error */}

                {newsletterError && (
                  <p
                    role="alert"
                    className="mt-2 max-w-[250px] text-[11px] font-medium text-red-500 dark:text-red-400"
                  >
                    {newsletterError}
                  </p>
                )}
              </div>
            </div>
          </AnimateIn>

          {/* ================================================= */}
          {/* FOOTER COLUMNS */}
          {/* ================================================= */}

          <StaggerContainer className="grid min-w-0 grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 xl:grid-cols-4 xl:gap-5">
            <StaggerItem>
              <FooterColumn
                columnKey="services"
                links={
                  footerLinks.services
                }
              />
            </StaggerItem>

            <StaggerItem>
              <FooterColumn
                columnKey="products"
                links={
                  footerLinks.products
                }
              />
            </StaggerItem>

            <StaggerItem>
              <FooterColumn
                columnKey="about"
                links={
                  footerLinks.about
                }
              />
            </StaggerItem>

            <StaggerItem>
              <FooterColumn
                columnKey="popular"
                links={
                  footerLinks.popular
                }
              />
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* ================================================= */}
        {/* CONTACT / TRUST */}
        {/* ================================================= */}

        <div className="grid gap-3 border-t border-slate-200/80 py-5 sm:grid-cols-2 sm:items-center dark:border-white/[0.08]">
          {/* Phone */}

          <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/60 p-3 sm:border-0 sm:bg-transparent sm:p-0 dark:border-white/[0.06] dark:bg-white/[0.025] sm:dark:bg-transparent">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Phone size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] text-blue-600 dark:text-blue-400">
                Have Questions?
              </p>

              <p className="mt-0.5 break-words text-[13px] font-semibold text-slate-950 dark:text-white">
                +91 98765 43210
              </p>
            </div>
          </div>

          {/* Trusted Partner */}

          <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/60 p-3 sm:justify-end sm:border-0 sm:bg-transparent sm:p-0 dark:border-white/[0.06] dark:bg-white/[0.025] sm:dark:bg-transparent">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <ShieldCheck size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] text-blue-600 dark:text-blue-400">
                Trusted Partner
              </p>

              <p className="mt-0.5 text-[13px] font-semibold text-slate-950 dark:text-white">
                Secure. Reliable.
                Professional.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM BAR */}
        {/* ================================================= */}

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 py-4 text-center text-[11px] text-slate-400 sm:flex-row sm:text-left dark:border-white/[0.08] dark:text-slate-600">
          <p>
            © 2026 Geecon Technology. All
            Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-end">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-blue-600 dark:hover:text-white"
            >
              Privacy Policy
            </Link>

            <span className="text-slate-300 dark:text-slate-800">
              •
            </span>

            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-blue-600 dark:hover:text-white"
            >
              Terms of Service
            </Link>

            <span className="text-slate-300 dark:text-slate-800">
              •
            </span>

            <Link
              href="/sitemap"
              className="transition-colors hover:text-blue-600 dark:hover:text-white"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}