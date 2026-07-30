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

const BANNER_SRC = "/internet-technology.png";
const GLOBE_ICON_SRC = "/internet-technology-1.png";

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function InternetTechnologyPage() {
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
                            text="Internet Technology"
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
                                    via-cyan-400/30
                                    to-slate-400/40
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
                                        alt="Internet Technology"
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

                                    {/* Banner overlay */}
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
                        MAIN CONTENT GRID
                    ================================================= */}

                    <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">

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
                                    CONTENT 01
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Geecon is your expert in Internet
                                        Technology. We work closely with you
                                        and your staff to uncover frustrations
                                        with current operations and processes.
                                        Our technological expertise allows us
                                        to create custom web solutions that
                                        will ease these points of pain to make
                                        your business more efficient. Our
                                        focus is to create an online
                                        environment that stimulates your
                                        business&apos;s success and growth.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    CONTENT 02
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        A great web solution is just the first
                                        step in the process to online success.
                                        We can develop a great website that is
                                        easy to use, meets your
                                        organization&apos;s needs and is
                                        visually impressive. We also need to
                                        make sure that your customers are
                                        finding your website online. This is
                                        where Internet marketing comes into
                                        play.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    CONTENT 03
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        With over 10 years experience in IT
                                        and web technologies, we are held in
                                        high regard with our customers due to
                                        our flexible and innovative approach
                                        in providing business driven
                                        solutions matching your needs.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    CONTENT 04
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Offering a range of services from web
                                        strategy, through delivery of website
                                        design, development and configuration
                                        to the management of an online
                                        presence, we can take your business
                                        objectives and requirements and design
                                        practical and cost effective solutions
                                        to deliver to your needs and provide
                                        measurable value.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    CONTENT 05
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        We offer personal touch to all of our
                                        customers. For this, we allocate a
                                        dedicated manager to every project
                                        that keep communications going
                                        uninterruptedly from the outset. This
                                        approach helps us rapidly respond to
                                        changes initiated by our customers,
                                        adjust project team size when
                                        necessary, provide all the support,
                                        and ensure further project development.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    CONTENT 06
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        We build custom software products that
                                        drive revenue and provide seamless
                                        customer experiences for your
                                        business.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    CONTENT 07
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Driving revenue means staying tied to
                                        business priorities. We do this by
                                        identifying opportunities to improve
                                        your customer experience and monetize
                                        your existing data and content.
                                    </p>
                                </StaggerItem>

                            </StaggerContainer>

                        </MouseGlow>

                        {/* =================================================
                            RIGHT SIDEBAR / GLOBE
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
                                        h-48
                                        w-48
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

                                    {/* Outer glow */}
                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-4
                                            rounded-full
                                            bg-blue-500/10
                                            blur-2xl
                                        "
                                    />

                                    <Image
                                        src={GLOBE_ICON_SRC}
                                        alt="Global connectivity"
                                        fill
                                        sizes="192px"
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

                            </TiltCard>

                        </AnimateIn>

                    </div>

                    {/* =================================================
                        BOTTOM FEATURE CARDS
                    ================================================= */}

                    <AnimateIn delay={0.35}>
                        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {/* Web Strategy */}
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
                                        Web Strategy
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Build a strong digital strategy aligned
                                        with your business goals.
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

                            {/* Web Development */}
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
                                        02
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Web Development
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Modern and scalable web solutions built
                                        around your requirements.
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

                            {/* Internet Marketing */}
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
                                        03
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Internet Marketing
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Improve your online visibility and reach
                                        the right customers.
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

                            {/* Business Growth */}
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
                                        04
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Business Growth
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        Turn technology into measurable business
                                        value and growth.
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