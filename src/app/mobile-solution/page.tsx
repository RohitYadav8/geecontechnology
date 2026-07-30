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

const BANNER_SRC = "/mobile-solution.png";
const PHONE_ICON_SRC = "/mobile-Solution-Service.png";

// ---------------------------------------------------------
// Benefits
// ---------------------------------------------------------

const benefits = [
    "Accelerated Solutions: decrease time-to-market through facilitated collaboration",
    "Flexibility and Versatility: through incremental and modular delivery",
    "Cost Effectiveness: a per-device-payment model for better cash flow",
    "Scale and Reach: end-to-end service and delivery",
];

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function MobileSolutionPage() {
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
                    RADIAL GLOW
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
                    className="right-1/4 top-[700px] h-48 w-48"
                    color="bg-purple-400/5"
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
                            text="Mobile Solution"
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
                        <MouseGlow className="mt-6 rounded-2xl">

                            <div
                                className="
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-blue-600/40
                                    via-slate-400/30
                                    to-purple-400/40
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
                                        alt="Mobile Solution"
                                        fill
                                        priority
                                        sizes="(max-width: 640px) 100vw, 1152px"
                                        className="
                                            object-cover
                                            transition-transform
                                            duration-1000
                                            ease-out
                                            hover:scale-[1.04]
                                        "
                                    />

                                    {/* Overlay */}
                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-blue-950/20
                                            via-transparent
                                            to-white/10
                                            dark:from-blue-950/30
                                        "
                                    />
                                </div>
                            </div>

                        </MouseGlow>
                    </AnimateIn>

                    {/* =================================================
                        MAIN CONTENT
                    ================================================= */}

                    <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">

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
                                        Mobile solutions have become central
                                        to the way enterprises conduct their
                                        business, enabling customers and
                                        employees to be always-on and even
                                        powering the next wave of connected
                                        services — the Internet of Things.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    BUSINESS ADVANTAGE HEADING
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p
                                        className="
                                            font-semibold
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        From Mobile Opportunity to Business
                                        Advantage
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    BUSINESS ADVANTAGE
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        We help enterprises harness mobile
                                        opportunities with customers, from
                                        marketing campaigns to sales
                                        transactions and customer service. A
                                        coherent &ldquo;B2C&rdquo; mobile
                                        strategy and execution creates
                                        opportunities to build brand awareness,
                                        enhance services, develop a fuller
                                        understanding of customer needs and
                                        reach new customers.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    EMPLOYEE MOBILITY
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Employees today want mobile solutions
                                        that enable them to be always
                                        connected to any device in any
                                        location. Enterprise mobility results
                                        in accelerated processes, more
                                        flexible working practices, greater
                                        employee productivity and a workforce
                                        proud of its tools. We help clients
                                        with their &ldquo;B2E&rdquo;
                                        strategies to unleash and manage their
                                        employees&apos; potential.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    BENEFITS HEADING
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p
                                        className="
                                            font-semibold
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        Your Benefits
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    BENEFITS LIST
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <ul className="space-y-3">
                                        {benefits.map((item, index) => (
                                            <li
                                                key={item}
                                                className="
                                                    group
                                                    flex
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2
                                                    transition-all
                                                    duration-300
                                                    hover:translate-x-1
                                                    hover:bg-blue-500/5
                                                    dark:hover:bg-blue-400/5
                                                "
                                            >
                                                {/* Number */}
                                                <span
                                                    className="
                                                        flex
                                                        h-6
                                                        w-6
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-blue-500/10
                                                        text-[10px]
                                                        font-semibold
                                                        text-blue-600
                                                        transition-all
                                                        duration-300
                                                        group-hover:bg-blue-600
                                                        group-hover:text-white
                                                        dark:text-blue-400
                                                        dark:group-hover:text-white
                                                    "
                                                >
                                                    {index + 1}
                                                </span>

                                                {/* Text */}
                                                <span className="pt-0.5">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    MOBILE DEVELOPMENT
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Geecon offers design and development
                                        services for mobile apps. Based on
                                        your requirements we produce apps
                                        which can be standalone or integrate
                                        with other data sources using secure
                                        management systems. Our mobile
                                        application development allows for
                                        apps to be output for native iOS and
                                        Android platforms.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    APP EXPERIENCE
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        At Geecon all mobile apps are developed
                                        to deliver content and functionality
                                        to users through an intuitive and
                                        optimised interface. Our team of
                                        experts will work with you to ensure
                                        the latest smartphone features are
                                        integrated with your mobile app.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    TEAM
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Partner with a group of thinkers,
                                        makers, code ninjas and problem solvers
                                        that believe in building software
                                        products that have real purpose.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    FINAL CONTENT
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        We build custom software products that
                                        drive revenue and provide seamless
                                        customer experiences for your
                                        business.
                                    </p>
                                </StaggerItem>

                            </StaggerContainer>

                        </MouseGlow>

                        {/* =================================================
                            RIGHT IMAGE
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
                                        h-52
                                        w-52
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
                                        src={PHONE_ICON_SRC}
                                        alt="Mobile applications"
                                        fill
                                        sizes="208px"
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
                        BOTTOM HIGHLIGHT CARDS
                    ================================================= */}

                    <AnimateIn delay={0.35}>
                        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {/* Card 01 */}
                            <MouseGlow className="rounded-2xl">
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
                                        01
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Faster Solutions
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Accelerate your mobile product
                                        development and time-to-market.
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
                            </MouseGlow>

                            {/* Card 02 */}
                            <MouseGlow className="rounded-2xl">
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
                                        hover:shadow-purple-500/5
                                        dark:border-slate-800
                                        dark:bg-slate-900/50
                                    "
                                >
                                    <div
                                        className="
                                            mb-4
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-purple-500/10
                                            text-sm
                                            font-semibold
                                            text-purple-600
                                            dark:text-purple-400
                                        "
                                    >
                                        02
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Flexible Apps
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Build modular and flexible mobile
                                        applications for your business.
                                    </p>

                                    <div
                                        className="
                                            mt-4
                                            h-px
                                            w-8
                                            bg-purple-500/40
                                            transition-all
                                            duration-300
                                            group-hover:w-14
                                        "
                                    />
                                </div>
                            </MouseGlow>

                            {/* Card 03 */}
                            <MouseGlow className="rounded-2xl">
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
                                        hover:shadow-cyan-500/5
                                        dark:border-slate-800
                                        dark:bg-slate-900/50
                                    "
                                >
                                    <div
                                        className="
                                            mb-4
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-cyan-500/10
                                            text-sm
                                            font-semibold
                                            text-cyan-600
                                            dark:text-cyan-400
                                        "
                                    >
                                        03
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Native Platforms
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Optimised applications for modern iOS
                                        and Android devices.
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
                            </MouseGlow>

                            {/* Card 04 */}
                            <MouseGlow className="rounded-2xl">
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
                                        hover:shadow-indigo-500/5
                                        dark:border-slate-800
                                        dark:bg-slate-900/50
                                    "
                                >
                                    <div
                                        className="
                                            mb-4
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-indigo-500/10
                                            text-sm
                                            font-semibold
                                            text-indigo-600
                                            dark:text-indigo-400
                                        "
                                    >
                                        04
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Better Experience
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Deliver seamless and intuitive
                                        experiences to your customers.
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
                            </MouseGlow>

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