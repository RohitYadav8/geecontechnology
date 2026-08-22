"use client";

import Image from "next/image";

import { clients } from "../../lib/home-data";

import { BackgroundEffects } from "../background-effects";
import { MouseGlow } from "../mouse-glow";

export function ClientLogos() {
  const duplicated = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-slate-50/80 py-16 sm:py-20 dark:border-white/[0.05] dark:bg-[#080e1a]">
      <BackgroundEffects />

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent sm:w-44 dark:from-[#080e1a] dark:via-[#080e1a]/80" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent sm:w-44 dark:from-[#080e1a] dark:via-[#080e1a]/80" />

      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 gap-5 py-5 animate-marquee hover:[animation-play-state:paused]">
          {duplicated.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="shrink-0"
            >
              <MouseGlow>
                <div className="group relative flex h-28 w-48 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/[0.07] dark:bg-white/[0.035] dark:hover:border-blue-400/20">
                  <div className="relative h-16 w-full">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="192px"
                      className="object-contain grayscale opacity-65 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </MouseGlow>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 h-px max-w-5xl bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/10" />
    </section>
  );
}