"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, Package, User, Link2, ChevronRight, Phone, ShieldCheck, Send } from "lucide-react";
import { footerLinks } from "../lib/home-data";
import { AnimateIn } from "../components/animate-in";
import { StaggerContainer, StaggerItem } from "../components/stagger-container";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
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

function FooterColumn({ columnKey, links }: { columnKey: keyof typeof columnIcons; links: { label: string; href: string }[] }) {
  const Icon = columnIcons[columnKey];

  return (
    <div>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <h4 className="mt-4 text-base font-semibold text-white">{columnTitles[columnKey]}</h4>
      <span className="mt-2 block h-0.5 w-8 rounded-full bg-blue-500" />

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="group flex items-center justify-between text-sm text-slate-400 transition-colors hover:text-white">
              {link.label}
              <ChevronRight size={14} className="text-slate-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-blue-400" />
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
    <footer className="bg-[#0a1122] text-slate-400">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 py-16 lg:grid-cols-[280px_1fr]">
          <AnimateIn direction="left">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo-icon-1.png" alt="Geecon Technology" width={44} height={40} className="h-9 w-auto" />
              <div className="leading-tight">
                <div className="text-lg font-bold text-white">Geecon</div>
                <div className="text-[10px] font-semibold tracking-widest text-blue-400">TECHNOLOGY</div>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Delivering innovative technology solutions that help businesses grow, transform and succeed in the digital world.
            </p>

            <span className="mt-6 block h-0.5 w-8 rounded-full bg-blue-500" />

            <div className="mt-8">
              <h4 className="text-base font-semibold text-white">Stay Updated</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  suppressHydrationWarning
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button type="submit" aria-label="Subscribe" suppressHydrationWarning className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-400">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </AnimateIn>

          <StaggerContainer className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <StaggerItem>
              <FooterColumn columnKey="services" links={footerLinks.services} />
            </StaggerItem>
            <StaggerItem>
              <FooterColumn columnKey="products" links={footerLinks.products} />
            </StaggerItem>
            <StaggerItem>
              <FooterColumn columnKey="about" links={footerLinks.about} />
            </StaggerItem>
            <StaggerItem>
              <FooterColumn columnKey="popular" links={footerLinks.popular} />
            </StaggerItem>
          </StaggerContainer>
        </div>

        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-blue-400">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-sm text-blue-400">Have Questions?</p>
                <p className="text-sm font-semibold text-white">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-blue-400">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-sm text-blue-400">Trusted Partner</p>
                <p className="text-sm font-semibold text-white">Secure. Reliable. Professional.</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-blue-400 sm:text-right">Follow Us</p>
              <div className="mt-2 flex items-center gap-3 sm:justify-end">
                <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-blue-500 hover:border-blue-500">
                  <FacebookIcon size={15} />
                </a>
                <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-blue-500 hover:border-blue-500">
                  <TwitterIcon size={15} />
                </a>
                <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-blue-500 hover:border-blue-500">
                  <LinkedinIcon size={15} />
                </a>
                <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-blue-500 hover:border-blue-500">
                  <InstagramIcon size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
            <p>© {new Date().getFullYear()} Geecon Technology. All Rights Reserved.</p>
            <div className="flex items-center gap-3">
              <Link href="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</Link>
              <span className="text-slate-700">|</span>
              <Link href="/terms-of-service" className="transition-colors hover:text-white">Terms of Service</Link>
              <span className="text-slate-700">|</span>
              <Link href="/sitemap" className="transition-colors hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}