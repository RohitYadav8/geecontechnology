"use client";

import { useState } from "react";
import { Upload, Send, CheckCircle } from "lucide-react";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { MouseGlow } from "../../../components/mouse-glow";
import { RippleButton } from "../../../components/ripple-button";

type FieldType = "text" | "email" | "tel" | "date" | "textarea" | "select";

interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
}

const fields: FieldConfig[] = [
    { name: "fullName", label: "What is Your Full name?", type: "text" },
    { name: "email", label: "What is Your Contact email?", type: "email" },
    { name: "phone", label: "What is Your Contact Number?", type: "tel" },
    { name: "dob", label: "What is your Date of birth?", type: "date" },
    { name: "qualification", label: "What is your highest Qualification?", type: "text" },
    { name: "qualificationYear", label: "Which Year did you pass your highest qualification?", type: "date" },
    {
        name: "pursuingDegree",
        label: "Are you currently pursuing any degree or qualification? If yes, which degree?",
        type: "text",
    },
    { name: "position", label: "Which position are you applying for?", type: "text" },
    { name: "totalExperience", label: "What is your total years of experience?", type: "text" },
    { name: "relevantExperience", label: "What is your relevant years of experience for the applied job?", type: "text" },
    { name: "currentLocation", label: "What is your current location of work?", type: "text" },
    { name: "relocate", label: "If your current location is not Mumbai, are you ready to relocate?", type: "select" },
    { name: "travelAbroad", label: "Are you ready to travel abroad?", type: "select" },
    { name: "passport", label: "Do you have a valid passport?", type: "select" },
    { name: "visa", label: "Do you have a valid visa?", type: "select" },
    { name: "currentlyWorking", label: "Are you currently working?", type: "select" },
    { name: "reasonForChange", label: "What is your reason for job change? (in detail)", type: "textarea" },
    { name: "currentCtc", label: "What is your current CTC?", type: "text" },
    { name: "inHandSalary", label: "What is your in-hand salary per month?", type: "text" },
    { name: "expectedCtc", label: "What is your expected CTC?", type: "text" },
    { name: "expectedInHand", label: "What is your expected salary in hand?", type: "text" },
    { name: "noticePeriod", label: "What is your notice period?", type: "text" },
    { name: "earliestJoinDate", label: "What is the earliest date you can join?", type: "date" },
    { name: "dependents", label: "Do you have dependents? If yes, who are they?", type: "text" },
    {
        name: "readyOnCurrentCtc",
        label:
            "If you have to join the new job on your current CTC but with an improved net in-hand per month, are you ready to join?",
        type: "select",
    },
];

const initialForm: Record<string, string> = Object.fromEntries(fields.map((f) => [f.name, ""]));

export default function CandidateScreeningPage() {
    const [form, setForm] = useState<Record<string, string>>(initialForm);
    const [fileName, setFileName] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [recaptchaChecked, setRecaptchaChecked] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleChange =
        (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            setForm((prev) => ({ ...prev, [name]: e.target.value }));
        };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setFileName(e.target.files[0].name);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) setFileName(e.dataTransfer.files[0].name);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!recaptchaChecked) {
            alert("Please confirm you're not a robot.");
            return;
        }

        // TODO: replace with the real backend/admin-panel API call once it exists.
        // Example shape for later:
        // const payload = new FormData();
        // Object.entries(form).forEach(([key, value]) => payload.append(key, value));
        // if (resumeFile) payload.append("resume", resumeFile);
        // await fetch("/api/candidate-screening", { method: "POST", body: payload });

        console.log("Candidate screening submission (placeholder):", form, fileName);

        setShowToast(true);
        window.setTimeout(() => setShowToast(false), 4000);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="relative flex-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]" />
                <FloatingBlob className="-right-20 top-10 h-72 w-72" color="bg-blue-400/10" duration={16} />
                <FloatingBlob className="-left-16 top-96 h-64 w-64" color="bg-cyan-300/10" duration={20} />

                <section className="relative mx-auto max-w-2xl px-6 pb-20 pt-16 sm:pt-20">
                    <AnimatedHeading
                        text="Candidate Screening"
                        as="h1"
                        className="text-center text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
                    />

                    <AnimateIn delay={0.1} className="mt-10">
                        <div className="rounded-2xl bg-gradient-to-br from-blue-400/30 via-cyan-300/20 to-blue-600/30 p-[1px]">
                            <MouseGlow className="rounded-2xl">
                                <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/70 sm:p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {fields.map((field) => (
                                            <div key={field.name}>
                                                <label className="mb-1.5 block text-sm font-medium text-[#1a2b4a] dark:text-blue-400">
                                                    {field.label}
                                                </label>

                                                {field.type === "textarea" ? (
                                                    <textarea
                                                        value={form[field.name]}
                                                        onChange={handleChange(field.name)}
                                                        rows={4}
                                                        className="w-full resize-y rounded-md border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 focus:border-[#1a2b4a] focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                                                    />
                                                ) : field.type === "select" ? (
                                                    <select
                                                        value={form[field.name]}
                                                        onChange={handleChange(field.name)}
                                                        className="w-full rounded-md border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-600 focus:border-[#1a2b4a] focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                ) : (
                                                    <input
                                                        type={field.type}
                                                        value={form[field.name]}
                                                        onChange={handleChange(field.name)}
                                                        className="w-full rounded-md border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 focus:border-[#1a2b4a] focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                                                    />
                                                )}
                                            </div>
                                        ))}

                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#1a2b4a] dark:text-blue-400">
                                                Upload Resume
                                            </label>
                                            <label
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                    setIsDragging(true);
                                                }}
                                                onDragLeave={() => setIsDragging(false)}
                                                onDrop={handleDrop}
                                                className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center text-sm font-medium transition-colors ${
                                                    isDragging
                                                        ? "border-blue-400 bg-blue-50/60 text-[#1a2b4a] dark:bg-blue-500/10 dark:text-blue-400"
                                                        : "border-slate-300 text-slate-600 hover:border-[#1a2b4a] hover:text-[#1a2b4a] dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                                                }`}
                                            >
                                                <Upload size={20} />
                                                <span>{fileName || "Drag & drop your resume, or click to browse"}</span>
                                                <input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={handleFile}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        {/* Placeholder reCAPTCHA UI — swap for real Google reCAPTCHA
                                            (react-google-recaptcha or next-recaptcha-v3) once you have a site key. */}
                                        <label className="flex w-fit items-center gap-3 rounded-md border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                                            <input
                                                type="checkbox"
                                                checked={recaptchaChecked}
                                                onChange={(e) => setRecaptchaChecked(e.target.checked)}
                                                className="h-4 w-4"
                                            />
                                            I&apos;m not a robot
                                        </label>

                                        <RippleButton
                                            type="submit"
                                            className="rounded-full bg-[#1a2b4a] px-8 py-3 text-sm font-semibold text-white dark:bg-blue-600"
                                        >
                                            <Send size={15} />
                                            Submit
                                        </RippleButton>
                                    </form>
                                </div>
                            </MouseGlow>
                        </div>
                    </AnimateIn>
                </section>
            </main>
            <Footer />

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
                    Application submitted! (placeholder — wire up backend to actually save this)
                </div>
            )}
        </div>
    );
}
