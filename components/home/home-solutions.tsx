"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "../site/ui";

/* =========================================================
   03 — SOLUTIONS
   Ink section. A numbered list on the left; the selected
   solution's image and summary on the right. Each name is
   shown once (no repeated tag / "Explore X" labels).
========================================================= */

type ProductSolution = {
  id: string;
  name: string;
  slug: string;
  projectTag: string | null;
  excerpt: string | null;
  logoImage: string | null;
  bannerImage: string | null;
  order: number;
};

function normalise(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, "").replace(/s$/, "");
}

/** Show the category tag only when it adds something beyond the name */
function distinctTag(item: ProductSolution) {
  if (!item.projectTag) return null;
  const tag = normalise(item.projectTag);
  const name = normalise(item.name);
  return tag.includes(name) || name.includes(tag) ? null : item.projectTag;
}

export function HomeSolutions() {
  const [items, setItems] = useState<ProductSolution[]>([]);
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    fetch("/api/product-solutions", { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load");
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
          setStatus("ready");
        }
      })
      .catch((err) => {
        console.error("Product solutions fetch error:", err);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const current = items[active];
  const image = current?.bannerImage || current?.logoImage;

  return (
    <Section
      index="03"
      label="Solutions"
      tone="ink"
      title="Products that run the business behind the business."
    >
      {status === "loading" && (
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-paper/50">
          Loading…
        </p>
      )}

      {status === "error" && (
        <p className="text-paper/70">
          Solutions could not be loaded right now.{" "}
          <Link href="/products" className="underline">
            See all products
          </Link>
          .
        </p>
      )}

      {status === "ready" && items.length > 0 && (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <ol className="border-t border-paper/15">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.id} className="border-b border-paper/15">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-3 py-4 text-left"
                  >
                    <span
                      className={`font-mono text-xs ${
                        isActive ? "text-accent" : "text-paper/40"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-2xl font-semibold transition-colors sm:text-[28px] ${
                        isActive ? "text-paper" : "text-paper/45 hover:text-paper/80"
                      }`}
                    >
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {current && (
            <div className="lg:sticky lg:top-28 lg:self-start">
              {image && (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper">
                  <Image
                    key={image}
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-contain p-8"
                  />
                </div>
              )}

              {distinctTag(current) && (
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50">
                  {distinctTag(current)}
                </p>
              )}

              {current.excerpt && (
                <p className="mt-4 text-[16px] leading-7 text-paper/80">
                  {current.excerpt}
                </p>
              )}

              <Link
                href={`/${current.slug}`}
                className="group mt-6 inline-flex items-center gap-2 border-b border-paper pb-0.5 text-sm font-semibold text-paper hover:border-accent hover:text-accent"
              >
                View solution
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
