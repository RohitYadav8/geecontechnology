"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Section } from "../site/ui";

/* =========================================================
   04 — TESTIMONIALS
   A single large pull quote with manual paging.
========================================================= */

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  isActive: boolean;
  order: number;
};

export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/testimonials")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        return res.json();
      })
      .then((data: Testimonial[]) => {
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Testimonials fetch error:", err));

    return () => {
      cancelled = true;
    };
  }, []);

  if (!items.length) return null;

  const current = items[active];
  const go = (delta: number) =>
    setActive((i) => (i + delta + items.length) % items.length);

  return (
    <Section index="04" label="In their words" tone="tint">
      <figure>
        <blockquote
          key={current.id}
          className="font-display text-[26px] font-medium leading-[1.25] text-ink sm:text-[36px] lg:text-[42px]"
        >
          <span className="text-accent">“</span>
          {current.quote.replace(/\s+/g, " ").trim()}
          <span className="text-accent">”</span>
        </blockquote>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
          <figcaption className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink">
            {current.name}
          </figcaption>

          {items.length > 1 && (
            <div className="flex items-center gap-4">
              <span className="font-mono text-[12px] text-muted">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </figure>
    </Section>
  );
}
