import Image from "next/image";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";

import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { MouseGlow } from "../../../components/mouse-glow";
import { TiltCard } from "../../../components/tilt-card";

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
        <div className="flex min-h-screen flex-col overflow-hidden bg-white dark:bg-slate-950">
            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <Navbar />

            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="relative flex-1 overflow-hidden">

                {/* =================================================
                    BACKGROUND GRID
                ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
                        bg-[size:48px_48px]
                        opacity-20
                        dark:opacity-10
                    "
                />

                {/* =================================================
                    RADIAL BACKGROUND GLOW
                ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]
                    "
                />

                {/* =================================================
                    FLOATING BLOBS
                ================================================= */}

                <FloatingBlob
                    className="-right-20 top-10 h-72 w-72"
                    color="bg-blue-400/10"
                    duration={16}
                />

                <FloatingBlob
                    className="-left-16 top-96 h-64 w-64"
                    color="bg-cyan-300/10"
                    duration={20}
                />

                <FloatingBlob
                    className="right-1/4 top-[650px] h-48 w-48"
                    color="bg-indigo-400/5"
                    duration={18}
                />

                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-20">

                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <AnimateIn delay={0.05}>
                        <AnimatedHeading
                            text="Products and Services"
                            as="h1"
                            className="
                                text-2xl
                                font-semibold
                                text-blue-600
                                dark:text-blue-400
                                sm:text-3xl
                            "
                        />
                    </AnimateIn>

                    {/* =================================================
                        HERO / BANNER
                    ================================================= */}

                    <AnimateIn delay={0.1}>
                        <MouseGlow className="mt-6 rounded-2xl">

                            <div
                                className="
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-slate-300/40
                                    via-blue-300/30
                                    to-slate-400/40
                                    p-[2px]
                                "
                            >
                                <div
                                    className="
                                        relative
                                        flex
                                        h-56
                                        w-full
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-2xl
                                        bg-white
                                        dark:bg-slate-900
                                        sm:h-72
                                    "
                                >
                                    <Image
                                        src={BANNER_SRC}
                                        alt="Products and Services"
                                        fill
                                        priority
                                        sizes="(max-width: 640px) 100vw, 1152px"
                                        className="
                                            object-contain
                                            transition-transform
                                            duration-700
                                            ease-out
                                            hover:scale-[1.02]
                                        "
                                    />

                                    {/* Subtle overlay */}
                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-blue-950/5
                                            via-transparent
                                            to-white/10
                                            dark:from-blue-950/10
                                            dark:to-white/5
                                        "
                                    />
                                </div>
                            </div>

                        </MouseGlow>
                    </AnimateIn>

                    {/* =================================================
                        CONTENT GRID
                    ================================================= */}

                    <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">

                        {/* =================================================
                            LEFT CONTENT
                        ================================================= */}

                        <MouseGlow className="rounded-2xl">

                            <StaggerContainer
                                className="
                                    space-y-5
                                    rounded-2xl
                                    p-5
                                    text-sm
                                    leading-7
                                    text-slate-500
                                    dark:text-slate-400
                                    sm:p-6
                                "
                            >

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
                                    <p
                                        className="
                                            italic
                                            text-slate-600
                                            dark:text-slate-300
                                        "
                                    >
                                        Products and services which we can
                                        provide to our customers
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    OFFERINGS
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <ul className="space-y-3 pt-2">
                                        {offerings.map((item) => (
                                            <li
                                                key={item}
                                                className="
                                                    group
                                                    flex
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2
                                                    transition-all
                                                    duration-300
                                                    hover:bg-blue-500/5
                                                    hover:translate-x-1
                                                    dark:hover:bg-blue-400/5
                                                "
                                            >
                                                {/* Indicator */}
                                                <span
                                                    className="
                                                        h-4
                                                        w-1.5
                                                        shrink-0
                                                        rounded-full
                                                        bg-red-500
                                                        transition-all
                                                        duration-300
                                                        group-hover:h-6
                                                        group-hover:bg-blue-500
                                                    "
                                                />

                                                {/* Text */}
                                                <span
                                                    className="
                                                        text-slate-700
                                                        transition-colors
                                                        duration-300
                                                        group-hover:text-blue-600
                                                        dark:text-slate-300
                                                        dark:group-hover:text-blue-400
                                                    "
                                                >
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </StaggerItem>

                            </StaggerContainer>

                        </MouseGlow>

                        {/* =================================================
                            SIDEBAR IMAGE
                        ================================================= */}

                        <AnimateIn
                            delay={0.25}
                            direction="left"
                            className="
                                lg:sticky
                                lg:top-24
                                lg:self-start
                            "
                        >
                            <TiltCard className="mx-auto w-fit">

                                <div
                                    className="
                                        relative
                                        h-56
                                        w-56
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-blue-500/10
                                        bg-white/60
                                        p-4
                                        shadow-xl
                                        shadow-blue-500/5
                                        backdrop-blur-sm
                                        dark:bg-slate-900/60
                                    "
                                >

                                    {/* Decorative glow */}
                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            -right-10
                                            -top-10
                                            h-28
                                            w-28
                                            rounded-full
                                            bg-blue-500/10
                                            blur-3xl
                                        "
                                    />

                                    <Image
                                        src={SIDEBAR_SRC}
                                        alt="Geecon team illustration"
                                        fill
                                        sizes="224px"
                                        className="
                                            relative
                                            z-[1]
                                            object-contain
                                        "
                                    />

                                </div>

                            </TiltCard>
                        </AnimateIn>

                    </div>

                    {/* =================================================
                        SERVICE HIGHLIGHT CARDS
                    ================================================= */}

                    <AnimateIn delay={0.35}>
                        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {offerings.slice(0, 4).map((item, index) => (
                                <MouseGlow
                                    key={item}
                                    className="rounded-2xl"
                                >
                                    <div
                                        className="
                                            group
                                            h-full
                                            rounded-2xl
                                            border
                                            border-slate-200/70
                                            bg-white/60
                                            p-5
                                            backdrop-blur-sm
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:shadow-xl
                                            hover:shadow-blue-500/5
                                            dark:border-slate-800
                                            dark:bg-slate-900/50
                                        "
                                    >
                                        {/* Number */}
                                        <div
                                            className="
                                                mb-4
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-blue-500/10
                                                text-sm
                                                font-semibold
                                                text-blue-600
                                                dark:text-blue-400
                                            "
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <h3
                                            className="
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                                dark:text-white
                                            "
                                        >
                                            {item}
                                        </h3>

                                        <div
                                            className="
                                                mt-4
                                                h-px
                                                w-8
                                                bg-blue-500/40
                                                transition-all
                                                duration-300
                                                group-hover:w-14
                                            "
                                        />
                                    </div>
                                </MouseGlow>
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