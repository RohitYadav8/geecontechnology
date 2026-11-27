import Image from "next/image";
import type { Client } from "../lib/clients-data";

export function ClientCard({ client, featured = false }: { client: Client; featured?: boolean }) {
    return (
        <div
            className={`group/logo relative flex items-center justify-center overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,.45)] transition-all duration-500 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25 ${
                featured ? "h-40" : "h-28"
            }`}
        >
            {/* Accent bar */}
            <span className="brand-grad pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover/logo:scale-x-100" />

            {/* Shine sweep */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]">
                <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-violet-100/40 transition-all duration-700 group-hover/logo:left-[160%] dark:bg-white/10" />
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
