"use client";

import { useState } from "react";
import { Upload, Send, CheckCircle, FileText, X } from "lucide-react";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { MouseGlow } from "../../../components/mouse-glow";
import { RippleButton } from "../../../components/ripple-button";

type FieldType =
    | "text"
    | "email"
    | "tel"
    | "date"
    | "textarea"
    | "select";

interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
}

const fields: FieldConfig[] = [
    {
        name: "fullName",
        label: "What is Your Full name?",
        type: "text",
        required: true,
    },
    {
        name: "email",
        label: "What is Your Contact email?",
        type: "email",
        required: true,
    },
    {
        name: "phone",
        label: "What is Your Contact Number?",
        type: "tel",
        required: true,
    },
    {
        name: "dob",
        label: "What is your Date of birth?",
        type: "date",
        required: true,
    },
    {
        name: "qualification",
        label: "What is your highest Qualification?",
        type: "text",
        required: true,
    },
    {
        name: "qualificationYear",
        label: "Which Year did you pass your highest qualification?",
        type: "date",
        required: true,
    },
    {
        name: "pursuingDegree",
        label:
            "Are you currently pursuing any degree or qualification? If yes, which degree?",
        type: "text",
    },
    {
        name: "position",
        label: "Which position are you applying for?",
        type: "text",
        required: true,
    },
    {
        name: "totalExperience",
        label: "What is your total years of experience?",
        type: "text",
        required: true,
    },
    {
        name: "relevantExperience",
        label:
            "What is your relevant years of experience for the applied job?",
        type: "text",
        required: true,
    },
    {
        name: "currentLocation",
        label: "What is your current location of work?",
        type: "text",
        required: true,
    },
    {
        name: "relocate",
        label:
            "If your current location is not Mumbai, are you ready to relocate?",
        type: "select",
        required: true,
    },
    {
        name: "travelAbroad",
        label: "Are you ready to travel abroad?",
        type: "select",
        required: true,
    },
    {
        name: "passport",
        label: "Do you have a valid passport?",
        type: "select",
        required: true,
    },
    {
        name: "visa",
        label: "Do you have a valid visa?",
        type: "select",
        required: true,
    },
    {
        name: "currentlyWorking",
        label: "Are you currently working?",
        type: "select",
        required: true,
    },
    {
        name: "reasonForChange",
        label: "What is your reason for job change? (in detail)",
        type: "textarea",
        required: true,
    },
    {
        name: "currentCtc",
        label: "What is your current CTC?",
        type: "text",
        required: true,
    },
    {
        name: "inHandSalary",
        label: "What is your in-hand salary per month?",
        type: "text",
        required: true,
    },
    {
        name: "expectedCtc",
        label: "What is your expected CTC?",
        type: "text",
        required: true,
    },
    {
        name: "expectedInHand",
        label: "What is your expected salary in hand?",
        type: "text",
        required: true,
    },
    {
        name: "noticePeriod",
        label: "What is your notice period?",
        type: "text",
        required: true,
    },
    {
        name: "earliestJoinDate",
        label: "What is the earliest date you can join?",
        type: "date",
        required: true,
    },
    {
        name: "dependents",
        label: "Do you have dependents? If yes, who are they?",
        type: "text",
    },
    {
        name: "readyOnCurrentCtc",
        label:
            "If you have to join the new job on your current CTC but with an improved net in-hand per month, are you ready to join?",
        type: "select",
        required: true,
    },
];

const initialForm: Record<string, string> = Object.fromEntries(
    fields.map((field) => [field.name, ""])
);

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function CandidateScreeningPage() {
    const [form, setForm] = useState<Record<string, string>>(initialForm);

    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const [recaptchaChecked, setRecaptchaChecked] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showToast, setShowToast] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange =
        (name: string) =>
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            setForm((prev) => ({
                ...prev,
                [name]: e.target.value,
            }));
        };

    const validateFile = (file: File) => {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setErrorMessage(
                "Please upload your resume in PDF, DOC, or DOCX format."
            );
            return false;
        }

        if (file.size > MAX_FILE_SIZE) {
            setErrorMessage("Resume size must be less than 5 MB.");
            return false;
        }

        setErrorMessage("");
        return true;
    };

    const handleFileSelect = (file: File | undefined) => {
        if (!file) return;

        if (!validateFile(file)) {
            setResumeFile(null);
            return;
        }

        setResumeFile(file);
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileSelect(e.target.files?.[0]);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        handleFileSelect(e.dataTransfer.files?.[0]);
    };

    const removeFile = () => {
        setResumeFile(null);
        setErrorMessage("");
    };

    const resetForm = () => {
        setForm(initialForm);
        setResumeFile(null);
        setRecaptchaChecked(false);
    };

    const showSuccessToast = () => {
        setShowToast(true);

        window.setTimeout(() => {
            setShowToast(false);
        }, 4000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMessage("");

        if (!recaptchaChecked) {
            setErrorMessage("Please confirm that you're not a robot.");
            return;
        }

        if (!resumeFile) {
            setErrorMessage("Please upload your resume before submitting.");
            return;
        }

        setIsSubmitting(true);

        try {
            /*
             * ---------------------------------------------------------
             * BACKEND API INTEGRATION
             * ---------------------------------------------------------
             *
             * Jab API ready ho jaye to is FormData ko:
             *
             * fetch("/api/candidate-screening", {
             *     method: "POST",
             *     body: payload,
             * });
             *
             * se send kar sakte ho.
             */

            const payload = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                payload.append(key, value);
            });

            payload.append("resume", resumeFile);

            // Temporary development log
            console.log("Candidate Screening Payload:", {
                form,
                resume: resumeFile.name,
                resumeSize: resumeFile.size,
                resumeType: resumeFile.type,
            });

            // Temporary delay to simulate API request
            await new Promise((resolve) => setTimeout(resolve, 800));

            showSuccessToast();

            resetForm();
        } catch (error) {
            console.error("Candidate screening submission error:", error);

            setErrorMessage(
                "Something went wrong while submitting your application. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />

            <main className="relative flex-1 overflow-hidden">
                {/* Grid Background */}
                <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10"
                />

                {/* Radial Background */}
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]"
                />

                {/* Floating Blobs */}
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

                <section className="relative mx-auto max-w-3xl px-6 pb-20 pt-16 sm:pt-20">
                    {/* Heading */}
                    <AnimateIn>
                        <div className="text-center">
                            <AnimatedHeading
                                text="Candidate Screening"
                                as="h1"
                                className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
                            />

                            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Please complete the following information carefully.
                                Our recruitment team will review your application
                                and contact you if your profile matches our
                                requirements.
                            </p>
                        </div>
                    </AnimateIn>

                    {/* Form */}
                    <AnimateIn
                        delay={0.1}
                        className="mt-10"
                    >
                        <div className="rounded-2xl bg-gradient-to-br from-blue-400/30 via-cyan-300/20 to-blue-600/30 p-[1px]">
                            <MouseGlow className="rounded-2xl">
                                <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/80 dark:shadow-black/20 sm:p-8">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        {fields.map((field) => (
                                            <div key={field.name}>
                                                <label
                                                    htmlFor={field.name}
                                                    className="mb-1.5 block text-sm font-medium text-[#1a2b4a] dark:text-blue-400"
                                                >
                                                    {field.label}

                                                    {field.required && (
                                                        <span className="ml-1 text-red-500">
                                                            *
                                                        </span>
                                                    )}
                                                </label>

                                                {field.type === "textarea" ? (
                                                    <textarea
                                                        id={field.name}
                                                        name={field.name}
                                                        value={
                                                            form[field.name]
                                                        }
                                                        onChange={handleChange(
                                                            field.name
                                                        )}
                                                        rows={5}
                                                        required={
                                                            field.required
                                                        }
                                                        placeholder="Enter your answer..."
                                                        className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                                                    />
                                                ) : field.type ===
                                                  "select" ? (
                                                    <select
                                                        id={field.name}
                                                        name={field.name}
                                                        value={
                                                            form[field.name]
                                                        }
                                                        onChange={handleChange(
                                                            field.name
                                                        )}
                                                        required={
                                                            field.required
                                                        }
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                                                    >
                                                        <option value="">
                                                            Select an option
                                                        </option>

                                                        <option value="Yes">
                                                            Yes
                                                        </option>

                                                        <option value="No">
                                                            No
                                                        </option>
                                                    </select>
                                                ) : (
                                                    <input
                                                        id={field.name}
                                                        name={field.name}
                                                        type={field.type}
                                                        value={
                                                            form[field.name]
                                                        }
                                                        onChange={handleChange(
                                                            field.name
                                                        )}
                                                        required={
                                                            field.required
                                                        }
                                                        placeholder={
                                                            field.type ===
                                                            "date"
                                                                ? undefined
                                                                : "Enter your answer..."
                                                        }
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                                                    />
                                                )}
                                            </div>
                                        ))}

                                        {/* Resume Upload */}
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#1a2b4a] dark:text-blue-400">
                                                Upload Resume
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            </label>

                                            {!resumeFile ? (
                                                <label
                                                    onDragOver={(e) => {
                                                        e.preventDefault();
                                                        setIsDragging(true);
                                                    }}
                                                    onDragLeave={() =>
                                                        setIsDragging(false)
                                                    }
                                                    onDrop={handleDrop}
                                                    className={`flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-10 text-center transition-all ${
                                                        isDragging
                                                            ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                                                            : "border-slate-300 text-slate-500 hover:border-blue-500 hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-400 dark:hover:bg-slate-900"
                                                    }`}
                                                >
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                        <Upload
                                                            size={22}
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold">
                                                            Drag & drop your
                                                            resume
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-400">
                                                            or click to browse
                                                        </p>
                                                    </div>

                                                    <p className="text-xs text-slate-400">
                                                        PDF, DOC or DOCX • Max
                                                        5MB
                                                    </p>

                                                    <input
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={handleFile}
                                                        className="hidden"
                                                    />
                                                </label>
                                            ) : (
                                                <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-4 dark:border-blue-500/30 dark:bg-blue-500/10">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                            <FileText
                                                                size={20}
                                                            />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                                                                {
                                                                    resumeFile.name
                                                                }
                                                            </p>

                                                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                                {(
                                                                    resumeFile.size /
                                                                    1024 /
                                                                    1024
                                                                ).toFixed(
                                                                    2
                                                                )}{" "}
                                                                MB
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={removeFile}
                                                        aria-label="Remove resume"
                                                        className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
                                                    >
                                                        <X size={17} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Error */}
                                        {errorMessage && (
                                            <div
                                                role="alert"
                                                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                                            >
                                                {errorMessage}
                                            </div>
                                        )}

                                        {/* Captcha */}
                                        <label className="flex w-fit cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition-colors hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                                            <input
                                                type="checkbox"
                                                checked={recaptchaChecked}
                                                onChange={(e) =>
                                                    setRecaptchaChecked(
                                                        e.target.checked
                                                    )
                                                }
                                                className="h-4 w-4 cursor-pointer accent-blue-600"
                                            />

                                            <span>
                                                I&apos;m not a robot
                                            </span>
                                        </label>

                                        {/* Submit */}
                                        <div className="pt-2">
                                            <RippleButton
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1a2b4a] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#0d1830] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={15} />
                                                        Submit Application
                                                    </>
                                                )}
                                            </RippleButton>
                                        </div>

                                        <p className="text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
                                            By submitting this form, you confirm
                                            that the information provided is
                                            accurate and complete.
                                        </p>
                                    </form>
                                </div>
                            </MouseGlow>
                        </div>
                    </AnimateIn>
                </section>
            </main>

            <Footer />

            {/* Success Toast */}
            {showToast && (
                <div
                    role="status"
                    className="fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-emerald-200 bg-white px-5 py-4 text-sm font-medium text-slate-800 shadow-2xl dark:border-emerald-500/20 dark:bg-slate-900 dark:text-white"
                    style={{
                        animation:
                            "candidate-toast-in 0.3s ease-out",
                    }}
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle size={18} />
                    </div>

                    <div>
                        <p className="font-semibold">
                            Application submitted!
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            Your application has been received successfully.
                        </p>
                    </div>

                    <style jsx>{`
                        @keyframes candidate-toast-in {
                            from {
                                transform: translateY(12px);
                                opacity: 0;
                            }

                            to {
                                transform: translateY(0);
                                opacity: 1;
                            }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}