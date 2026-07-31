import Image from "next/image";
import { Navbar } from "../../../../../components/navbar";
import { Footer } from "../../../../../components/footer";
import { AnimateIn } from "../../../../../components/animate-in";
import { AnimatedHeading } from "../../../../../components/animated-heading";

// NOTE: update these paths to wherever your actual Vision/Mission graphics live in /public.
const VISION_SRC = "/vision-graphic.png";
const MISSION_SRC = "/mission-graphic.png";

const visionPoints = [
    "World Class Corporation",
    "Globally Respected Corporation",
    "Premium Consultancy & Solutions",
    "Excellent In-Class-People",
];

const missionPoints = ["Help Achieving Full Potential", "Simplified Quality Solutions", "Cost Effective Approach", "Timed Delivery"];

export default function MissionVisionPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="flex-1">
                <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-20">
                    <AnimatedHeading
                        text="Mission & Vision"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <AnimateIn delay={0.1}>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                            <span className="font-semibold text-slate-900 dark:text-white">Geecon</span> is a
                            Technology Driven company with a mission of &ldquo;Developing and implementing new
                            technology to contribute towards rapid growth of various industries&rdquo;.
                        </p>
                    </AnimateIn>

                    <div className="mt-10 grid overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 sm:grid-cols-2">
                        {/* Vision image */}
                        <AnimateIn delay={0.15}>
                            <div className="relative flex h-72 w-full items-center justify-center bg-gradient-to-b from-white to-sky-100 dark:from-slate-900 dark:to-slate-800">
                                <div className="relative h-40 w-72">
                                    <Image src={VISION_SRC} alt="Vision" fill sizes="288px" className="object-contain" />
                                </div>
                            </div>
                        </AnimateIn>

                        {/* Vision text */}
                        <AnimateIn delay={0.2}>
                            <div className="flex h-72 flex-col items-center justify-center bg-slate-50 px-8 text-center dark:bg-slate-900/60">
                                <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                                    Our Vission&hellip;
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    To be globally respected premium world-class corporation providing premium
                                    Consultancy &amp; IT solutions delivered by excellent-in-class people.
                                </p>
                                <ul className="mt-4 space-y-1 text-sm text-slate-500 dark:text-slate-400">
                                    {visionPoints.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </AnimateIn>

                        {/* Mission text */}
                        <AnimateIn delay={0.25}>
                            <div className="flex h-72 flex-col items-center justify-center bg-slate-50 px-8 text-center dark:bg-slate-900/60">
                                <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                                    Our Mission&hellip;.
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    Helping customers by providing the world&apos;s most simplified best quality
                                    solutions &amp; delivering value that enable businesses to achieve their full
                                    potential in a cost effective and timely fashion.
                                </p>
                                <ul className="mt-4 space-y-1 text-sm text-slate-500 dark:text-slate-400">
                                    {missionPoints.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </AnimateIn>

                        {/* Mission image */}
                        <AnimateIn delay={0.3}>
                            <div className="relative flex h-72 w-full items-center justify-center bg-gradient-to-b from-white to-sky-100 dark:from-slate-900 dark:to-slate-800">
                                <div className="relative h-40 w-72">
                                    <Image src={MISSION_SRC} alt="Mission" fill sizes="288px" className="object-contain" />
                                </div>
                            </div>
                        </AnimateIn>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
