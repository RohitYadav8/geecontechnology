import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";

// NOTE: update this path to wherever your actual hero image lives in /public.
// (Same mountain photo as the Benefits page — reuse if it's the same asset.)
const HERO_SRC = "/core.png";

const principles = [
    {
        title: "Listening Generously:",
        points: [
            "We listen for the contribution in each other's speaking – suspending assessments, opinions and judgments. This means giving the person your undivided attention.",
            "If you can't give your undivided attention right now, request to speak with the person when you can listen to them generously.",
        ],
    },
    {
        title: "Speaking Straight:",
        points: [
            "We move past saying \u201cwhat is supposed to be said\u201d to speak responsibly and honestly in a way that forwards appropriate action.",
            "This includes learning to make clear and direct requests.",
            "Nobody \u201cgets\u201d subtle or veiled requests.",
        ],
    },
    {
        title: "Being \u201cFor\u201d each other:",
        points: [
            "Key to a successful team is being \u201cfor\u201d each other; much like one would be for a football team.",
            "This means 100% support for everyone in the company and the roles they play.",
        ],
    },
    {
        title: "Honouring Agreements And Commitments:",
        points: [
            "Do what you say you will do – others are depending on you.",
            "If you can't keep your agreement, renegotiate it ahead of time.",
            "If you break an agreement, acknowledge and negotiate a way to clean up the mess.",
        ],
    },
    {
        title: "Acknowledging And Appreciating Each Other:",
        points: [
            "Each of us is a source of acknowledgement and appreciation for every other person.",
            "This includes giving, receiving and requesting acknowledgement.",
        ],
    },
    {
        title: "Taking 100% ownership:",
        points: [
            "Everyone is 100% accountable for their role in the company.",
            "Follow through your commitments internally and externally.",
            "This does not mean taking on too much (110%) nor does it mean taking too little (90%).",
            "Everything that happens in the company is the result of its people.",
        ],
    },
];

export default function CorePractisePage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="flex-1">
                <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
                    <Image src={HERO_SRC} alt="Geecon Core Practise" fill sizes="100vw" className="object-cover" priority />
                </div>

                <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
                    <AnimateIn>
                        <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                            Core practise are the things we do within our organization to help maintain a high level
                            of integrity and establish an environment where what needs to be said can be said — with
                            confidence that both speaker(s) and listener(s) will be treated with respect, and that
                            their ideas and contributions will be valued, whether those ideas are implemented or not.
                        </p>
                    </AnimateIn>

                    <div className="mt-16 space-y-14">
                        {principles.map((principle, i) => (
                            <AnimateIn key={principle.title} delay={i * 0.05}>
                                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
                                    {principle.title}
                                </h2>
                                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {principle.points.map((point, pi) => (
                                        <li key={pi} className="flex gap-2">
                                            <span className="shrink-0">–</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </AnimateIn>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
