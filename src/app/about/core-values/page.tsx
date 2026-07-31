import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";

// NOTE: update this path to wherever your actual hero image lives in /public.
const HERO_SRC = "/core.png";

const values = [
    {
        title: "Inclusion:",
        points: ["We agree to include and inform everyone affected by a project or a decision."],
    },
    {
        title: "Acknowledgement & Appreciation:",
        points: [
            "We regularly acknowledge and appreciate our fellow employees, our customers, vendors, partners and ourselves for contribution made in support of Geecon's vision and pursuits of excellence.",
        ],
    },
    {
        title: "Sound Decision Making:",
        points: ["We make decisions, we L.I.K.E. Our decisions are based on Logic, Intuition, Knowledge and Experience."],
    },
    {
        title: "Discipline:",
        points: [
            "In support of collaborations with goals and objectives, the discipline of Geecon lies in Elucidating, refining, accomplishing, delineating and completing all activities.",
        ],
    },
    {
        title: "Constant Improvement:",
        points: [
            "Persistent and ceaseless improvement – to ensure quality and productivity across all areas in the company.",
            "Seeking knowledge and understanding, then applying it to ourselves, our customers, processes and products.",
        ],
    },
    {
        title: "Full Self Expression",
        points: ["Respectful communication of creativity, ideas and concerns.", "Freedom to express ideas, concerns and possibilities."],
    },
    {
        title: "Integrity",
        points: [
            "Honest & committed internal/external relationship.",
            "Honoring and respecting others point of views and feelings.",
            "Doing what's right for us and for our customers.",
        ],
    },
];

export default function CoreValuesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="flex-1">
                <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
                    <Image src={HERO_SRC} alt="Geecon Core Values" fill sizes="100vw" className="object-cover" priority />
                </div>

                <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
                    <div className="space-y-14">
                        {values.map((value, i) => (
                            <AnimateIn key={value.title} delay={i * 0.05}>
                                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
                                    {value.title}
                                </h2>
                                {value.points.length === 1 ? (
                                    <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {value.points[0]}
                                    </p>
                                ) : (
                                    <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {value.points.map((point, pi) => (
                                            <li key={pi} className="flex gap-2">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </AnimateIn>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
