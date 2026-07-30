import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { services } from "../../lib/home-data";
import { AnimateIn } from "../../components/animate-in";
import {
  StaggerContainer,
  StaggerItem,
} from "../../components/stagger-container";
import { TiltCard } from "../../components/tilt-card";

export function ServicesGrid() {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 sm:py-24">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/10" />

      {/* Left Glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-[100px]" />

      {/* Right Glow */}
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <AnimateIn>
          <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
            {/* Heading */}
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="h-px w-8 bg-blue-500" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1a2b4a] dark:text-blue-400">
                  What we do
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Digital agency focusing on{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  top solutions
                </span>
              </h2>

              <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                <Sparkles size={14} />

                <span>
                  Innovative • Scalable • Business Focused
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="flex items-center">
              <p className="max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                Digital marketing dashboards for checking your website and
                social media come in all shapes and sizes. Here we share some
                of the best solutions that provide cost-effective and
                innovative insights into your online activity.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* =========================================================
            SERVICES
        ========================================================= */}

        <StaggerContainer className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <TiltCard className="group h-full">
                {/* =====================================================
                    OUTER GLOW / GRADIENT BORDER
                ===================================================== */}

                <div className="relative h-full rounded-[1.15rem] bg-gradient-to-br from-slate-200/70 via-transparent to-slate-200/70 p-[1px] transition-all duration-500 group-hover:from-blue-500/60 group-hover:via-cyan-400/40 group-hover:to-blue-500/60 dark:from-slate-800 dark:to-slate-800 dark:group-hover:from-blue-500/60 dark:group-hover:via-cyan-400/40 dark:group-hover:to-blue-500/60">
                  {/* ===================================================
                      CARD
                  =================================================== */}

                  <article className="relative h-full overflow-hidden rounded-[1.1rem] border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        quality={90}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Image Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                      {/* Blue Hover Glow */}
                      <div className="pointer-events-none absolute inset-0 bg-blue-500/0 transition-colors duration-500 group-hover:bg-blue-500/10" />

                      {/* =================================================
                          TOP TAG
                      ================================================= */}

                      <div className="absolute left-4 top-4">
                        <span className="inline-flex items-center rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                          {service.tag}
                        </span>
                      </div>

                      {/* =================================================
                          IMAGE BOTTOM CONTENT
                      ================================================= */}

                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-lg font-semibold text-white">
                          {service.title}
                        </h3>
                      </div>

                      {/* =================================================
                          CORNER GLOW
                      ================================================= */}

                      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-400/20 blur-3xl transition-all duration-700 group-hover:bg-cyan-400/40" />
                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="relative p-6">
                      {/* Animated top line */}
                      <span className="absolute left-6 right-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                      <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {service.description}
                      </p>

                      {/* =================================================
                          READ MORE
                      ================================================= */}

                      <Link
                        href={service.href}
                        className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1a2b4a] transition-colors duration-300 hover:text-blue-600 dark:text-blue-400 dark:hover:text-cyan-300"
                      >
                        <span>Read more</span>

                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:border-blue-400 group-hover/link:bg-blue-500 group-hover/link:text-white dark:border-slate-700">
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                          />
                        </span>
                      </Link>
                    </div>

                    {/* =================================================
                        BOTTOM HOVER GLOW
                    ================================================= */}

                    <div className="pointer-events-none absolute -bottom-20 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:bg-blue-500/20" />
                  </article>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}