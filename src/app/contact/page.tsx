import Image from "next/image";
import { GraduationCap, Briefcase, CheckCircle2 } from "lucide-react";

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

const BANNER_SRC = "/corp-train.png";

const training = [
    "Customer Service Training",
    "Trainer Training",
    "Skills Development Programmes",
    "Tourism & Hospitality Training",
    "Customised Training Programme Design",
];

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

export default function CorporateTrainingPage() {
    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-white dark:bg-slate-950">
            <Navbar />

            <main className="relative flex-1">

                {/* ================= BACKGROUND ================= */}

                <div className="pointer-events-none absolute inset-0 overflow-hidden">

                    {/* Grid */}
                    <div
                        className="
                            absolute inset-0
                            bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
                            bg-[size:48px_48px]
                            opacity-20
                            dark:opacity-[0.06]
                        "
                    />

                    {/* Main radial glow */}
                    <div
                        className="
                            absolute inset-0
                            bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.16),transparent_55%)]
                            dark:bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_55%)]
                        "
                    />

                    {/* Bottom glow */}
                    <div
                        className="
                            absolute bottom-0 left-1/2
                            h-[500px] w-[700px]
                            -translate-x-1/2
                            rounded-full
                            bg-blue-500/5
                            blur-[120px]
                        "
                    />

                    <FloatingBlob
                        className="-right-20 top-10 h-72 w-72"
                        color="bg-blue-400/10"
                        duration={16}
                    />

                    <FloatingBlob
                        className="-left-20 top-[500px] h-72 w-72"
                        color="bg-cyan-400/10"
                        duration={20}
                    />
                </div>

                {/* ================= CONTENT ================= */}

                <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-20">

                    {/* ================= HEADING ================= */}

                    <AnimateIn>
                        <div className="text-center">

                            <AnimatedHeading
                                text="Corporate Training"
                                as="h1"
                                className="
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-slate-900
                                    dark:text-white
                                    sm:text-4xl
                                    lg:text-5xl
                                "
                            />

                            <p
                                className="
                                    mx-auto
                                    mt-4
                                    max-w-2xl
                                    text-sm
                                    leading-7
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                Empowering teams through strategic training,
                                professional development and business consultancy.
                            </p>

                            <div className="mx-auto mt-5 h-px w-20 bg-blue-600 dark:bg-blue-400" />
                        </div>
                    </AnimateIn>

                    {/* ================= HERO IMAGE ================= */}

                    <AnimateIn delay={0.15}>
                        <MouseGlow className="mt-12 rounded-3xl">

                            <TiltCard>
                                <div
                                    className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-3xl
                                        border
                                        border-slate-200/60
                                        bg-white/70
                                        p-[2px]
                                        shadow-xl
                                        shadow-blue-900/5
                                        backdrop-blur-xl
                                        dark:border-slate-800/60
                                        dark:bg-slate-900/70
                                    "
                                >

                                    {/* Animated gradient border */}
                                    <div
                                        className="
                                            pointer-events-none
                                            absolute inset-0
                                            rounded-3xl
                                            bg-gradient-to-r
                                            from-blue-500/20
                                            via-cyan-400/20
                                            to-purple-500/20
                                            opacity-0
                                            transition-opacity
                                            duration-500
                                            group-hover:opacity-100
                                        "
                                    />

                                    <div
                                        className="
                                            relative
                                            h-64
                                            overflow-hidden
                                            rounded-[22px]
                                            bg-slate-50
                                            dark:bg-slate-900
                                            sm:h-80
                                        "
                                    >

                                        <Image
                                            src={BANNER_SRC}
                                            alt="Corporate Training"
                                            fill
                                            priority
                                            sizes="(max-width: 768px) 100vw, 1200px"
                                            className="
                                                object-cover
                                                transition-transform
                                                duration-700
                                                ease-out
                                                group-hover:scale-[1.04]
                                            "
                                        />

                                        {/* Image overlay */}
                                        <div
                                            className="
                                                pointer-events-none
                                                absolute inset-0
                                                bg-gradient-to-t
                                                from-slate-950/20
                                                via-transparent
                                                to-transparent
                                            "
                                        />

                                        {/* Shine */}
                                        <div
                                            className="
                                                pointer-events-none
                                                absolute -left-[100%]
                                                top-0
                                                h-full
                                                w-1/2
                                                skew-x-[-20deg]
                                                bg-gradient-to-r
                                                from-transparent
                                                via-white/20
                                                to-transparent
                                                transition-all
                                                duration-1000
                                                group-hover:left-[150%]
                                            "
                                        />
                                    </div>
                                </div>
                            </TiltCard>

                        </MouseGlow>
                    </AnimateIn>

                    {/* ================= INTRO ================= */}

                    <AnimateIn delay={0.2}>

                        <div className="mx-auto mt-10 max-w-4xl">

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200/60
                                    bg-white/60
                                    p-6
                                    text-sm
                                    leading-7
                                    text-slate-500
                                    shadow-sm
                                    backdrop-blur-xl
                                    dark:border-slate-800/60
                                    dark:bg-slate-900/60
                                    dark:text-slate-400
                                    sm:p-8
                                "
                            >
                                <p>
                                    Our training &amp; consultancy services are designed
                                    to assist you in the development of a cutting edge
                                    workforce so that you or your team can excel in
                                    today&apos;s competitive environment.
                                </p>

                                <p className="mt-4">
                                    We offer a wide variety of solutions either on an
                                    in-house basis or through our open programmes.
                                    Courses can be specifically tailored to meet your
                                    needs or you can choose from our extensive range
                                    of programmes.
                                </p>

                                <p className="mt-4 font-medium text-slate-700 dark:text-slate-200">
                                    If you require support in the following areas,
                                    then you have come to the right place.
                                </p>
                            </div>

                        </div>

                    </AnimateIn>

                    {/* ================= CARDS ================= */}

                    <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2">

                        {/* TRAINING */}

                        <StaggerItem>

                            <MouseGlow className="h-full rounded-3xl">

                                <TiltCard className="h-full">

                                    <div
                                        className="
                                            group
                                            h-full
                                            rounded-3xl
                                            border
                                            border-slate-200/70
                                            bg-white/70
                                            p-7
                                            shadow-lg
                                            shadow-slate-900/5
                                            backdrop-blur-xl
                                            transition-all
                                            duration-500
                                            hover:shadow-2xl
                                            hover:shadow-blue-900/10
                                            dark:border-slate-800/70
                                            dark:bg-slate-900/70
                                        "
                                    >

                                        {/* Header */}

                                        <div className="flex items-center gap-4">

                                            <div
                                                className="
                                                    flex
                                                    h-12
                                                    w-12
                                                    items-center
                                                    justify-center
                                                    rounded-2xl
                                                    bg-blue-500/10
                                                    text-blue-600
                                                    transition-all
                                                    duration-500
                                                    group-hover:scale-110
                                                    group-hover:rotate-3
                                                    dark:bg-blue-400/10
                                                    dark:text-blue-400
                                                "
                                            >
                                                <GraduationCap size={23} />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
                                                    Professional Development
                                                </p>

                                                <h3
                                                    className="
                                                        mt-1
                                                        text-lg
                                                        font-bold
                                                        text-slate-900
                                                        dark:text-white
                                                    "
                                                >
                                                    Training
                                                </h3>
                                            </div>

                                        </div>

                                        {/* List */}

                                        <div className="mt-7">

                                            <StaggerContainer className="space-y-3">

                                                {training.map((item) => (
                                                    <StaggerItem key={item}>

                                                        <div
                                                            className="
                                                                group/item
                                                                flex
                                                                items-start
                                                                gap-3
                                                                rounded-xl
                                                                border
                                                                border-transparent
                                                                p-2
                                                                transition-all
                                                                duration-300
                                                                hover:border-blue-100
                                                                hover:bg-blue-50/60
                                                                dark:hover:border-blue-900/40
                                                                dark:hover:bg-blue-950/30
                                                            "
                                                        >

                                                            <CheckCircle2
                                                                size={17}
                                                                className="
                                                                    mt-0.5
                                                                    shrink-0
                                                                    text-blue-500
                                                                    transition-transform
                                                                    duration-300
                                                                    group-hover/item:scale-110
                                                                "
                                                            />

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

                                    </div>

                                </TiltCard>

                            </MouseGlow>

                        </StaggerItem>

                        {/* CONSULTANCY */}

                        <StaggerItem>

                            <MouseGlow className="h-full rounded-3xl">

                                <TiltCard className="h-full">

                                    <div
                                        className="
                                            group
                                            h-full
                                            rounded-3xl
                                            border
                                            border-slate-200/70
                                            bg-white/70
                                            p-7
                                            shadow-lg
                                            shadow-slate-900/5
                                            backdrop-blur-xl
                                            transition-all
                                            duration-500
                                            hover:shadow-2xl
                                            hover:shadow-emerald-900/10
                                            dark:border-slate-800/70
                                            dark:bg-slate-900/70
                                        "
                                    >

                                        {/* Header */}

                                        <div className="flex items-center gap-4">

                                            <div
                                                className="
                                                    flex
                                                    h-12
                                                    w-12
                                                    items-center
                                                    justify-center
                                                    rounded-2xl
                                                    bg-emerald-500/10
                                                    text-emerald-600
                                                    transition-all
                                                    duration-500
                                                    group-hover:scale-110
                                                    group-hover:-rotate-3
                                                    dark:bg-emerald-400/10
                                                    dark:text-emerald-400
                                                "
                                            >
                                                <Briefcase size={22} />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-500">
                                                    Business Growth
                                                </p>

                                                <h3
                                                    className="
                                                        mt-1
                                                        text-lg
                                                        font-bold
                                                        text-slate-900
                                                        dark:text-white
                                                    "
                                                >
                                                    Consultancy
                                                </h3>
                                            </div>

                                        </div>

                                        {/* List */}

                                        <div className="mt-7">

                                            <StaggerContainer className="space-y-3">

                                                {consultancy.map((item) => (
                                                    <StaggerItem key={item}>

                                                        <div
                                                            className="
                                                                group/item
                                                                flex
                                                                items-start
                                                                gap-3
                                                                rounded-xl
                                                                border
                                                                border-transparent
                                                                p-2
                                                                transition-all
                                                                duration-300
                                                                hover:border-emerald-100
                                                                hover:bg-emerald-50/60
                                                                dark:hover:border-emerald-900/40
                                                                dark:hover:bg-emerald-950/30
                                                            "
                                                        >

                                                            <CheckCircle2
                                                                size={17}
                                                                className="
                                                                    mt-0.5
                                                                    shrink-0
                                                                    text-emerald-500
                                                                    transition-transform
                                                                    duration-300
                                                                    group-hover/item:scale-110
                                                                "
                                                            />

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

                                    </div>

                                </TiltCard>

                            </MouseGlow>

                        </StaggerItem>

                    </StaggerContainer>

                    {/* ================= BOTTOM CTA ================= */}

                    <AnimateIn delay={0.3}>

                        <div
                            className="
                                relative
                                mt-14
                                overflow-hidden
                                rounded-3xl
                                border
                                border-blue-200/50
                                bg-gradient-to-r
                                from-blue-600/10
                                via-cyan-500/10
                                to-purple-500/10
                                p-8
                                text-center
                                backdrop-blur-xl
                                dark:border-blue-900/40
                            "
                        >

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    left-1/2
                                    top-0
                                    h-32
                                    w-64
                                    -translate-x-1/2
                                    rounded-full
                                    bg-blue-500/10
                                    blur-3xl
                                "
                            />

                            <h2
                                className="
                                    relative
                                    text-xl
                                    font-bold
                                    text-slate-900
                                    dark:text-white
                                "
                            >
                                Build a stronger, smarter workforce
                            </h2>

                            <p
                                className="
                                    relative
                                    mx-auto
                                    mt-2
                                    max-w-xl
                                    text-sm
                                    leading-6
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                Develop your team with practical training and
                                strategic consultancy designed around your business.
                            </p>

                        </div>

                    </AnimateIn>

                </section>
            </main>

            <Footer />
        </div>
    );
}