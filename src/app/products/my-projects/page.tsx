import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";

// NOTE: update this path to wherever your actual My Projects banner image lives in /public.
const BANNER_SRC = "/my-projects-banner.jpg";

export default function MyProjectsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="relative flex-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]" />
                <FloatingBlob className="-right-20 top-10 h-72 w-72" color="bg-blue-400/10" duration={16} />
                <FloatingBlob className="-left-16 top-96 h-64 w-64" color="bg-cyan-300/10" duration={20} />

                <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-20">
                    <AnimatedHeading
                        text="My Project"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-amber-500/40 via-orange-400/30 to-amber-700/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="My Projects"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.1}>
                                <h2 className="mt-8 text-lg font-semibold text-slate-900 dark:text-white">My Projects</h2>
                                <div className="mt-3 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    <p>
                                        <span className="font-semibold text-slate-900 dark:text-white">
                                            Managing My Project
                                        </span>{" "}
                                        isn&apos;t easy, which is why you need the best technology to manage your
                                        projects against budgets, scheduled &amp; resources in real time.
                                    </p>
                                    <p>
                                        My Projects is a collaboration tool that organizes your projects into boards.
                                        In one glance, My Projects tells you what is being worked on, whos working on
                                        what, and where something is in a process.
                                    </p>
                                    <p>
                                        My Projects offers two paid options: My Projects Gold, and My Projects
                                        Business Class. They are both ways to build on to the free My Projects
                                        experience. My Projects Gold offers a way for individual users to take their
                                        My Projects use to the next level, and My Projects Business Class is intended
                                        for multi-user teams to have more fine-grained control over who can access
                                        their boards.
                                    </p>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.2}>
                                <h3 className="mt-10 text-base font-semibold text-slate-900 dark:text-white">
                                    My Project include the following features:
                                </h3>

                                <div className="mt-4 space-y-4">
                                    <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-5 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                            Projects Planning
                                        </h4>
                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            A dynamic and easy-to-use project-planning screen to facilitate your
                                            project structure and planning makes it easier than ever to plan with
                                            deadlines, dependencies, budgets and more. A single snapshot of your
                                            project with real-time budgets and roll-up details makes it easy to see
                                            the status of your project, budget and scope. A fully integrated invoicing
                                            process, which takes you from approved timesheets to a generated invoice
                                            in just one screen, gives you the flexibility to provide more details than
                                            ever before to your clients.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-5 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                            Manage Your Documents
                                        </h4>
                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            My Projects helps you easily organize and work on files associated with a
                                            particular project. No more version confusion, e-mailing files to
                                            yourself or sifting through your inbox trying to find a crucial approval
                                            document from months ago. You always have instant access to the latest
                                            file versions and can quickly see what others have changed. Documents,
                                            video clips, graphics, spreadsheets, reports — the average project
                                            entails hundreds of different files, often on dozens of different
                                            computers.
                                        </p>
                                    </div>
                                </div>
                            </AnimateIn>
                        </div>

                        <AnimateIn delay={0.25} direction="left" className="lg:sticky lg:top-24 lg:self-start">
                            <BrochureForm />
                        </AnimateIn>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
