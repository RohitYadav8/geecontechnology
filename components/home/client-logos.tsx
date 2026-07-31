
"use client";

import Image from "next/image";
import { clients } from "../../lib/home-data";
import { AnimateIn } from "../../components/animate-in";
import { MouseGlow } from "../../components/mouse-glow";

export function ClientLogos() {
  const duplicated = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-cyan-500/10" />

      {/* Heading */}
      <div className="relative mx-auto max-w-7xl px-6">
        <AnimateIn direction="up" className="mb-12 text-center">
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

      {/* Left Fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-white to-transparent dark:from-slate-950 sm:w-40" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-white to-transparent dark:from-slate-950 sm:w-40" />

      {/* Marquee */}
      <div className="group relative mt-4 flex overflow-hidden">
        <div className="flex shrink-0 gap-6 py-4 animate-marquee group-hover:[animation-play-state:paused]">
          {duplicated.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="shrink-0"
            >
              <MouseGlow>
                <div className="group/card relative flex h-32 w-48 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-cyan-400/40 dark:hover:shadow-cyan-500/10">
                  {/* Inner Shine */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 dark:from-white/5" />

                  {/* Logo Container */}
                  <div className="relative z-10 h-20 w-full">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="192px"
                      className="object-contain grayscale opacity-70 transition-all duration-500 group-hover/card:scale-110 group-hover/card:grayscale-0 group-hover/card:opacity-100"
                    />
                  </div>
                </div>
              </MouseGlow>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mx-auto mt-10 h-px max-w-5xl bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />
    </section>
  );
}

