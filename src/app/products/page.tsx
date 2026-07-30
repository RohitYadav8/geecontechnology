
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { StaggerContainer, StaggerItem } from "../../../components/stagger-container";
import { FloatingBlob } from "../../../components/floating-blob";
import { StatCounter } from "../../../components/stat-counter";
import { Marquee } from "../../../components/marquee";
import { CtaSection } from "../../../components/cta-section";
import { products } from "../../../lib/products-data";
import { productDetails, fallbackProductDetail } from "../../../lib/product-details";
import ProductCard from "../../../components/ProductCard/ProductCard";
import FloatingLogo from "../../../components/ProductCard/FloatingLogo";
import Shine from "../../../components/ProductCard/Shine";

function FacebookIcon({ size = 15 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
        </svg>
    );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
        </svg>
    );
}

function TwitterIcon({ size = 15 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export default function ProductsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="relative flex-1 overflow-hidden">
                {/* Animated grid + radial glow */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.18),transparent_60%)]" />

                {/* Ambient background glow */}
                <FloatingBlob className="-right-20 top-10 h-72 w-72" color="bg-blue-400/10" duration={16} />
                <FloatingBlob className="-left-16 top-96 h-64 w-64" color="bg-cyan-300/10" duration={20} />

                <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-20">
                    <AnimateIn>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#1a2b4a] dark:text-blue-400">
                            Our Products
                        </span>
                    </AnimateIn>

                    <AnimatedHeading
                        text="Products"
                        as="h1"
                        delay={0.1}
                        className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
                    />

                    <AnimateIn delay={0.25}>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                            Geecon is a Technology Driven company with a mission of &ldquo;Developing and implementing new
                            technology to contribute towards rapid growth of various products&rdquo;. Harness the power of web,
                            virtualisation and big data with our comprehensive IT management and advanced analytics offerings.
                        </p>
                    </AnimateIn>

                    <AnimateIn delay={0.35}>
                        <div className="mt-6 flex items-center gap-2">
                            <span className="text-2xl font-bold text-[#1a2b4a] dark:text-blue-400">
                                <StatCounter value={products.length} suffix="+" />
                            </span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Enterprise Products</span>
                        </div>
                    </AnimateIn>

                    <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => {
                            const detail = productDetails[product.id] ?? fallbackProductDetail(product.name, product.tagline);

                            return (
                                <StaggerItem key={product.id}>
                                    {/* Outer wrapper: hover lift + glow + 3D tilt (separate from flip transform) */}
                                    <ProductCard className="group group/card h-96 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10 dark:hover:shadow-black/40">
                                        {/* Flip container */}
                                        <div className="group h-full w-full [perspective:1200px]">
                                            <div className="relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                                {/* ===== FRONT ===== */}
                                                <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xl transition-all duration-500 group-hover/card:border-blue-400 group-hover/card:shadow-[0_0_40px_rgba(59,130,246,0.35)] dark:border-slate-800 dark:bg-slate-900/70 [backface-visibility:hidden]">
                                                    {/* Hover color wash */}
                                                    <div
                                                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 transition-opacity duration-500 group-hover/card:opacity-10`}
                                                    />
                                                    <Shine />

                                                    <div className={`relative h-24 bg-gradient-to-r ${product.gradient} transition-transform duration-500 group-hover/card:scale-105`}>
                                                        <div className="absolute -bottom-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-md transition-transform duration-500 group-hover/card:scale-110 dark:border-slate-900 dark:bg-slate-800">
                                                            <FloatingLogo
                                                                src={product.logo}
                                                                alt={product.name}
                                                                logoText={product.logoText}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-1 flex-col items-center justify-center px-6 pb-6 pt-12 text-center">
                                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{product.name}</h3>
                                                        <p className="mt-1 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                                                            {product.tagline}
                                                        </p>
                                                        <div className="mt-4 space-y-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                            {product.quotes.map((q, i) => (
                                                                <p key={i}>&ldquo;{q}&rdquo;</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ===== BACK ===== */}
                                                <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-[#1a2b4a]/20 bg-white/70 backdrop-blur-xl transition-all duration-500 group-hover/card:shadow-[0_0_40px_rgba(59,130,246,0.35)] dark:border-blue-500/20 dark:bg-slate-900/70 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                                    <div className="flex flex-1 flex-col px-7 py-6 text-center">
                                                        <p className="border-b border-slate-100 pb-4 text-xs font-medium uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:text-slate-500">
                                                            &ldquo;{detail.eyebrow}&rdquo;
                                                        </p>

                                                        <h3 className="mt-4 text-base font-bold uppercase text-slate-900 dark:text-white">
                                                            {detail.headline}
                                                        </h3>
                                                        <p className="mt-3 flex-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                            {detail.description}
                                                        </p>

                                                        <div className="mt-4 flex justify-center gap-4 text-slate-500 dark:text-slate-400">
                                                            <a href="#" aria-label="Facebook" className="transition-colors hover:text-[#1a2b4a] dark:hover:text-white">
                                                                <FacebookIcon />
                                                            </a>
                                                            <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-[#1a2b4a] dark:hover:text-white">
                                                                <LinkedinIcon />
                                                            </a>
                                                            <a href="#" aria-label="Twitter" className="transition-colors hover:text-[#1a2b4a] dark:hover:text-white">
                                                                <TwitterIcon />
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <Link
                                                        href={product.href}
                                                        className="group/btn flex items-center justify-center gap-1.5 bg-[#1a2b4a] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d1830] dark:bg-blue-600 dark:hover:bg-blue-500"
                                                    >
                                                        Read More
                                                        <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                                                    </Link>
                                                </div>

                                            </div>
                                        </div>
                                    </ProductCard>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>

                    <div className="mt-16">
                        <Marquee items={products.map((product) => product.name)} />
                    </div>
                </section>
            </main>
            <CtaSection />
            <Footer />
        </div>
    );
}
