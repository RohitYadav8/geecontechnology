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

function FacebookIcon({ size = 16 }: { size?: number }) {
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

function LinkedinIcon({ size = 16 }: { size?: number }) {
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

function TwitterIcon({ size = 16 }: { size?: number }) {
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

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
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
    <div>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-500/10 dark:bg-blue-500/10 dark:text-blue-400">
        <Icon size={18} strokeWidth={1.7} />
      </div>

      <h4 className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">
        {columnTitles[columnKey]}
      </h4>

      <span className="mt-2 block h-[2px] w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex items-center justify-between gap-3 text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-white"
            >
              <span>{link.label}</span>

              <ChevronRight
                size={13}
                className="shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500 dark:text-slate-700"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white text-slate-500 dark:border-white/[0.05] dark:bg-[#050914] dark:text-slate-400">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[800px] -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-[120px] dark:bg-blue-500/[0.08]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-14 py-16 lg:grid-cols-[270px_minmax(0,1fr)] lg:py-20">
          <AnimateIn direction="left">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-icon-1.png"
                alt="Geecon Technology"
                width={45}
                height={42}
                className="h-10 w-auto"
              />

              <div className="leading-tight">
                <div className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  GEECON
                </div>

                <div className="text-[9px] font-semibold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  TECHNOLOGY
                </div>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7">
              Delivering innovative technology solutions that help businesses
              grow, transform and succeed in the digital world.
            </p>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
                Stay Updated
              </h4>

              <p className="mt-2 text-sm leading-6">
                Subscribe to our newsletter for the latest updates and insights.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 transition-colors focus-within:border-blue-400 dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-600"
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-105"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </AnimateIn>

          <StaggerContainer className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
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

        <div className="grid gap-6 border-t border-slate-200 py-8 md:grid-cols-3 md:items-center dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Phone size={17} />
            </div>

            <div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Have Questions?
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
                +91 98765 43210
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <ShieldCheck size={17} />
            </div>

            <div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Trusted Partner
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
                Secure. Reliable. Professional.
              </p>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Follow Us
            </p>

            <div className="mt-2 flex gap-2 md:justify-end">
              {[
                {
                  label: "Facebook",
                  icon: <FacebookIcon size={14} />,
                },
                {
                  label: "Twitter",
                  icon: <TwitterIcon size={14} />,
                },
                {
                  label: "LinkedIn",
                  icon: <LinkedinIcon size={14} />,
                },
                {
                  label: "Instagram",
                  icon: <InstagramIcon size={14} />,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-white/[0.08] dark:text-slate-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 py-5 text-xs text-slate-400 sm:flex-row dark:border-white/[0.08] dark:text-slate-600">
          <p>© 2026 Geecon Technology. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-blue-600 dark:hover:text-white"
            >
              Privacy Policy
            </Link>

            <span>•</span>

            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-blue-600 dark:hover:text-white"
            >
              Terms of Service
            </Link>

            <span>•</span>

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