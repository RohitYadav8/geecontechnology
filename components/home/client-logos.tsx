"use client";

import Image from "next/image";
import { clients } from "../../lib/home-data";
import { AnimateIn } from "../../components/animate-in";

export function ClientLogos() {
  const duplicated = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn className="mb-12 text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400">
            Trusted By
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Our Happy Clients
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            We are proud to work with businesses across different industries,
            delivering reliable digital solutions and long-term partnerships.
          </p>
        </AnimateIn>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-slate-950 sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-slate-950 sm:w-40" />

      {/* Marquee track */}
      <div className="group flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee gap-6 py-2 group-hover:[animation-play-state:paused]">
          {duplicated.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="flex h-32 w-48 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-400/40 dark:hover:shadow-cyan-500/10"
            >
              <div className="relative h-20 w-full">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  sizes="192px"
                  className="object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}