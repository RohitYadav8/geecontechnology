import Image from "next/image";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";

import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { BrochureForm } from "../../../components/brochure-form";

import { MouseGlow } from "../../../components/mouse-glow";
import { TiltCard } from "../../../components/tilt-card";

import {
    StaggerContainer,
    StaggerItem,
} from "../../../components/stagger-container";

// ---------------------------------------------------------
// Images
// ---------------------------------------------------------

const BANNER_SRC = "/hr-solutions.png";

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function ResourceHrManagementPage() {
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
                    className="right-1/4 top-[800px] h-52 w-52"
                    color="bg-indigo-400/5"
                    duration={18}
                />

                {/* =================================================
                    PAGE SECTION
                ================================================= */}

                <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-20">

                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <AnimateIn delay={0.05}>
                        <AnimatedHeading
                            text="Resource & HR Management"
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
                        MAIN GRID
                    ================================================= */}

                    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">

                        {/* =================================================
                            LEFT COLUMN
                        ================================================= */}

                        <div>

                            {/* =================================================
                                HERO IMAGE
                            ================================================= */}

                            <AnimateIn delay={0.1}>
                                <MouseGlow className="rounded-2xl">

                                    <div
                                        className="
                                            rounded-2xl
                                            bg-gradient-to-br
                                            from-slate-800/40
                                            via-blue-500/20
                                            to-slate-300/40
                                            p-[2px]
                                        "
                                    >
                                        <div
                                            className="
                                                group
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
                                                alt="HR Solutions — Human Resource Management"
                                                fill
                                                priority
                                                sizes="(max-width: 1024px) 100vw, 800px"
                                                className="
                                                    object-contain
                                                    transition-transform
                                                    duration-1000
                                                    ease-out
                                                    group-hover:scale-[1.04]
                                                "
                                            />

                                            {/* Image overlay */}
                                            <div
                                                className="
                                                    pointer-events-none
                                                    absolute
                                                    inset-0
                                                    bg-gradient-to-t
                                                    from-blue-950/10
                                                    via-transparent
                                                    to-white/10
                                                    dark:from-blue-950/20
                                                "
                                            />

                                            {/* Shine effect */}
                                            <div
                                                className="
                                                    pointer-events-none
                                                    absolute
                                                    inset-y-0
                                                    -left-1/2
                                                    w-1/3
                                                    -skew-x-12
                                                    bg-gradient-to-r
                                                    from-transparent
                                                    via-white/20
                                                    to-transparent
                                                    opacity-0
                                                    transition-all
                                                    duration-1000
                                                    group-hover:left-[120%]
                                                    group-hover:opacity-100
                                                "
                                            />
                                        </div>
                                    </div>

                                </MouseGlow>
                            </AnimateIn>

                            {/* =================================================
                                CONTENT
                            ================================================= */}

                            <MouseGlow className="mt-8 rounded-2xl">

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
                                        PARAGRAPH 01
                                    ----------------------------------------- */}

                                    <StaggerItem>
                                        <p>
                                            HR Management should have a clear
                                            understanding of the level of
                                            training and technical expertise
                                            that will be required and the amount
                                            of time expected. Questioning
                                            solution providers on this topic can
                                            provide insight into subtle areas
                                            that might initially appear simple,
                                            yet involve significant
                                            technological expertise. HR can
                                            then determine specific tasks that
                                            may be so cumbersome as to
                                            realistically impede completion,
                                            potentially reducing HR information
                                            technology value and ROI.
                                        </p>
                                    </StaggerItem>

                                    {/* -----------------------------------------
                                        PARAGRAPH 02
                                    ----------------------------------------- */}

                                    <StaggerItem>
                                        <p>
                                            What is the degree of flexibility
                                            and scalability that the HR
                                            information technology software
                                            provides? HR professionals should
                                            determine if the software can
                                            import data from multiple Excel
                                            spreadsheets, databases, and paper
                                            documents and the level with which
                                            it can interface with all kinds of
                                            other systems and data needed.
                                        </p>
                                    </StaggerItem>

                                    {/* -----------------------------------------
                                        PARAGRAPH 03
                                    ----------------------------------------- */}

                                    <StaggerItem>
                                        <p>
                                            The software should be able to take
                                            in and filter information from
                                            multiple sources. Ideally, this
                                            process should also be automated.
                                            Many online enrollment solutions
                                            require that data be manually
                                            manipulated before it can go to a
                                            carrier to update their systems.
                                            Automation of the update format,
                                            transmission schedule, and delivery
                                            method can help to eliminate
                                            billing and eligibility issues.
                                        </p>
                                    </StaggerItem>

                                    {/* -----------------------------------------
                                        PARAGRAPH 04
                                    ----------------------------------------- */}

                                    <StaggerItem>
                                        <p>
                                            Will the software be able to
                                            accommodate HR&apos;s company and
                                            benefits carriers&apos; rules? A
                                            truly capable enrollment engine
                                            will evaluate each enrollment
                                            activity and apply any necessary
                                            combination of rules, messages,
                                            prompts, and options specifically
                                            designed to meet the exact
                                            eligibility requirements desired.
                                            The software should accommodate any
                                            eligibility rules that the company
                                            and carriers have.
                                        </p>
                                    </StaggerItem>

                                    {/* -----------------------------------------
                                        PARAGRAPH 05
                                    ----------------------------------------- */}

                                    <StaggerItem>
                                        <p>
                                            Will the HR information technology
                                            be able to grow and scale with the
                                            organization? HR should assess the
                                            technology&apos;s ability to grow as
                                            the company hires new employees,
                                            offices, benefits changes, and
                                            rules. HR should ask about the
                                            thresholds for each of these
                                            elements.
                                        </p>
                                    </StaggerItem>

                                    {/* -----------------------------------------
                                        PARAGRAPH 06
                                    ----------------------------------------- */}

                                    <StaggerItem>
                                        <p>
                                            Is the HR information technology
                                            software able to integrate with
                                            other systems? Payroll and other
                                            functions often share much of the
                                            same information as the benefits
                                            management. HR can obtain greater
                                            efficiencies when data and other
                                            employee information entered into
                                            one system are shared with another
                                            system. Tracking employee
                                            recruitment is another needed
                                            function.
                                        </p>
                                    </StaggerItem>

                                    {/* -----------------------------------------
                                        PARAGRAPH 07
                                    ----------------------------------------- */}

                                    <StaggerItem>
                                        <p>
                                            Who is responsible for implementing,
                                            or building, the solution? What
                                            level of training is involved? Some
                                            solutions require the client to be
                                            very involved with the initial
                                            implementation, which can be
                                            overwhelming for already busy HR
                                            administrators.
                                        </p>
                                    </StaggerItem>

                                </StaggerContainer>

                            </MouseGlow>

                            {/* =================================================
                                HR FEATURE CARDS
                            ================================================= */}

                            <AnimateIn delay={0.3}>
                                <div className="mt-10 grid gap-4 sm:grid-cols-2">

                                    {/* Flexibility */}
                                    <TiltCard>
                                        <div
                                            className="
                                                group
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
                                                    text-blue-600
                                                    dark:text-blue-400
                                                "
                                            >
                                                01
                                            </div>

                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                                Flexibility
                                            </h3>

                                            <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                HR technology should adapt to
                                                changing business requirements.
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

                                    {/* Scalability */}
                                    <TiltCard>
                                        <div
                                            className="
                                                group
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
                                                    text-cyan-600
                                                    dark:text-cyan-400
                                                "
                                            >
                                                02
                                            </div>

                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                                Scalability
                                            </h3>

                                            <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                Solutions should grow alongside
                                                your organization.
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

                                    {/* Integration */}
                                    <TiltCard>
                                        <div
                                            className="
                                                group
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
                                                    text-indigo-600
                                                    dark:text-indigo-400
                                                "
                                            >
                                                03
                                            </div>

                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                                Integration
                                            </h3>

                                            <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                Connect payroll, benefits and
                                                other business systems.
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

                                    {/* Automation */}
                                    <TiltCard>
                                        <div
                                            className="
                                                group
                                                rounded-2xl
                                                border
                                                border-slate-200/70
                                                bg-white/60
                                                p-5
                                                backdrop-blur-sm
                                                transition-shadow
                                                duration-300
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
                                                    h-10
                                                    w-10
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-purple-500/10
                                                    text-purple-600
                                                    dark:text-purple-400
                                                "
                                            >
                                                04
                                            </div>

                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                                Automation
                                            </h3>

                                            <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                Automate repetitive HR data and
                                                enrollment processes.
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
                                    </TiltCard>

                                </div>
                            </AnimateIn>

                        </div>

                        {/* =================================================
                            RIGHT SIDEBAR
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
                                            rounded-2xl
                                            border
                                            border-slate-200/70
                                            bg-white/70
                                            p-4
                                            shadow-xl
                                            shadow-blue-500/5
                                            backdrop-blur-xl
                                            dark:border-slate-800
                                            dark:bg-slate-900/70
                                        "
                                    >

                                        {/* Sidebar heading */}
                                        <div className="mb-4">
                                            <span
                                                className="
                                                    text-[10px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-[0.2em]
                                                    text-blue-600
                                                    dark:text-blue-400
                                                "
                                            >
                                                HR Solutions
                                            </span>

                                            <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                                                Get the Brochure
                                            </h2>

                                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                Learn more about our resource
                                                and HR management solutions.
                                            </p>
                                        </div>

                                        {/* Form */}
                                        <BrochureForm />

                                    </div>

                                </MouseGlow>

                            </TiltCard>
                        </AnimateIn>

                    </div>
                </section>
            </main>

            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer />
        </div>
    );
}