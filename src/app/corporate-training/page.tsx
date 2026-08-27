import Image from "next/image";
import { GraduationCap, Briefcase, ArrowUpRight } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { TiltCard } from "../../../components/tilt-card";
import { MouseGlow } from "../../../components/mouse-glow";
import {
    StaggerContainer,
    StaggerItem,
} from "../../../components/stagger-container";

// ---------------------------------------------------------
// Images
// ---------------------------------------------------------

const BANNER_SRC = "/Training.png";

// ---------------------------------------------------------
// Training
// ---------------------------------------------------------

const training = [
    "Customer Service Training",
    "Trainer Training",
    "Skills Development Programmes",
    "Tourism & Hospitality Training",
    "Customised Training Programme Design",
];

// ---------------------------------------------------------
// Consultancy
// ---------------------------------------------------------

const consultancy = [
    "Group Facilitation",
    "Creating a Customer Focused Culture",
    "Service System Development",
    "Mystery Shopping",
    "Training Needs Analysis",
    "Induction Programme Development",
    "HR Strategy & System Development",
    "Tourism Business Development",
    "Innovation Support",
];

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function CorporateTrainingPage() {
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
                    BACKGROUND GLOW
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
                    className="right-1/3 top-[850px] h-56 w-56"
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
                            text="Corporate Training"
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
                        HERO BANNER
                    ================================================= */}

                    <AnimateIn delay={0.1}>

                        <TiltCard className="mt-7">

                            <MouseGlow className="rounded-2xl">

                                <div
                                    className="
                                        rounded-2xl
                                        bg-gradient-to-br
                                        from-slate-400/40
                                        via-blue-300/30
                                        to-slate-500/40
                                        p-[2px]
                                    "
                                >

                                    <div
                                        className="
                                            relative
                                            h-56
                                            w-full
                                            overflow-hidden
                                            rounded-2xl
                                            bg-white
                                            dark:bg-slate-900
                                            sm:h-72
                                        "
                                    >

                                        <Image
                                            src={BANNER_SRC}
                                            alt="Corporate Training"
                                            fill
                                            priority
                                            sizes="100vw"
                                            className="
                                                object-cover
                                                transition-transform
                                                duration-1000
                                                hover:scale-105
                                            "
                                        />

                                        {/* Image overlay */}

                                        <div
                                            className="
                                                pointer-events-none
                                                absolute
                                                inset-0
                                                bg-gradient-to-t
                                                from-slate-950/30
                                                via-transparent
                                                to-transparent
                                            "
                                        />

                                    </div>

                                </div>

                            </MouseGlow>

                        </TiltCard>

                    </AnimateIn>

                    {/* =================================================
                        INTRODUCTION
                    ================================================= */}

                    <AnimateIn delay={0.15}>

                        <MouseGlow className="mt-8 rounded-2xl">

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200/60
                                    bg-white/50
                                    p-6
                                    backdrop-blur-xl
                                    dark:border-slate-800/60
                                    dark:bg-slate-900/50
                                    sm:p-7
                                "
                            >

                                <div className="flex gap-4">

                                    {/* Accent line */}

                                    <div
                                        className="
                                            hidden
                                            w-1
                                            shrink-0
                                            rounded-full
                                            bg-gradient-to-b
                                            from-blue-500
                                            via-cyan-400
                                            to-emerald-400
                                            sm:block
                                        "
                                    />

                                    <p
                                        className="
                                            max-w-4xl
                                            text-sm
                                            leading-7
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        Our training &amp; consultancy services
                                        are designed to assist you in the
                                        development of a cutting edge workforce
                                        so that you or your team can excel in
                                        today&apos;s competitive environment.
                                        We offer a wide variety of solutions
                                        either on an in-house basis or through
                                        our open programmes. Courses can be
                                        specifically tailored to meet your needs
                                        or you can choose from our extensive
                                        range of programmes. If you require
                                        support in the following areas then you
                                        have come to the right place:
                                    </p>

                                </div>

                            </div>

                        </MouseGlow>

                    </AnimateIn>

                    {/* =================================================
                        SECTION HEADING
                    ================================================= */}

                    <AnimateIn delay={0.2}>

                        <div className="mt-12">

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.25em]
                                    text-emerald-600
                                    dark:text-emerald-400
                                "
                            >
                                What We Offer
                            </p>

                            <h2
                                className="
                                    mt-2
                                    text-xl
                                    font-semibold
                                    text-slate-900
                                    dark:text-white
                                    sm:text-2xl
                                "
                            >
                                Training &amp; Consultancy
                            </h2>

                            <div
                                className="
                                    mt-3
                                    h-px
                                    w-16
                                    bg-gradient-to-r
                                    from-blue-500
                                    to-emerald-400
                                "
                            />

                        </div>

                    </AnimateIn>

                    {/* =================================================
                        CARDS
                    ================================================= */}

                    <div className="mt-7 grid gap-6 lg:grid-cols-2">

                        {/* =================================================
                            TRAINING CARD
                        ================================================= */}

                        <TiltCard>

                            <MouseGlow className="h-full rounded-2xl">

                                <div
                                    className="
                                        group
                                        h-full
                                        rounded-2xl
                                        border
                                        border-slate-200/70
                                        bg-white/60
                                        p-6
                                        shadow-sm
                                        backdrop-blur-xl
                                        transition-all
                                        duration-500
                                        hover:border-emerald-500/30
                                        hover:shadow-2xl
                                        hover:shadow-emerald-500/5
                                        dark:border-slate-800/70
                                        dark:bg-slate-900/60
                                    "
                                >

                                    {/* Card header */}

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div
                                                className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-emerald-500/10
                                                    text-emerald-600
                                                    transition-all
                                                    duration-500
                                                    group-hover:scale-110
                                                    group-hover:rotate-3
                                                    dark:bg-emerald-400/10
                                                    dark:text-emerald-400
                                                "
                                            >
                                                <GraduationCap size={21} />
                                            </div>

                                            <div>
                                                <p
                                                    className="
                                                        text-[10px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-slate-400
                                                    "
                                                >
                                                    Learning
                                                </p>

                                                <h3
                                                    className="
                                                        mt-1
                                                        text-base
                                                        font-bold
                                                        uppercase
                                                        tracking-wide
                                                        text-slate-900
                                                        dark:text-white
                                                    "
                                                >
                                                    Training
                                                </h3>
                                            </div>

                                        </div>

                                        <ArrowUpRight
                                            size={18}
                                            className="
                                                text-slate-300
                                                transition-all
                                                duration-300
                                                group-hover:-translate-y-1
                                                group-hover:translate-x-1
                                                group-hover:text-emerald-500
                                            "
                                        />

                                    </div>

                                    {/* Divider */}

                                    <div
                                        className="
                                            my-5
                                            h-px
                                            w-full
                                            bg-slate-200/70
                                            dark:bg-slate-800
                                        "
                                    />

                                    {/* Training items */}

                                    <StaggerContainer className="space-y-3">

                                        {training.map((item, index) => (

                                            <StaggerItem key={item}>

                                                <div
                                                    className="
                                                        group/item
                                                        flex
                                                        items-start
                                                        gap-3
                                                        rounded-xl
                                                        p-2
                                                        transition-all
                                                        duration-300
                                                        hover:bg-emerald-500/[0.04]
                                                    "
                                                >

                                                    {/* Number */}

                                                    <span
                                                        className="
                                                            mt-0.5
                                                            flex
                                                            h-6
                                                            w-6
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            bg-emerald-500/10
                                                            text-[10px]
                                                            font-semibold
                                                            text-emerald-600
                                                            transition-all
                                                            duration-300
                                                            group-hover/item:scale-110
                                                            group-hover/item:bg-emerald-500
                                                            group-hover/item:text-white
                                                            dark:text-emerald-400
                                                        "
                                                    >
                                                        {String(index + 1).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </span>

                                                    <span
                                                        className="
                                                            text-sm
                                                            leading-6
                                                            text-slate-500
                                                            dark:text-slate-400
                                                        "
                                                    >
                                                        {item}
                                                    </span>

                                                </div>

                                            </StaggerItem>

                                        ))}

                                    </StaggerContainer>

                                </div>

                            </MouseGlow>

                        </TiltCard>

                        {/* =================================================
                            CONSULTANCY CARD
                        ================================================= */}

                        <TiltCard>

                            <MouseGlow className="h-full rounded-2xl">

                                <div
                                    className="
                                        group
                                        h-full
                                        rounded-2xl
                                        border
                                        border-slate-200/70
                                        bg-white/60
                                        p-6
                                        shadow-sm
                                        backdrop-blur-xl
                                        transition-all
                                        duration-500
                                        hover:border-blue-500/30
                                        hover:shadow-2xl
                                        hover:shadow-blue-500/5
                                        dark:border-slate-800/70
                                        dark:bg-slate-900/60
                                    "
                                >

                                    {/* Card header */}

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div
                                                className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-blue-500/10
                                                    text-blue-600
                                                    transition-all
                                                    duration-500
                                                    group-hover:scale-110
                                                    group-hover:-rotate-3
                                                    dark:bg-blue-400/10
                                                    dark:text-blue-400
                                                "
                                            >
                                                <Briefcase size={21} />
                                            </div>

                                            <div>
                                                <p
                                                    className="
                                                        text-[10px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-slate-400
                                                    "
                                                >
                                                    Business
                                                </p>

                                                <h3
                                                    className="
                                                        mt-1
                                                        text-base
                                                        font-bold
                                                        uppercase
                                                        tracking-wide
                                                        text-slate-900
                                                        dark:text-white
                                                    "
                                                >
                                                    Consultancy
                                                </h3>
                                            </div>

                                        </div>

                                        <ArrowUpRight
                                            size={18}
                                            className="
                                                text-slate-300
                                                transition-all
                                                duration-300
                                                group-hover:-translate-y-1
                                                group-hover:translate-x-1
                                                group-hover:text-blue-500
                                            "
                                        />

                                    </div>

                                    {/* Divider */}

                                    <div
                                        className="
                                            my-5
                                            h-px
                                            w-full
                                            bg-slate-200/70
                                            dark:bg-slate-800
                                        "
                                    />

                                    {/* Consultancy items */}

                                    <StaggerContainer className="space-y-3">

                                        {consultancy.map((item, index) => (

                                            <StaggerItem key={item}>

                                                <div
                                                    className="
                                                        group/item
                                                        flex
                                                        items-start
                                                        gap-3
                                                        rounded-xl
                                                        p-2
                                                        transition-all
                                                        duration-300
                                                        hover:bg-blue-500/[0.04]
                                                    "
                                                >

                                                    {/* Number */}

                                                    <span
                                                        className="
                                                            mt-0.5
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
                                                            group-hover/item:scale-110
                                                            group-hover/item:bg-blue-500
                                                            group-hover/item:text-white
                                                            dark:text-blue-400
                                                        "
                                                    >
                                                        {String(index + 1).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </span>

                                                    <span
                                                        className="
                                                            text-sm
                                                            leading-6
                                                            text-slate-500
                                                            dark:text-slate-400
                                                        "
                                                    >
                                                        {item}
                                                    </span>

                                                </div>

                                            </StaggerItem>

                                        ))}

                                    </StaggerContainer>

                                </div>

                            </MouseGlow>

                        </TiltCard>

                    </div>

                    {/* =================================================
                        BOTTOM CTA / MESSAGE
                    ================================================= */}

                    <AnimateIn delay={0.35}>

                        <MouseGlow className="mt-10 rounded-2xl">

                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200/60
                                    bg-gradient-to-r
                                    from-blue-500/[0.06]
                                    via-cyan-500/[0.04]
                                    to-emerald-500/[0.06]
                                    p-6
                                    dark:border-slate-800/60
                                "
                            >

                                {/* Decorative glow */}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -right-20
                                        -top-20
                                        h-40
                                        w-40
                                        rounded-full
                                        bg-blue-500/10
                                        blur-3xl
                                    "
                                />

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -bottom-20
                                        -left-20
                                        h-40
                                        w-40
                                        rounded-full
                                        bg-emerald-500/10
                                        blur-3xl
                                    "
                                />

                                <div className="relative">

                                    <p
                                        className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-[0.2em]
                                            text-emerald-600
                                            dark:text-emerald-400
                                        "
                                    >
                                        Build Better Teams
                                    </p>

                                    <h3
                                        className="
                                            mt-2
                                            text-lg
                                            font-semibold
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        Empower your workforce with the right
                                        skills and strategies.
                                    </h3>

                                    <p
                                        className="
                                            mt-2
                                            max-w-2xl
                                            text-sm
                                            leading-6
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        Our customised training and consultancy
                                        programmes are designed around your
                                        organisation&apos;s goals, people and
                                        challenges.
                                    </p>

                                </div>

                            </div>

                        </MouseGlow>

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