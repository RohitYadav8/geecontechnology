"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { contactInfo, siteMap } from "../lib/site-nav";

/* =========================================================
   SITE FOOTER
   Ink block: one contact statement, the site index (each
   page listed once) and the newsletter form.
========================================================= */

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanEmail = email.trim();
    setMessage("");
    setError("");

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const text = await response.text();
      let data: { success?: boolean; message?: string; error?: string } = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          console.error("Invalid newsletter API response:", text);
        }
      }

      if (!response.ok) {
        throw new Error(
          data.error || "Subscription failed. Please try again."
        );
      }

      setMessage(data.message || "Thank you for subscribing!");
      setEmail("");
    } catch (err) {
      console.error("Newsletter subscribe error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="site bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* ================= STATEMENT ================= */}
        <div className="grid gap-10 border-b border-paper/15 py-16 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
              Simple solutions, engineered for the extreme
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-end gap-4 font-display text-5xl font-semibold leading-[0.95] text-paper sm:text-7xl lg:text-[96px]"
            >
              <span>
                Let&apos;s build
                <br />
                something.
              </span>
              <ArrowUpRight className="mb-2 h-10 w-10 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-14 sm:w-14" />
            </Link>
          </div>

          <div className="flex flex-col justify-end gap-3 lg:col-span-4">
            <a
              href={`mailto:${contactInfo.email}`}
              className="border-b border-paper/15 pb-3 text-lg text-paper transition-colors hover:text-accent"
            >
              {contactInfo.email}
            </a>
            <a
              href={`tel:${contactInfo.phone}`}
              className="border-b border-paper/15 pb-3 text-lg text-paper transition-colors hover:text-accent"
            >
              {contactInfo.phoneDisplay}
            </a>
          </div>
        </div>

        {/* ================= INDEX + NEWSLETTER ================= */}
        <div className="grid gap-12 py-14 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 lg:col-span-9">
            {siteMap.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
                  {group.href ? (
                    <Link href={group.href} className="hover:text-paper">
                      {group.title}
                    </Link>
                  ) : (
                    group.title
                  )}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-paper/80 transition-colors hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
              Newsletter
            </p>
            <p className="mt-4 text-[14px] leading-6 text-paper/80">
              Occasional notes on software, hosting and hiring.
            </p>

            <form onSubmit={handleSubmit} className="mt-5" noValidate>
              <div
                className={`flex items-center border-b ${
                  error
                    ? "border-red-400"
                    : message
                      ? "border-emerald-400"
                      : "border-paper/30 focus-within:border-paper"
                }`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                    if (message) setMessage("");
                  }}
                  placeholder="you@company.com"
                  disabled={loading}
                  autoComplete="email"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-paper placeholder:text-paper/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label={loading ? "Subscribing" : "Subscribe"}
                  className="flex h-9 w-9 items-center justify-center text-paper transition-colors hover:text-accent disabled:opacity-50"
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                </button>
              </div>

              {message && (
                <p role="status" className="mt-3 text-[13px] text-emerald-400">
                  {message}
                </p>
              )}
              {error && (
                <p role="alert" className="mt-3 text-[13px] text-red-400">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col gap-2 border-t border-paper/15 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Geecon Technology</p>
          <Link href="/" className="hover:text-paper">
            Geecon
          </Link>
        </div>
      </div>
    </footer>
  );
}
