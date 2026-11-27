"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ChevronRight,
  Send,
  ShieldCheck,
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

type ColumnKey = "services" | "products" | "about" | "popular";

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
  columnKey: ColumnKey;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div className="min-w-0">
      <h4 className="text-[15px] font-bold text-white">
        {columnTitles[columnKey]}
      </h4>

      <ul className="mt-5 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-start gap-1.5 text-[13.5px] leading-5 text-indigo-50/85 transition-colors hover:text-white"
            >
              <span className="min-w-0 break-words">
                {link.label}
              </span>

              <ChevronRight
                size={12}
                className="mt-1 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
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
    <footer className="brand-grad relative overflow-hidden text-white">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-cyan-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* ================================================= */}
        {/* STAY UPDATED */}
        {/* ================================================= */}

        <AnimateIn>
          <div className="flex flex-col gap-6 border-b border-white/20 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.02em] sm:text-[32px]">
                Stay Updated
              </h3>

              <p className="mt-2 text-[15px] text-indigo-50/85">
                Subscribe to our newsletter for the
                latest updates and insights.
              </p>
            </div>

            <div className="w-full lg:w-[460px]">
              <form
                onSubmit={handleNewsletterSubmit}
                className={`flex w-full items-center gap-1.5 rounded-2xl border-2 bg-white p-1.5 shadow-[0_20px_50px_-25px_rgba(15,23,42,.6)] transition-all dark:bg-[#0b1220] ${
                  newsletterError
                    ? "border-red-400"
                    : newsletterMessage
                      ? "border-emerald-400"
                      : "border-transparent"
                }`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (newsletterError) {
                      setNewsletterError("");
                    }

                    if (newsletterMessage) {
                      setNewsletterMessage("");
                    }
                  }}
                  placeholder="Enter your email"
                  disabled={newsletterLoading}
                  autoComplete="email"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60 dark:text-white"
                />

                <button
                  type="submit"
                  disabled={newsletterLoading}
                  aria-label={
                    newsletterLoading
                      ? "Subscribing"
                      : "Subscribe"
                  }
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950"
                >
                  {newsletterLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <Send size={14} />
                  )}
                </button>
              </form>

              {newsletterMessage && (
                <p
                  role="status"
                  className="mt-2 text-xs font-semibold text-emerald-100"
                >
                  ✓ {newsletterMessage}
                </p>
              )}

              {newsletterError && (
                <p
                  role="alert"
                  className="mt-2 text-xs font-semibold text-red-100"
                >
                  {newsletterError}
                </p>
              )}
            </div>
          </div>
        </AnimateIn>

        {/* ================================================= */}
        {/* MAIN FOOTER */}
        {/* ================================================= */}

        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.3fr_4fr] lg:gap-12">
          {/* Company */}
          <AnimateIn direction="left">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="rounded-xl bg-white p-1 shadow-lg shadow-blue-900/20">
                <Image
                  src="/logo-icon-1.png"
                  alt="Geecon Technology"
                  width={45}
                  height={42}
                  className="h-8 w-auto"
                />
              </span>

              <div className="leading-tight">
                <div className="text-lg font-extrabold tracking-[0.02em]">
                  GEECON
                </div>

                <div className="text-[9px] font-bold tracking-[0.22em] text-white/75">
                  TECHNOLOGY
                </div>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-[14px] leading-7 text-indigo-50/85">
              Delivering innovative technology
              solutions that help businesses grow,
              transform and succeed in the digital
              world.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10">
                <ShieldCheck size={16} />
              </div>

              <div>
                <p className="text-[12px] font-bold text-white">
                  Trusted Partner
                </p>

                <p className="mt-0.5 text-[13.5px] text-indigo-50/85">
                  Secure. Reliable.
                  Professional.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Columns */}
          <StaggerContainer className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            <StaggerItem>
              <FooterColumn
                columnKey="services"
                links={footerLinks.services}
              />
            </StaggerItem>

            <StaggerItem>
              <FooterColumn
                columnKey="products"
                links={footerLinks.products}
              />
            </StaggerItem>

            <StaggerItem>
              <FooterColumn
                columnKey="about"
                links={footerLinks.about}
              />
            </StaggerItem>

            <StaggerItem>
              <FooterColumn
                columnKey="popular"
                links={footerLinks.popular}
              />
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* ================================================= */}
        {/* BOTTOM BAR */}
        {/* ================================================= */}

        <div className="border-t border-white/20 py-6 text-center text-[13px] text-indigo-50/80">
          <p>
            © 2026 Geecon Technology. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
