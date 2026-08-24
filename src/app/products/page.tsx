"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Loader2,
  Sparkles,
} from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";
import { Marquee } from "../../../components/marquee";
import { CtaSection } from "../../../components/cta-section";

/* =========================================================
   PRODUCT TYPE
========================================================= */

type Product = {
  id: string;
  title: string;
  slug: string;

  bannerImage: string | null;
  logoImage: string | null;

  shortDescription: string | null;
  description: string | null;

  // FRONT CARD
  cardTagline: string | null;
  cardSecondaryText: string | null;

  // FLIP CARD
  flipEyebrow: string | null;
  flipTitle: string | null;
  flipDescription: string | null;

  isActive: boolean;
  order: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const activeProducts = Array.isArray(data)
          ? data
              .filter(
                (product: Product) => product.isActive
              )
              .sort(
                (a: Product, b: Product) =>
                  a.order - b.order
              )
          : [];

        setProducts(activeProducts);
      } catch (err) {
        console.error("Products fetch error:", err);

        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="relative flex-1 overflow-hidden">
        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.15] dark:opacity-[0.05]" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.16),transparent_55%)]" />

        <FloatingBlob
          className="-right-24 top-20 h-72 w-72"
          color="bg-blue-400/10"
          duration={17}
        />

        <FloatingBlob
          className="-left-20 top-[620px] h-64 w-64"
          color="bg-cyan-400/10"
          duration={21}
        />

        <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          {/* =====================================================
              HERO
          ===================================================== */}

          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <AnimateIn>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 dark:border-blue-900/40 dark:bg-blue-950/30">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />

                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    Geecon Products
                  </span>
                </div>
              </AnimateIn>

              <AnimatedHeading
                text="Technology products built for real business challenges"
                as="h1"
                delay={0.08}
                className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.07] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-[56px]"
              />

              <AnimateIn delay={0.16}>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                  Explore practical digital products designed to
                  simplify operations, improve productivity and help
                  businesses scale with confidence.
                </p>
              </AnimateIn>
            </div>

            <AnimateIn
              delay={0.2}
              direction="left"
              className="lg:flex lg:justify-end"
            >
              <div className="inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Boxes size={20} />
                </div>

                <div>
                  <p className="text-2xl font-semibold text-slate-950 dark:text-white">
                    {loading ? "..." : products.length}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Active Products
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* =====================================================
              ERROR
          ===================================================== */}

          {error && (
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading ? (
            <div className="mt-12">
              <div className="mb-6 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading products...
              </div>

              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="h-[520px] animate-pulse rounded-[28px] border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
                    />
                  )
                )}
              </div>
            </div>
          ) : products.length === 0 ? (
            /* =================================================
               EMPTY
            ================================================= */

            <div className="mt-12 rounded-3xl border border-slate-200 bg-white/80 p-12 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <Boxes size={24} />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">
                No products available
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Products will appear here once they are added from
                the admin panel.
              </p>
            </div>
          ) : (
            /* =================================================
               PRODUCT GRID
            ================================================= */

            <StaggerContainer className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <div className="group/card relative h-[520px] [perspective:1500px]">
                    <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] [transform-style:preserve-3d] lg:group-hover/card:[transform:rotateY(180deg)]">
                      {/* =========================================
                          FRONT CARD
                      ========================================= */}

                      <article
                        className="
                          absolute
                          inset-0
                          flex
                          h-full
                          flex-col
                          overflow-hidden
                          rounded-[28px]
                          border
                          border-slate-200/80
                          bg-white/95
                          shadow-[0_18px_55px_-30px_rgba(15,23,42,0.35)]
                          backdrop-blur
                          transition-all
                          duration-500
                          [backface-visibility:hidden]
                          lg:group-hover/card:border-blue-300
                          lg:group-hover/card:shadow-[0_28px_80px_-30px_rgba(37,99,235,0.28)]
                          dark:border-slate-800
                          dark:bg-slate-900/95
                        "
                      >
                        {/* =====================================
                            IMAGE
                        ===================================== */}

                        <div className="relative h-[210px] shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40">
                          {product.bannerImage ? (
                            <Image
                              src={product.bannerImage}
                              alt={product.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-contain p-7 transition-transform duration-700 lg:group-hover/card:scale-[1.05]"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center px-8 text-center">
                              <span className="text-lg font-semibold text-slate-400">
                                {product.title}
                              </span>
                            </div>
                          )}

                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent dark:from-slate-900/90" />

                          {/* PRODUCT LOGO */}

                          {product.logoImage && (
                            <div className="absolute bottom-4 left-6 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white p-2 shadow-lg">
                              <Image
                                src={product.logoImage}
                                alt={`${product.title} logo`}
                                width={56}
                                height={56}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          )}
                        </div>

                        {/* =====================================
                            FRONT CONTENT
                        ===================================== */}

                        <div className="flex flex-1 flex-col p-6">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Enterprise Product
                          </p>

                          <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                            {product.title}
                          </h2>

                          {/* CARD TAGLINE */}

                          {product.cardTagline ? (
                            <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
                              {product.cardTagline}
                            </p>
                          ) : product.shortDescription ? (
                            <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
                              {product.shortDescription}
                            </p>
                          ) : null}

                          {/* SECONDARY TEXT */}

                          {product.cardSecondaryText && (
                            <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                              {product.cardSecondaryText}
                            </p>
                          )}

                          {/* MOBILE */}

                          <div className="mt-auto pt-5 lg:hidden">
                            <Link
                              href={`/products/${product.slug}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400"
                            >
                              Explore Product

                              <ArrowUpRight size={15} />
                            </Link>
                          </div>

                          {/* DESKTOP HINT */}

                          <div className="mt-auto hidden pt-5 lg:block">
                            <div className="h-px bg-slate-100 dark:bg-slate-800" />

                            <div className="mt-4 flex items-center justify-between">
                              <p className="text-xs text-slate-400">
                                Hover to explore
                              </p>

                              <ArrowRight
                                size={14}
                                className="text-slate-300"
                              />
                            </div>
                          </div>
                        </div>
                      </article>

                      {/* =========================================
                          BACK / FLIP CARD
                      ========================================= */}

                      <article
                        className="
                          absolute
                          inset-0
                          hidden
                          h-full
                          overflow-hidden
                          rounded-[28px]
                          border
                          border-blue-500/20
                          bg-gradient-to-br
                          from-[#071a38]
                          via-[#092655]
                          to-[#0b3476]
                          text-white
                          shadow-[0_28px_80px_-30px_rgba(37,99,235,0.35)]
                          [backface-visibility:hidden]
                          [transform:rotateY(180deg)]
                          lg:flex
                          lg:flex-col
                        "
                      >
                        {/* GLOW */}

                        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-400/20 blur-[80px]" />

                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-[80px]" />

                        <div className="relative flex flex-1 flex-col p-7">
                          {/* FLIP EYEBROW */}

                          <div className="flex items-center justify-between gap-4">
                            <p className="line-clamp-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300">
                              {product.flipEyebrow ||
                                "Product Overview"}
                            </p>

                            {product.logoImage && (
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
                                <Image
                                  src={product.logoImage}
                                  alt={`${product.title} logo`}
                                  width={40}
                                  height={40}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            )}
                          </div>

                          <div className="mt-5 h-px bg-white/10" />

                          <div className="flex flex-1 flex-col justify-center">
                            {/* FLIP TITLE */}

                            <h3 className="text-2xl font-semibold leading-tight tracking-tight">
                              {product.flipTitle ||
                                product.title}
                            </h3>

                            {/* PRODUCT NAME */}

                            {product.flipTitle && (
                              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-200/70">
                                {product.title}
                              </p>
                            )}

                            {/* FLIP DESCRIPTION */}

                            <p className="mt-5 line-clamp-7 text-sm leading-7 text-slate-300">
                              {product.flipDescription ||
                                product.description ||
                                product.shortDescription ||
                                `Discover how ${product.title} can help streamline your business operations.`}
                            </p>
                          </div>

                          {/* EXPLORE BUTTON */}

                          <Link
                            href={`/products/${product.slug}`}
                            className="
                              group/link
                              mt-6
                              flex
                              items-center
                              justify-between
                              rounded-xl
                              bg-white
                              px-5
                              py-3.5
                              text-sm
                              font-semibold
                              text-blue-700
                              transition-all
                              duration-300
                              hover:-translate-y-0.5
                              hover:bg-blue-50
                            "
                          >
                            <span>Explore Product</span>

                            <ArrowRight
                              size={16}
                              className="transition-transform duration-300 group-hover/link:translate-x-1"
                            />
                          </Link>
                        </div>
                      </article>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {/* =====================================================
              MARQUEE
          ===================================================== */}

          {!loading && products.length > 0 && (
            <AnimateIn delay={0.15}>
              <div className="mt-16 overflow-hidden rounded-2xl border border-slate-200 bg-white/70 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
                <Marquee
                  items={products.map(
                    (product) => product.title
                  )}
                />
              </div>
            </AnimateIn>
          )}
        </section>
      </main>

      <CtaSection />

      <Footer />
    </div>
  );
}