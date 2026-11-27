import Image from "next/image";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";

import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";

import {
    StaggerContainer,
    StaggerItem,
} from "../../../components/stagger-container";

// ---------------------------------------------------------
// Images
// ---------------------------------------------------------

const BANNER_SRC = "/product-service.png";
const SIDEBAR_SRC = "/product-service-1.png";

// ---------------------------------------------------------
// Products / Services
// ---------------------------------------------------------

const offerings = [
    "Software Products",
    "Web Hosting Solutions",
    "Mobile Solutions",
    "Branding",
    "Internet Technologies & Web Solutions",
    "ERP Solutions",
    "Resourcing & HR Management",
    "Corporate Training",
];

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------


export default function SoftwareProductsPage() {
    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-slate-50 dark:bg-[#060b16]">
            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <Navbar />

            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="relative flex-1 overflow-hidden">

                {/* =================================================
                    HERO
                ================================================= */}

                <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-16 text-center text-white sm:px-8 sm:pb-44 sm:pt-20 lg:px-10">
                    <FloatingBlob
                        className="-left-40 top-24 h-[460px] w-[460px]"
                        color="bg-cyan-300/35"
                        duration={18}
                    />

                    <FloatingBlob
                        className="-right-28 -top-24 h-[420px] w-[420px]"
                        color="bg-violet-300/40"
                        duration={16}
                    />

                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
                            backgroundSize: "56px 56px",
                        }}
                    />

                    <div className="relative mx-auto max-w-4xl">
                        <AnimatedHeading
                            text="Products and Services"
                            as="h1"
                            delay={0.05}
                            highlightFrom={2}
                            highlightClassName="brand-text-light"
                            className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]"
                        />
                    </div>
                </section>

                {/* =================================================
                    BANNER (OVERLAPS HERO)
                ================================================= */}

                <section className="relative z-10 mx-auto -mt-28 max-w-6xl px-4 sm:-mt-32 sm:px-6 lg:px-10">
                    <AnimateIn delay={0.1}>
                        <div className="rounded-[32px] border border-slate-100 bg-white p-3 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                            <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-[24px] bg-gradient-to-br from-violet-50 via-white to-indigo-50 sm:h-80 dark:from-violet-500/10 dark:via-[#0b1220] dark:to-indigo-500/10">
                                <Image
                                    src={BANNER_SRC}
                                    alt="Products and Services"
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 100vw, 1152px"
                                    className="object-contain transition-transform duration-700 ease-out hover:scale-[1.02]"
                                />
                            </div>
                        </div>
                    </AnimateIn>
                </section>

                {/* =================================================
                    CONTENT GRID
                ================================================= */}

                <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-10 lg:pb-24">

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">

                        {/* =================================================
                            LEFT CONTENT
                        ================================================= */}

                        <div className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,.35)] sm:p-10 dark:border-white/[0.07] dark:bg-[#0b1220]">

                            <StaggerContainer className="space-y-6 text-[15px] leading-7 text-slate-600 dark:text-slate-400">

                                {/* -----------------------------------------
                                    INTRODUCTION
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Geecon products focus on providing
                                        innovative business growth for clients.
                                        Building on its varied expertise and
                                        domain knowledge, Geecon offers clients
                                        a wide range IT services. These services
                                        enable business to &ldquo;Do Business
                                        Better&rdquo; that help you to perform
                                        in this dynamic market environment.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    SUB HEADING
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p className="text-xl font-extrabold leading-8 tracking-[-0.03em] text-slate-950 sm:text-2xl dark:text-white">
                                        Products and services which we can
                                        provide to our customers
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    OFFERINGS
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <ul className="grid gap-3 sm:grid-cols-2">
                                        {offerings.map((item) => (
                                            <li
                                                key={item}
                                                className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-white hover:shadow-[0_20px_50px_-30px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-violet-400/30"
                                            >
                                                {/* Indicator */}
                                                <span className="brand-grad h-5 w-1.5 shrink-0 rounded-full transition-all duration-300 group-hover:h-7" />

                                                {/* Text */}
                                                <span className="text-sm font-semibold text-slate-800 transition-colors duration-300 group-hover:text-violet-600 dark:text-slate-200 dark:group-hover:text-violet-300">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </StaggerItem>

                            </StaggerContainer>

                        </div>

                        {/* =================================================
                            SIDEBAR IMAGE
                        ================================================= */}

                        <AnimateIn
                            delay={0.25}
                            direction="left"
                            className="lg:sticky lg:top-24 lg:self-start"
                        >
                            <div className="brand-grad relative overflow-hidden rounded-[28px] p-2 shadow-[0_30px_70px_-30px_rgba(91,33,182,.5)]">
                                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-300/40 blur-3xl" />
                                <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl" />

                                <div className="relative h-72 w-full overflow-hidden rounded-[22px] bg-white p-4 dark:bg-[#0b1220]">
                                    <Image
                                        src={SIDEBAR_SRC}
                                        alt="Geecon team illustration"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 320px"
                                        className="relative z-[1] object-contain p-4"
                                    />
                                </div>
                            </div>
                        </AnimateIn>

                    </div>

                    {/* =================================================
                        SERVICE HIGHLIGHT CARDS
                    ================================================= */}

                    <AnimateIn delay={0.35}>
                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {offerings.slice(0, 4).map((item, index) => (
                                <div
                                    key={item}
                                    className="group h-full rounded-[26px] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]"
                                >
                                    {/* Number */}
                                    <div className="brand-grad mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] text-sm font-extrabold text-white shadow-lg shadow-violet-500/25">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                                        {item}
                                    </h3>

                                    <div className="brand-grad mt-4 h-[3px] w-8 rounded-full transition-all duration-300 group-hover:w-14" />
                                </div>
                            ))}

                        </div>
                    </AnimateIn>

                </section>
            </main>

            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer />
        </div>
    );
}
