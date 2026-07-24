"use client";

import { useState } from "react";
import { Quote, Star } from "lucide-react";
import { testimonials } from "../../lib/home-data";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1a2b4a] dark:text-blue-400">
          Testimonials
        </span>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
          Clients testimonial
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1a2b4a]/30 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30 dark:hover:shadow-black/40"
            >
              <Quote
                size={64}
                strokeWidth={1}
                className="absolute -right-2 -top-2 text-[#1a2b4a]/5 dark:text-blue-400/10"
              />

              <div className="relative flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <p className="relative mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
                {t.quote}
              </p>

              <div className="relative mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1a2b4a]/10 text-sm font-semibold text-[#1a2b4a] transition-colors duration-300 group-hover:bg-[#1a2b4a] group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                  {getInitials(t.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Verified client</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              aria-label={`Testimonial ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-6 bg-[#1a2b4a] dark:bg-white"
                  : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}