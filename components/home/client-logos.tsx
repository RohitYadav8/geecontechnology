import Image from "next/image";
import { clients } from "../../lib/home-data";

export function ClientLogos() {
  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
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
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((client) => (
            <div
              key={client.id}
              className="
                group
                flex
                h-36
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-blue-400/40
                hover:shadow-2xl
                dark:border-slate-800
                dark:bg-slate-900
                dark:hover:border-cyan-400/40
                dark:hover:shadow-cyan-500/10
              "
            >
              <div className="relative h-24 w-full">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}