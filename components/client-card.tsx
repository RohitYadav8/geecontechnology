import Image from "next/image";
import type { Client } from "../lib/clients-data";

export function ClientCard({ client, featured = false }: { client: Client; featured?: boolean }) {
    return (
        <div
            className={`group/logo relative flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-400 hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)] dark:border-slate-800 dark:bg-slate-900/60 ${
                featured ? "h-40" : "h-28"
            }`}
        >
            {/* Shine sweep */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-white/30 transition-all duration-700 group-hover/logo:left-[160%]" />
            </div>

            <Image
                src={client.logo}
                alt={client.name}
                width={featured ? 160 : 120}
                height={featured ? 80 : 60}
                className="relative z-10 max-h-full w-auto object-contain grayscale transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:grayscale-0"
            />
        </div>
    );
}
