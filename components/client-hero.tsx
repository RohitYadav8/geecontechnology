import { AnimateIn } from "./animate-in";
import { AnimatedHeading } from "./animated-heading";
import { StatCounter } from "./stat-counter";
import { FloatingBlob } from "./floating-blob";
import { clientStats } from "../lib/clients-data";

export function ClientHero() {
    return (
        <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-16 text-center text-white sm:px-8 sm:pb-44 sm:pt-20 lg:px-10">
            <FloatingBlob className="-left-40 top-24 h-[460px] w-[460px]" color="bg-cyan-300/35" duration={18} />

            <FloatingBlob className="-right-28 -top-24 h-[420px] w-[420px]" color="bg-violet-300/40" duration={16} />

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
                    backgroundSize: "56px 56px",
                }}
            />

            <div className="relative mx-auto max-w-4xl">
                <AnimateIn>
                    <span className="inline-flex items-center rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                        Clientele &amp; Engagement
                    </span>
                </AnimateIn>

                <AnimatedHeading
                    text="Trusted by Industry Leaders"
                    as="h1"
                    delay={0.1}
                    highlightFrom={2}
                    highlightClassName="brand-text-light"
                    className="mt-6 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]"
                />

                <AnimateIn delay={0.25}>
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                        It has been a great honour to work with well known organisations across industries.
                        Few of our esteemed engagements are listed below.
                    </p>
                </AnimateIn>

                <AnimateIn delay={0.35}>
                    <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                        {clientStats.map((stat) => (
                            <div key={stat.label} className="rounded-[20px] border border-white/25 bg-white/[0.12] px-3 py-5 backdrop-blur-xl">
                                <div className="text-2xl font-extrabold tracking-[-0.03em] text-white sm:text-3xl">
                                    <StatCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-100/80">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}
