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

const BANNER_SRC = "/web-hosting.png";
const SIDEBAR_SRC = "/web-hosting-1.png";

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function WebHostingServicesPage() {
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
                    TOP RADIAL GLOW
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
                    FLOATING BACKGROUND BLOBS
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
                    color="bg-indigo-400/5"
                    duration={18}
                />

                {/* =================================================
                    CONTENT CONTAINER
                ================================================= */}

                <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-20">

                    {/* =================================================
                        PAGE HEADING
                    ================================================= */}

                    <AnimateIn delay={0.05}>
                        <AnimatedHeading
                            text="Web Hosting Services"
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
                        BANNER
                    ================================================= */}

                    <AnimateIn delay={0.1}>
                        <MouseGlow className="mt-6 rounded-2xl">
                            <div
                                className="
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-slate-700/40
                                    via-blue-500/30
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
                                        alt="Web Hosting Services"
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
                                    INTRO
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        We provide dedicated servers and VPS
                                        hosting services that can be matched
                                        to fit your needs. Whether you are an
                                        individual looking for a basic shared
                                        hosting package or your small business
                                        needs a scalable dedicated web hosting
                                        solution, we are willing and able to
                                        meet your web hosting needs.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    VPS HEADING
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p
                                        className="
                                            font-semibold
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        VPS Hosting:
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    VPS CONTENT
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Our VPS hosting as a cost-efficient
                                        solution comes right in the middle of
                                        dedicated and webspace hosting product
                                        ranges and provides you with the
                                        advantages of both of these types. We
                                        use a virtualization solution based on
                                        KVM and hardware that corresponds to
                                        the latest state of the art.
                                        Furthermore you are provided with
                                        guaranteed RAM and disk space.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    VPS CUSTOMIZATION
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Customize your virtual private server
                                        to suit your needs and select the
                                        operating system (Linux or Windows
                                        Server 2012 and Windows Server 2008)
                                        of your choice. To manage and
                                        administer your virtual machine, you
                                        can optionally choose between
                                        Parallels Plesk, cPanel/WHM and
                                        Webmin. Decide now and rely on
                                        high-quality, powerful VPS hosting
                                        solutions.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    DEDICATED SERVER HEADING
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p
                                        className="
                                            font-semibold
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        Dedicated Server:
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    DEDICATED SERVER CONTENT
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Our entire fleet of dedicated servers
                                        is 100% managed, so you do not have to
                                        worry about running your servers or
                                        fixing any problems. What we mean by
                                        Dedicated Servers, is that we will
                                        take care of the setup of your
                                        dedicated web hosting account,
                                        troubleshooting with your dedicated
                                        server, and everything in between.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    CLOUD DOCUMENT HOSTING
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Data and document hosting services in
                                        the cloud from microMEDIA include
                                        designing and implementing
                                        cost-effective Web-based Document
                                        Management systems. We use these
                                        systems to create an Archive at our
                                        web hosting sites that leverage the
                                        latest web based document management
                                        technologies.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    DOCUMENT MANAGEMENT
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        Each application is customized to meet
                                        a client&apos;s specific needs for an
                                        online web document hosting
                                        application. Web-based document
                                        management users can institute a
                                        search and retrieval process using
                                        previously established indices and
                                        document identification
                                        classifications.
                                    </p>
                                </StaggerItem>

                                {/* -----------------------------------------
                                    SUPPORT
                                ----------------------------------------- */}

                                <StaggerItem>
                                    <p>
                                        microMEDIA delivers all the requisite
                                        management, infrastructure and
                                        support. We offer numerous document
                                        repository alternatives.
                                    </p>
                                </StaggerItem>

                            </StaggerContainer>

                        </MouseGlow>

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

                            <TiltCard className="mx-auto w-fit">

                                <div
                                    className="
                                        relative
                                        h-56
                                        w-64
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
                                        alt="Web hosting servers"
                                        fill
                                        sizes="256px"
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
                        BOTTOM INFORMATION CARDS
                    ================================================= */}

                    <AnimateIn delay={0.35}>
                        <div className="mt-16 grid gap-5 sm:grid-cols-3">

                            {/* VPS */}
                            <MouseGlow className="rounded-2xl">
                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-slate-200/70
                                        bg-white/60
                                        p-6
                                        backdrop-blur-sm
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
                                        VPS
                                    </div>

                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        VPS Hosting
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        Flexible and scalable virtual private
                                        server solutions for growing
                                        businesses.
                                    </p>
                                </div>
                            </MouseGlow>

                            {/* Dedicated */}
                            <MouseGlow className="rounded-2xl">
                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-slate-200/70
                                        bg-white/60
                                        p-6
                                        backdrop-blur-sm
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
                                        DS
                                    </div>

                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        Dedicated Server
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        Fully managed dedicated hosting with
                                        reliable infrastructure and support.
                                    </p>
                                </div>
                            </MouseGlow>

                            {/* Document */}
                            <MouseGlow className="rounded-2xl">
                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-slate-200/70
                                        bg-white/60
                                        p-6
                                        backdrop-blur-sm
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
                                        DM
                                    </div>

                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        Document Management
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        Secure web-based document hosting and
                                        management solutions.
                                    </p>
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