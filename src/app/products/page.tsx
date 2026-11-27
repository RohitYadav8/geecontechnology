"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
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
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#060b16]">
      <Navbar />

      <main className="relative flex-1 overflow-hidden">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-16 text-center text-white sm:px-8 sm:pb-44 sm:pt-20 lg:px-10">
          <FloatingBlob
            className="-left-40 top-24 h-[460px] w-[460px]"
            color="bg-cyan-300/35"
            duration={18}
          />

          <FloatingBlob
            className="-right-28 -top-24 h-[420px] w-[420px]"
            color="bg-violet-300/40"
            duration={16}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative mx-auto max-w-5xl">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-cyan-200" />

                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                  Geecon Products
                </span>
              </div>
            </AnimateIn>

            <AnimatedHeading
              text="Technology products built for real business challenges"
              as="h1"
              delay={0.08}
              highlightFrom={4}
              highlightClassName="brand-text-light"
              className="mx-auto mt-7 max-w-5xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]"
            />

            <AnimateIn delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                Explore practical digital products designed to
                simplify operations, improve productivity and help
                businesses scale with confidence.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <div className="mt-9 inline-flex items-center gap-4 rounded-2xl border border-white/30 bg-white/[0.14] px-5 py-4 text-left backdrop-blur-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-600 shadow-lg shadow-blue-900/20">
                  <Boxes size={20} />
                </div>

                <div>
                  <p className="text-2xl font-extrabold">
                    {loading ? "..." : products.length}
                  </p>

                  <p className="text-xs text-indigo-50/85">
                    Active Products
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-24 sm:-mt-32 sm:px-6 lg:px-10">
          {/* =====================================================
              ERROR
          ===================================================== */}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading ? (
            <div>
              <div className="mb-6 flex items-center gap-3 text-sm font-semibold text-white">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading products...
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="h-[390px] animate-pulse rounded-[26px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#0b1220]"
                    />
                  )
                )}
              </div>
            </div>
          ) : products.length === 0 ? (
            /* =================================================
               EMPTY
            ================================================= */

            <div className="rounded-[30px] border border-slate-100 bg-white p-12 text-center shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
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

            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <div className="group/card relative h-[390px] [perspective:1500px]">
                    <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] [transform-style:preserve-3d] lg:group-hover/card:[transform:rotateY(180deg)]">
                      {/* =========================================
                          FRONT CARD
                      ========================================= */}

                      <article
                        className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-2.5 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.45)] transition-all duration-500 [backface-visibility:hidden] dark:border-white/[0.07] dark:bg-[#0b1220]"
                      >
                        {/* =====================================
                            TOP BANNER
                        ===================================== */}

                        <div className="relative h-[96px] shrink-0 overflow-hidden rounded-[18px] bg-slate-100 dark:bg-slate-800">
                          {product.bannerImage ? (
                            <Image
                              src={product.bannerImage}
                              alt={product.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover object-center transition-transform duration-700 lg:group-hover/card:scale-[1.03]"
                            />
                          ) : (
                            <div className="brand-grad h-full w-full" />
                          )}

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.03] dark:to-black/10" />
                        </div>

                        {/* =====================================
                            PRODUCT LOGO
                        ===================================== */}

                        {product.logoImage && (
                          <div className="relative z-10 mx-auto -mt-[36px] flex h-[74px] w-[74px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-violet-500 bg-white p-2.5 shadow-[0_10px_26px_-8px_rgba(91,33,182,0.45)] dark:border-violet-400 dark:bg-white">
                            <Image
                              src={product.logoImage}
                              alt={`${product.title} logo`}
                              width={74}
                              height={74}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        )}

                        {!product.logoImage && (
                          <div className="relative z-10 mx-auto -mt-[22px] flex h-[44px] items-center justify-center rounded-full border border-violet-200 bg-white px-4 text-[10px] font-bold text-violet-600 shadow-sm dark:border-violet-500/20 dark:bg-slate-950 dark:text-violet-300">
                            {product.title}
                          </div>
                        )}

                        {/* =====================================
                            FRONT CONTENT
                        ===================================== */}

                        <div className="flex min-h-0 flex-1 flex-col px-5 pb-4 pt-3 text-center">
                          <h2 className="text-[19px] font-bold leading-tight tracking-[-0.02em] text-slate-950 dark:text-white">
                            {product.title}
                          </h2>

                          {product.shortDescription && (
                            <p className="mt-1 text-[12px] leading-5 text-slate-400 dark:text-slate-500">
                              {product.shortDescription}
                            </p>
                          )}

                          {product.cardTagline && (
                            <p className="mt-4 line-clamp-3 text-[12.5px] leading-[1.6] text-slate-600 dark:text-slate-300">
                              {product.cardTagline}
                            </p>
                          )}

                          {product.cardSecondaryText && (
                            <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.6] text-slate-600 dark:text-slate-300">
                              {product.cardSecondaryText}
                            </p>
                          )}

                          <div className="mt-auto pt-2 lg:hidden">
                            <Link
                              href={`/products/${product.slug}`}
                              className="brand-grad inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[12px] font-bold text-white"
                            >
                              Read More
                              <ArrowUpRight size={13} />
                            </Link>
                          </div>
                        </div>
                      </article>

                      {/* =========================================
                          BACK / FLIP CARD
                      ========================================= */}

                      <article
                        className="absolute inset-0 hidden h-full overflow-hidden rounded-[26px] border border-violet-200 bg-white text-slate-700 shadow-[0_30px_70px_-35px_rgba(91,33,182,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 lg:flex lg:flex-col"
                      >
                        <div className="flex h-full flex-col text-center">
                          <div className="flex min-h-0 flex-1 flex-col px-5 pb-3 pt-4">
                            <p className="brand-text line-clamp-1 text-[10px] font-extrabold uppercase tracking-[0.12em]">
                              {product.flipEyebrow ||
                                `TAKE A TOUR OF ${product.title}`}
                            </p>

                            <div className="mt-3 h-px w-full bg-slate-100 dark:bg-slate-800" />

                            <div className="flex min-h-0 flex-1 flex-col justify-center">
                              <h3 className="text-[17px] font-extrabold uppercase leading-tight text-slate-950 dark:text-white">
                                {product.flipTitle ||
                                  product.title}
                              </h3>

                              <p className="mt-3 line-clamp-6 text-[12.5px] leading-[1.65] text-slate-500 dark:text-slate-300">
                                {product.flipDescription ||
                                  product.description ||
                                  product.shortDescription ||
                                  ""}
                              </p>
                            </div>

                            {product.logoImage && (
                              <div className="mx-auto mt-2 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white p-1.5 dark:border-slate-700 dark:bg-slate-950">
                                <Image
                                  src={product.logoImage}
                                  alt={`${product.title} logo`}
                                  width={32}
                                  height={32}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            )}
                          </div>

                          <Link
                            href={`/products/${product.slug}`}
                            className="brand-grad m-2.5 flex h-[46px] shrink-0 items-center justify-center rounded-[16px] text-[14px] font-bold text-white transition-opacity duration-300 hover:opacity-90"
                          >
                            Read More
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
              <div className="mt-16 overflow-hidden rounded-[26px] border border-slate-200/80 bg-white py-2 dark:border-white/[0.07] dark:bg-[#0b1220]">
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