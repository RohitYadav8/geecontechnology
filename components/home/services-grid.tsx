import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { services } from "../../lib/home-data";

import { AnimateIn } from "../animate-in";
import {
  StaggerContainer,
  StaggerItem,
} from "../stagger-container";

export function ServicesGrid() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="brand-text text-[12px] font-extrabold uppercase tracking-[0.2em]">
            Our Services
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[46px] dark:text-white">
            Digital agency focusing on{" "}
            <span className="brand-text">top solutions</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-slate-500 dark:text-slate-400">
            Digital marketing dashboards for
            checking your website and social media
            come in all shapes and sizes. Here we
            share some of the best solutions that
            provide cost-effective and innovative
            insights into your online activity.
          </p>
        </AnimateIn>

        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem
              key={service.id}
              className="h-full"
            >
              <article className="group flex h-full flex-col rounded-[26px] border border-slate-200/80 bg-white p-3 shadow-[0_20px_60px_-45px_rgba(15,23,42,.45)] transition-all duration-500 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  <span className="brand-grad absolute bottom-3.5 left-3.5 rounded-[10px] px-3 py-1.5 font-mono text-[12px] font-bold text-white shadow-lg">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                  <h3 className="text-[19px] font-bold leading-snug text-slate-950 dark:text-white">
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {service.description}
                  </p>

                  <Link
                    href={service.href}
                    className="group/link mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-extrabold"
                  >
                    <span className="brand-text">Read more</span>

                    <ArrowRight
                      size={15}
                      className="text-violet-500 transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
