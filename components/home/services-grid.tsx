import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { services } from "../../lib/home-data";

import { AnimateIn } from "../animate-in";
import { BackgroundEffects } from "../background-effects";
import {
  StaggerContainer,
  StaggerItem,
} from "../stagger-container";
import { TiltCard } from "../tilt-card";

export function ServicesGrid() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        sm:py-24
        dark:bg-[#060b16]
      "
    >
      <BackgroundEffects />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <AnimateIn direction="left">
            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-200
                  bg-blue-50
                  px-3
                  py-1.5
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-blue-600
                  dark:border-blue-500/20
                  dark:bg-blue-500/[0.08]
                  dark:text-blue-400
                "
              >
                <Sparkles size={13} />
                Our Services
              </div>

              <h2
                className="
                  mt-5
                  max-w-2xl
                  text-3xl
                  font-semibold
                  leading-[1.1]
                  tracking-[-0.04em]
                  text-slate-950
                  sm:text-4xl
                  lg:text-[44px]
                  dark:text-white
                "
              >
                Digital agency focusing on{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  top solutions
                </span>
              </h2>
            </div>
          </AnimateIn>

          <AnimateIn
            direction="right"
            delay={0.1}
            className="lg:flex lg:justify-end"
          >
            <p className="max-w-xl text-sm leading-7 text-slate-500 sm:text-[15px] dark:text-slate-400">
              Digital marketing dashboards for
              checking your website and social media
              come in all shapes and sizes. Here we
              share some of the best solutions that
              provide cost-effective and innovative
              insights into your online activity.
            </p>
          </AnimateIn>
        </div>

        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <StaggerItem
              key={service.id}
              className="h-full"
            >
              <TiltCard className="h-full">
                <article
                  className="
                    group
                    relative
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-slate-200/80
                    bg-white
                    shadow-[0_20px_70px_-40px_rgba(15,23,42,.4)]
                    transition-all
                    duration-500
                    hover:border-blue-300/70
                    hover:shadow-[0_30px_80px_-35px_rgba(37,99,235,.25)]
                    dark:border-white/[0.07]
                    dark:bg-[#0b1220]
                    dark:hover:border-blue-400/20
                  "
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.07]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#07111f]/90
                        via-[#07111f]/25
                        to-transparent
                      "
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="max-w-[90%] text-lg font-semibold leading-snug text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="relative flex flex-1 flex-col p-6">
                    <span
                      className="
                        absolute
                        left-6
                        right-6
                        top-0
                        h-px
                        origin-left
                        scale-x-0
                        bg-gradient-to-r
                        from-blue-500
                        via-cyan-400
                        to-transparent
                        transition-transform
                        duration-500
                        group-hover:scale-x-100
                      "
                    />

                    <p className="flex-1 text-sm leading-7 text-slate-500 dark:text-slate-400">
                      {service.description}
                    </p>

                    <Link
                      href={service.href}
                      className="
                        group/link
                        mt-6
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-[#1a2b4a]
                        transition-colors
                        hover:text-blue-600
                        dark:text-blue-400
                        dark:hover:text-cyan-300
                      "
                    >
                      Read more

                      <span
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-slate-200
                          transition-all
                          duration-300
                          group-hover/link:translate-x-1
                          group-hover/link:border-blue-500
                          group-hover/link:bg-blue-500
                          group-hover/link:text-white
                          dark:border-white/10
                        "
                      >
                        <ArrowUpRight size={14} />
                      </span>
                    </Link>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}