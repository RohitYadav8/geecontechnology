"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { Container, PageHeader, SitePage } from "../../../components/site/ui";

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
              .filter((product: Product) => product.isActive)
              .sort((a: Product, b: Product) => a.order - b.order)
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
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          title="Technology products built for real business challenges"
          intro="Explore practical digital products designed to simplify operations, improve productivity and help businesses scale with confidence."
          meta={
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="text-accent">
                {loading ? "—" : String(products.length).padStart(2, "0")}
              </span>{" "}
              Active products
            </p>
          }
        />

        <section className="border-b border-line">
          <Container className="py-14 sm:py-20 lg:py-24">
            {error && (
              <p
                role="alert"
                className="mb-8 border-l-2 border-red-600 pl-4 text-sm text-red-700 dark:border-red-400 dark:text-red-300"
              >
                {error}
              </p>
            )}

            {loading ? (
              <p className="border-t border-line py-10 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Loading products…
              </p>
            ) : products.length === 0 ? (
              <div className="border-t border-line py-10">
                <p className="font-display text-2xl font-semibold text-ink">
                  No products available
                </p>
                <p className="mt-2 text-[15px] text-ink-2">
                  Products will appear here once they are added from the admin
                  panel.
                </p>
              </div>
            ) : (
              /* Hairline grid: shared borders, no cards */
              <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product, index) => (
                  <li
                    key={product.id}
                    className="border-b border-r border-line"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="group flex h-full flex-col p-6 transition-colors hover:bg-paper-2 sm:p-8"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-mono text-xs text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {product.logoImage ? (
                          <span className="relative block h-14 w-14 shrink-0 border border-line bg-white">
                            <Image
                              src={product.logoImage}
                              alt=""
                              fill
                              sizes="56px"
                              className="object-contain p-2"
                            />
                          </span>
                        ) : null}
                      </div>

                      <h2 className="mt-10 font-display text-[28px] font-semibold leading-[1.05] text-ink transition-colors group-hover:text-accent">
                        {product.title}
                      </h2>

                      {product.shortDescription && (
                        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                          {product.shortDescription}
                        </p>
                      )}

                      {(product.cardTagline || product.cardSecondaryText) && (
                        <div className="mt-6 space-y-2 text-[15px] leading-7 text-ink-2">
                          {product.cardTagline && (
                            <p>{product.cardTagline}</p>
                          )}
                          {product.cardSecondaryText && (
                            <p>{product.cardSecondaryText}</p>
                          )}
                        </div>
                      )}

                      <span className="mt-auto inline-flex items-center gap-2 self-start border-b border-current pb-0.5 pt-8 text-sm font-semibold text-ink group-hover:text-accent">
                        View product
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </SitePage>
  );
}
