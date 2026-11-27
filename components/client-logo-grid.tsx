"use client";

import Image from "next/image";

type Client = {
  id: string;
  name: string;
  logo: string;
  featured?: boolean;
};

interface ClientLogoGridProps {
  clients: Client[];
}

export default function ClientLogoGrid({
  clients,
}: ClientLogoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
      {clients.map((client) => (
        <div
          key={client.id}
          className="group flex h-28 items-center justify-center rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,.4)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25"
        >
          <Image
            src={client.logo}
            alt={client.name}
            width={180}
            height={80}
            className="max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
