
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
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {clients.map((client) => (
        <div
          key={client.id}
          className="group flex h-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
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

