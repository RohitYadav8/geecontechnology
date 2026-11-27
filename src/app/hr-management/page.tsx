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
// Shared card styles
// ---------------------------------------------------------

const featureCardClassName =
    "group h-full rounded-[26px] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/30";

const featureTileClassName =
    "brand-grad mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] text-sm font-extrabold text-white shadow-lg shadow-violet-500/25";

const featureBarClassName =
    "brand-grad mt-5 h-[3px] w-8 rounded-full transition-all duration-300 group-hover:w-14";

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function ResourceHrManagementPage() {
    return (
        <div className="flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#060b16]">

            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <Navbar />

            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="relative flex-1 overflow-x-clip">

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

                    <div className="relative mx-auto max-w-5xl">
                        <AnimateIn delay={0.05}>
                            <AnimatedHeading
                                text="Resource & HR Management"
                                as="h1"
                                highlightFrom={2}
                                highlightClassName="brand-text-light"
                                className="mx-auto max-w-4xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]"
                            />
                        </AnimateIn>
                    </div>
                </section>

                {/* =================================================
                    PAGE SECTION
                ================================================= */}

                <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-20 sm:-mt-32 sm:px-6 lg:px-10 lg:pb-24">

                    <div className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-8 lg:p-10 dark:border-white/[0.07] dark:bg-[#0b1220]">

                        {/* =================================================
                            MAIN GRID
                        ================================================= */}

                        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">

                            {/* =================================================
                                LEFT COLUMN
                            ================================================= */}

                            <div className="min-w-0">

                                {/* =================================================
                                    HERO IMAGE
                                ================================================= */}

                                <AnimateIn delay={0.1}>
                                    <MouseGlow className="rounded-[26px]">
                                        <div className="brand-grad rounded-[26px] p-2 shadow-[0_30px_70px_-35px_rgba(91,33,182,.45)]">
                                            <div className="group relative h-56 w-full overflow-hidden rounded-[20px] bg-white sm:h-80 dark:bg-slate-900">
                                                <Image
                                                    src={BANNER_SRC}
                                                    alt="HR Solutions — Human Resource Management"
                                                    fill
                                                    priority
                                                    sizes="(max-width: 1024px) 100vw, 800px"
                                                    className="object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                                                />

                                                {/* Shine effect */}
                                                <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[120%] group-hover:opacity-100" />
                                            </div>
                                        </div>
                                    </MouseGlow>
                                </AnimateIn>

                                {/* =================================================
                                    CONTENT
                                ================================================= */}

                                <StaggerContainer className="mt-10 space-y-5 text-[15px] leading-8 text-slate-600 dark:text-slate-400">

                                    {/* -----------------------------------------
                                        PARAGRAPH 01
                                    ----------------------------------------- */}

                                    <StaggerItem>
                                        <p className="text-lg font-semibold leading-8 tracking-[-0.01em] text-slate-900 dark:text-white">
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
                                        <p className="border-l-[3px] border-violet-400 pl-5 dark:border-violet-400/60">
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
                                        <p className="rounded-[20px] border border-violet-100 bg-violet-50/60 p-5 text-slate-700 dark:border-violet-400/15 dark:bg-violet-500/[0.06] dark:text-slate-300">
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

                            </div>

                            {/* =================================================
                                RIGHT SIDEBAR
                            ================================================= */}

                            <AnimateIn
                                delay={0.25}
                                direction="left"
                                className="lg:sticky lg:top-24 lg:self-start"
                            >
                                <div className="rounded-[26px] border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5 dark:border-white/[0.07] dark:bg-white/[0.03]">

                                    {/* Sidebar heading */}
                                    <div className="mb-5 px-1">
                                        <span className="brand-text text-[12px] font-extrabold uppercase tracking-[0.2em]">
                                            HR Solutions
                                        </span>

                                        <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white">
                                            Get the Brochure
                                        </h2>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            Learn more about our resource
                                            and HR management solutions.
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <BrochureForm />

                                </div>
                            </AnimateIn>

                        </div>
                    </div>

                    {/* =================================================
                        HR FEATURE CARDS
                    ================================================= */}

                    <AnimateIn delay={0.3}>
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {/* Flexibility */}
                            <TiltCard>
                                <div className={featureCardClassName}>
                                    <div className={featureTileClassName}>
                                        01
                                    </div>

                                    <h3 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                                        Flexibility
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        HR technology should adapt to
                                        changing business requirements.
                                    </p>

                                    <div className={featureBarClassName} />
                                </div>
                            </TiltCard>

                            {/* Scalability */}
                            <TiltCard>
                                <div className={featureCardClassName}>
                                    <div className={featureTileClassName}>
                                        02
                                    </div>

                                    <h3 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                                        Scalability
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        Solutions should grow alongside
                                        your organization.
                                    </p>

                                    <div className={featureBarClassName} />
                                </div>
                            </TiltCard>

                            {/* Integration */}
                            <TiltCard>
                                <div className={featureCardClassName}>
                                    <div className={featureTileClassName}>
                                        03
                                    </div>

                                    <h3 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                                        Integration
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        Connect payroll, benefits and
                                        other business systems.
                                    </p>

                                    <div className={featureBarClassName} />
                                </div>
                            </TiltCard>

                            {/* Automation */}
                            <TiltCard>
                                <div className={featureCardClassName}>
                                    <div className={featureTileClassName}>
                                        04
                                    </div>

                                    <h3 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                                        Automation
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        Automate repetitive HR data and
                                        enrollment processes.
                                    </p>

                                    <div className={featureBarClassName} />
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
