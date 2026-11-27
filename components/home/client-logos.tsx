"use client";

import Image from "next/image";

import { clients } from "../../lib/home-data";

import {
  StaggerContainer,
  StaggerItem,
} from "../stagger-container";

export function ClientLogos() {
  return (
    <section className="relative pb-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((client) => (
            <StaggerItem key={client.id}>
              <div className="group flex h-24 items-center justify-center rounded-[20px] border border-slate-200/80 bg-white px-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_45px_-28px_rgba(91,33,182,.45)] dark:border-white/[0.07] dark:bg-white">
                <div className="relative h-12 w-full">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="180px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
