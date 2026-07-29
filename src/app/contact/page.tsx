"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Building2, Briefcase, Mail, Send, RotateCcw, CheckCircle } from "lucide-react";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { MouseGlow } from "../../../components/mouse-glow";
import { RippleButton } from "../../../components/ripple-button";

const offices = [
    {
        icon: Building2,
        title: "Head Office -> UK",
        lines: ["Trading as Visualytes Limited", "Cumberland House,", "Southampton,", "SO15 2BG."],
        email: "info@geecontechnology.com",
    },
    {
        icon: MapPin,
        title: "Asia Corporate Office",
        lines: ["Row House 20, Golden Nest,", "Phase III, Mira-Bhayandar Road,", "Bhayandar East, Thane-401105."],
        email: "info@geecontechnology.com",
    },
    {
        icon: Briefcase,
        title: "Career With Us",
        lines: ["Come on, join US. And we will help", "You to explore your values and", "valuate your skills."],
        email: null,
    },
];

// Placeholder options — replace/extend with your real list.
const sourceOptions = ["Search Engine", "Social Media", "Referral", "Advertisement", "Other"];

const initialForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    source: "",
    requirements: "",
};

export default function ContactUsPage() {
    const [form, setForm] = useState(initialForm);
    const [showToast, setShowToast] = useState(false);

    const handleChange =
        (field: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
        };

    const handleClear = () => setForm(initialForm);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowToast(true);
        window.setTimeout(() => setShowToast(false), 4000);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="relative flex-1 overflow-hidden">
                {/* Background grid + radial glow + floating blobs */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]" />
                <FloatingBlob className="-right-20 top-10 h-72 w-72" color="bg-blue-400/10" duration={16} />
                <FloatingBlob className="-left-16 top-96 h-64 w-64" color="bg-cyan-300/10" duration={20} />

                <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-20">
                    <AnimatedHeading
                        text="Contact Us"
                        as="h1"
                        className="text-center text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
                    />

                    {/* ===== Office address cards ===== */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6 }}
                        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {offices.map((office) => (
                            <div
                                key={office.title}
                                className="rounded-2xl bg-gradient-to-br from-blue-400/40 via-cyan-300/30 to-blue-600/40 p-[1px] transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div className="h-full rounded-2xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/70">
                                    <div className="flex items-center gap-2">
                                        <office.icon size={18} className="text-[#1a2b4a] dark:text-blue-400" />
                                        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                                            {office.title}
                                        </h3>
                                    </div>
                                    <div className="mt-4 space-y-0.5 text-sm text-slate-500 dark:text-slate-400">
                                        {office.lines.map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>
                                    {office.email && (
                                        <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                                            <Mail size={13} />
                                            {office.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* ===== Contact form ===== */}
                    <AnimateIn delay={0.15} className="mt-16">
                        <h2 className="text-center text-lg font-semibold text-[#1a2b4a] dark:text-blue-400">
                            If you&apos;d like us to contact you, please fill out the form.
                        </h2>

                        <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-gradient-to-br from-blue-400/30 via-cyan-300/20 to-blue-600/30 p-[1px]">
                            <MouseGlow className="rounded-2xl">
                                <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/70 sm:p-8">
                                    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                                        <input
                                            type="text"
                                            required
                                            placeholder="*Name"
                                            value={form.name}
                                            onChange={handleChange("name")}
                                            className="w-full rounded-md border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1a2b4a] focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                                        />

                                        <select
                                            value={form.source}
                                            onChange={handleChange("source")}
                                            className="w-full rounded-md border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-600 focus:border-[#1a2b4a] focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300"
                                        >
                                            <option value="">How Did You Come To Know About Us?</option>
                                            {sourceOptions.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            type="email"
                                            required
                                            placeholder="*Email"
                                            value={form.email}
                                            onChange={handleChange("email")}
                                            className="w-full rounded-md border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1a2b4a] focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                                        />

                                        <textarea
                                            placeholder="Requirements"
                                            value={form.requirements}
                                            onChange={handleChange("requirements")}
                                            rows={1}
                                            className="w-full resize-none rounded-md border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1a2b4a] focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-white sm:row-span-2 sm:h-full sm:resize-y"
                                        />

                                        <input
                                            type="tel"
                                            required
                                            placeholder="*Phone"
                                            value={form.phone}
                                            onChange={handleChange("phone")}
                                            className="w-full rounded-md border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1a2b4a] focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                                        />

                                        <textarea
                                            required
                                            placeholder="*Address"
                                            value={form.address}
                                            onChange={handleChange("address")}
                                            rows={3}
                                            className="w-full resize-y rounded-md border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1a2b4a] focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-white sm:col-start-1"
                                        />

                                        <div className="flex items-start gap-3 pt-2 sm:col-span-2">
                                            <RippleButton
                                                type="submit"
                                                className="rounded-full bg-[#1a2b4a] px-8 py-3 text-sm font-semibold text-white dark:bg-blue-600"
                                            >
                                                <Send size={15} />
                                                Submit
                                            </RippleButton>
                                            <RippleButton
                                                type="button"
                                                onClick={handleClear}
                                                className="rounded-full bg-[#1a2b4a] px-8 py-3 text-sm font-semibold text-white dark:bg-blue-600"
                                            >
                                                <RotateCcw size={15} />
                                                Clear
                                            </RippleButton>
                                        </div>
                                    </form>
                                </div>
                            </MouseGlow>
                        </div>
                    </AnimateIn>
                </section>
            </main>
            <Footer />

            {/* Success toast */}
            {showToast && (
                <div
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#1a2b4a] px-5 py-3 text-sm font-medium text-white shadow-2xl dark:bg-blue-600"
                    style={{ animation: "geecon-toast-in 0.3s ease-out" }}
                >
                    <style>{`
            @keyframes geecon-toast-in {
              from { transform: translateY(12px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
                    <CheckCircle size={16} />
                    Message sent successfully! We&apos;ll get back to you soon.
                </div>
            )}
        </div>
    );
}
