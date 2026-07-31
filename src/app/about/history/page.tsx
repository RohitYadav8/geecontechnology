import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";

// NOTE: update this path to wherever your actual hero image lives in /public.
const HERO_SRC = "/core.png";

const timeline = [
    {
        title: "The Beginning:",
        paragraphs: [
            "1999 a thought was born and further it was named GEECON. From the beginning, the company was founded on the principal of providing Business and Management Consultancy and Software Solution and IT Consultancy. For over a decade, Geecon have been company focused on bringing to life great ideas and IT solutions that drive progress for our clients. Continuous innovation and rapid transformation have been themes throughout Geecon's history.",
            "India witnessed emergence of Geecon in 2007. It was then; Geecon started delivering excellent services to its clients in India. Geecon built reputation primarily as a technology consultant. It began offering a new breed of business integration solutions to clients solutions that aligned organizational technologies and people with their strategies.",
        ],
    },
    {
        title: "The Middle:",
        paragraphs: [
            "Later in 2009 a decision was made to shift the headquarters to London, United Kingdom to accord its services globally. Throughout its history, Geecon has provided capturing and cost effective solution for IT services, resourcing and designing. The tag of Private Limited Company was acquired in India by Geecon in 2011.",
        ],
    },
];

export default function HistoryPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="flex-1">
                <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
                    <Image src={HERO_SRC} alt="Geecon History" fill sizes="100vw" className="object-cover" priority />
                </div>

                <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
                    <div className="space-y-14">
                        {timeline.map((era, i) => (
                            <AnimateIn key={era.title} delay={i * 0.05}>
                                <h2 className="text-3xl font-semibold uppercase tracking-wide text-slate-900 dark:text-white sm:text-4xl">
                                    {era.title}
                                </h2>
                                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {era.paragraphs.map((p, pi) => (
                                        <p key={pi}>{p}</p>
                                    ))}
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
