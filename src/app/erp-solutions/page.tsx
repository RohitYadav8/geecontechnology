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

const ERP_WORDMARK_SRC = "/erp-1.png";
const ERP_HUB_DIAGRAM_SRC = "/accounting-erp.png";

// ---------------------------------------------------------
// ERP Benefits
// ---------------------------------------------------------

const benefits = [
    "Assisting you in defining your business processes and ensuring they are complied with throughout the supply chain",

    "Protecting your critical business data through well-defined roles and security access",

    "Enabling you to plan your work load based on existing orders and forecasts",

    "Providing you with the tools to give a high level of service to your customers",

    "Translating your data into decision making information",
];

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function ErpSolutionsPage() {
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
                    BACKGROUND RADIAL GLOW
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
                    className="right-1/4 top-[700px] h-52 w-52"
                    color="bg-emerald-400/5"
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
                            text="ERP Solutions"
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
                        ERP WORDMARK
                    ================================================= */}

                    <AnimateIn delay={0.1}>
                        <TiltCard className="mx-auto mt-8 max-w-xl">

                            <MouseGlow className="rounded-2xl">

                                <div
                                    className="
                                        relative
                                        mx-auto
                                        h-56
                                        w-full
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-slate-200/60
                                        bg-white/60
                                        p-5
                                        shadow-lg
                                        shadow-blue-500/5
                                        backdrop-blur-sm
                                        dark:border-slate-800
                                        dark:bg-slate-900/50
                                        sm:h-64
                                    "
                                >
                                    <Image
                                        src={ERP_WORDMARK_SRC}
                                        alt="ERP"
                                        fill
                                        priority
                                        sizes="(max-width: 640px) 100vw, 576px"
                                        className="
                                            object-contain
                                            transition-transform
                                            duration-700
                                            hover:scale-105
                                        "
                                    />
                                </div>

                            </MouseGlow>

                        </TiltCard>
                    </AnimateIn>

                    {/* =================================================
                        MAIN CONTENT
                    ================================================= */}

                    <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">

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
                                    INTRO
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Our enterprise resource planning (ERP)
                                        software gives your people the tools
                                        they need to connect and manage your
                                        entire business, from financial and
                                        supply chain management and from
                                        manufacturing to operations, with the
                                        insight you need to make smart
                                        decisions. Start with what you need
                                        now and easily adapt as your needs
                                        change, in the cloud or on your servers
                                        — the choice is yours.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    BENEFITS HEADING
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p
                                        className="
                                            font-semibold
                                            text-emerald-600
                                            dark:text-emerald-400
                                        "
                                    >
                                        Our ERP systems can drive huge
                                        improvements in the effectiveness of
                                        any organisation by:
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    BENEFITS
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <ul className="space-y-3 pt-1">

                                        {benefits.map((item, index) => (
                                            <li
                                                key={item}
                                                className="
                                                    group
                                                    flex
                                                    gap-3
                                                    rounded-xl
                                                    border
                                                    border-transparent
                                                    p-2
                                                    transition-all
                                                    duration-300
                                                    hover:border-emerald-500/10
                                                    hover:bg-emerald-500/[0.03]
                                                "
                                            >

                                                {/* Number */}
                                                <span
                                                    className="
                                                        mt-1
                                                        flex
                                                        h-6
                                                        w-6
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        bg-blue-500/10
                                                        text-[10px]
                                                        font-semibold
                                                        text-blue-600
                                                        transition-all
                                                        duration-300
                                                        group-hover:scale-110
                                                        group-hover:bg-blue-500
                                                        group-hover:text-white
                                                        dark:text-blue-400
                                                        dark:group-hover:text-white
                                                    "
                                                >
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>

                                                {/* Text */}
                                                <span className="flex-1">
                                                    {item}
                                                </span>

                                            </li>
                                        ))}

                                    </ul>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    PARAGRAPH
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        At Geecon, we strive to deliver a
                                        consistently excellent standard of
                                        service and we take pride in everything
                                        we do. This has enabled us to retain
                                        and grow our client base year on year
                                        and a significant proportion of our
                                        growth can be attributed to happy
                                        clients recommending us to their
                                        colleagues.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    PARAGRAPH
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        We believe that consistency and
                                        continuity is a key aspect of the
                                        service we provide to our clients. We
                                        have an exceptionally low staff
                                        turnover rate — we enjoy what we do.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    PARAGRAPH
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        We&apos;re a close-knit team that offers
                                        a friendly, collaborative and
                                        ultimately helpful approach. We like
                                        innovative ideas and getting things
                                        done.
                                    </p>
                                </StaggerItem>

                            </StaggerContainer>

                        </MouseGlow>

                        {/* =================================================
                            ERP HUB DIAGRAM
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

                            <TiltCard>

                                <MouseGlow className="rounded-2xl">

                                    <div
                                        className="
                                            relative
                                            mx-auto
                                            h-64
                                            w-full
                                            max-w-[260px]
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-slate-200/70
                                            bg-white/60
                                            p-4
                                            shadow-xl
                                            shadow-blue-500/5
                                            backdrop-blur-sm
                                            dark:border-slate-800
                                            dark:bg-slate-900/60
                                        "
                                    >

                                        {/* Soft glow */}
                                        <div
                                            className="
                                                pointer-events-none
                                                absolute
                                                inset-10
                                                rounded-full
                                                bg-blue-500/10
                                                blur-3xl
                                            "
                                        />

                                        <Image
                                            src={ERP_HUB_DIAGRAM_SRC}
                                            alt="ERP hub connecting Manufacturing, Supply Chain, Project Management, CRM, Finance, and HR"
                                            fill
                                            sizes="260px"
                                            className="
                                                relative
                                                z-[1]
                                                object-contain
                                                transition-transform
                                                duration-700
                                                hover:scale-105
                                            "
                                        />

                                    </div>

                                </MouseGlow>

                            </TiltCard>

                        </AnimateIn>

                    </div>

                    {/* =================================================
                        ERP FEATURE CARDS
                    ================================================= */}

                    <AnimateIn delay={0.35}>
                        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {/* Finance */}
                            <TiltCard>
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
                                        transition-shadow
                                        duration-300
                                        hover:shadow-xl
                                        hover:shadow-blue-500/5
                                        dark:border-slate-800
                                        dark:bg-slate-900/50
                                    "
                                >
                                    <div
                                        className="
                                            mb-4
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-blue-500/10
                                            text-xs
                                            font-semibold
                                            text-blue-600
                                            dark:text-blue-400
                                        "
                                    >
                                        01
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Finance
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Manage financial data and make
                                        informed business decisions.
                                    </p>

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
                            </TiltCard>

                            {/* Supply Chain */}
                            <TiltCard>
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
                                        transition-shadow
                                        duration-300
                                        hover:shadow-xl
                                        hover:shadow-cyan-500/5
                                        dark:border-slate-800
                                        dark:bg-slate-900/50
                                    "
                                >
                                    <div
                                        className="
                                            mb-4
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-cyan-500/10
                                            text-xs
                                            font-semibold
                                            text-cyan-600
                                            dark:text-cyan-400
                                        "
                                    >
                                        02
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Supply Chain
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Connect supply chain operations and
                                        improve overall efficiency.
                                    </p>

                                    <div
                                        className="
                                            mt-4
                                            h-px
                                            w-8
                                            bg-cyan-500/40
                                            transition-all
                                            duration-300
                                            group-hover:w-14
                                        "
                                    />
                                </div>
                            </TiltCard>

                            {/* CRM */}
                            <TiltCard>
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
                                        transition-shadow
                                        duration-300
                                        hover:shadow-xl
                                        hover:shadow-indigo-500/5
                                        dark:border-slate-800
                                        dark:bg-slate-900/50
                                    "
                                >
                                    <div
                                        className="
                                            mb-4
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-indigo-500/10
                                            text-xs
                                            font-semibold
                                            text-indigo-600
                                            dark:text-indigo-400
                                        "
                                    >
                                        03
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        CRM
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Build stronger customer relationships
                                        with connected data.
                                    </p>

                                    <div
                                        className="
                                            mt-4
                                            h-px
                                            w-8
                                            bg-indigo-500/40
                                            transition-all
                                            duration-300
                                            group-hover:w-14
                                        "
                                    />
                                </div>
                            </TiltCard>

                            {/* Human Resources */}
                            <TiltCard>
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
                                        transition-shadow
                                        duration-300
                                        hover:shadow-xl
                                        hover:shadow-emerald-500/5
                                        dark:border-slate-800
                                        dark:bg-slate-900/50
                                    "
                                >
                                    <div
                                        className="
                                            mb-4
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-emerald-500/10
                                            text-xs
                                            font-semibold
                                            text-emerald-600
                                            dark:text-emerald-400
                                        "
                                    >
                                        04
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Human Resources
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Manage people, processes and resources
                                        through one connected platform.
                                    </p>

                                    <div
                                        className="
                                            mt-4
                                            h-px
                                            w-8
                                            bg-emerald-500/40
                                            transition-all
                                            duration-300
                                            group-hover:w-14
                                        "
                                    />
                                </div>
                            </TiltCard>

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