import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";
import { FaqAccordion } from "../../../../components/faq-accordion";

// NOTE: update this path to wherever your actual Global HR banner image lives in /public.
const BANNER_SRC = "/global-hr-1.png";

const modules = [
    {
        title: "Dashboard",
        description:
            "The Dashboard module integrates information from multiple modules into a unified display. The module gives you a clean, user-friendly interface with real-time trend graphs, lists of pending HR tasks, quick launch panel and reporting.",
    },
    {
        title: "System Administration",
        description:
            "The System Administration module offers centralized control to your HR Manager or other personnel to carry out basic HR functions. Define your organizational structure or your pay scale with this module. Work in a secure environment to manage core information and business projects or address security issues such as user rights and permissions. As the backbone of your HR management system, this module enables you to effectively handle fundamental personnel tasks. The module includes the following features:",
        features: [
            "Create and generate organizational structure through definition of company information including geographical locations, property management and organizational hierarchies.",
            "Organize employee job information by defining job titles, pay grades, employment status and identification of equal employment opportunity (EEO) job categories.",
            "Manage employee qualification information (education, professional licensing) to process promotions and salary increments with ease.",
            "Keep note of employee proficiencies such as skills and language. Track employee membership types and identify appropriate individual designations.",
        ],
    },
    {
        title: "Personal Information Management",
        description:
            "As a centralized employee database, the Personal Information Management gives you the capability to easily and productively store and utilize all aspects of your employee information. Personal information management (PIM) is a basic function of any HR department.",
        features: [
            "Decrease the possibility of data loss through management of personal employee information in a centralized location.",
            "Use employee records to manage and update employee contact and travel information.",
            "Manage employee job information by defining pay grade, salary and other information.",
            "Identify reporting structure through definition of employee supervisors.",
            "Use PIM to keep timely track of past work experience, educational details, skills and other criteria.",
            "View and search employee details when needed.",
        ],
    },
    {
        title: "Leave Management",
        description:
            "This integrated module enables online processing of requests and approval for leave and vacation time. Significantly streamline all your leave-related procedures, eliminate paperwork and reduce scheduling hassles.",
        features: [
            "Define leave types relevant to your organization.",
            "Display information on leave entitlement, leave time, balance, history and paid time-off all in a single screen.",
            "Define days-off (staff vacation planning).",
            "Allow employees to apply for leave online. Supervisors may approve or reject leave online.",
            "Send out automatic E-mail notifications of employees and supervisors on leave.",
        ],
    },
    {
        title: "Time & Attendance Management",
        description:
            "Eliminate paperwork and manual management of attendance and project timekeeping with this sophisticated HR module. The Time and Attendance Management module automates your timekeeping-related processes while minimizing attendance policy errors. Enhance organizational performance and keep your labor and workforce data effectively organized.",
        features: [
            "Create timesheets to monitor employee project tasks.",
            "Define days-off (weekends and specific holidays).",
            "Manage all employee timesheets.",
            "Create timesheets weekly or monthly.",
            "Generate pending or approved time reports.",
            "Clear and concise attendance tracking for HR administrators and managers.",
        ],
    },
    {
        title: "Recruitment Management",
        description:
            "The Recruitment module gives HR professionals a comprehensive solution for the entire recruitment cycle. Effectively streamline your applicant tracking process from job vacancy to hire. Features include:",
        features: ["Applicant database", "Interview scheduling", "Identify hiring managers for job vacancies"],
    },
    {
        title: "Performance Management",
        description:
            "Assessment of job performance and communication of critical business expectations is essential for any business. The Performance module of Globalhr simplifies this vital process through creation of employment reviews and self-assessments.",
        features: [
            "Create performance reviews using key performance indicators (KPIs) specific to each job title.",
            "Allow supervisors / managers to review subordinates on their performance.",
            "Allow employees to understand employer expectations.",
        ],
    },
];

// FaqAccordion only takes a single answer string (no bullet list support),
// so features are folded into the answer text with a • separator.
const faqItems = modules.map((mod) => ({
    question: mod.title,
    answer:
        mod.features && mod.features.length > 0
            ? `${mod.description} ${mod.features.map((f) => `• ${f}`).join(" ")}`
            : mod.description,
}));

export default function GlobalHrPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="relative flex-1 overflow-hidden">
                {/* Background grid + radial glow + floating blobs */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]" />
                <FloatingBlob className="-right-20 top-10 h-72 w-72" color="bg-blue-400/10" duration={16} />
                <FloatingBlob className="-left-16 top-96 h-64 w-64" color="bg-cyan-300/10" duration={20} />

                <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-20">
                    <AnimatedHeading
                        text="Global HR"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        {/* ===== Left: banner + content ===== */}
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-blue-400/40 via-cyan-300/30 to-blue-600/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="Global HR — Progress Starts Inside"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.1}>
                                <p className="mt-8 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    GlobalHR Management System offers a wealth of modules to suit the needs of your
                                    business. This widely-used system is feature-rich, intuitive and provides an
                                    essential HR management platform along with free documentation and access to a
                                    broad community of users. Modules provided with Globalhr include:
                                </p>
                            </AnimateIn>

                            <AnimateIn delay={0.2} className="mt-8">
                                <FaqAccordion items={faqItems} />
                            </AnimateIn>
                        </div>

                        {/* ===== Right: sticky brochure download form ===== */}
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
