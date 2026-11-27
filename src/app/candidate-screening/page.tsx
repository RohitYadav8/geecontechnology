"use client";

import { useState } from "react";
import { Upload, Send, CheckCircle, FileText, X } from "lucide-react";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
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
    const [form, setForm] =
        useState<Record<string, string>>(initialForm);

    const [resumeFile, setResumeFile] =
        useState<File | null>(null);

    const [isDragging, setIsDragging] =
        useState(false);

    const [recaptchaChecked, setRecaptchaChecked] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [showToast, setShowToast] =
        useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");

    const handleChange =
        (name: string) =>
        (
            e: React.ChangeEvent<
                HTMLInputElement |
                    HTMLTextAreaElement |
                    HTMLSelectElement
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
            setErrorMessage(
                "Resume size must be less than 5 MB."
            );
            return false;
        }

        setErrorMessage("");
        return true;
    };

    const handleFileSelect = (
        file: File | undefined
    ) => {
        if (!file) return;

        if (!validateFile(file)) {
            setResumeFile(null);
            return;
        }

        setResumeFile(file);
    };

    const handleFile = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        handleFileSelect(e.target.files?.[0]);
    };

    const handleDrop = (
        e: React.DragEvent<HTMLLabelElement>
    ) => {
        e.preventDefault();
        setIsDragging(false);

        handleFileSelect(
            e.dataTransfer.files?.[0]
        );
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

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setErrorMessage("");

        if (!recaptchaChecked) {
            setErrorMessage(
                "Please confirm that you're not a robot."
            );
            return;
        }

        if (!resumeFile) {
            setErrorMessage(
                "Please upload your resume before submitting."
            );
            return;
        }

        setIsSubmitting(true);

        try {
            /*
             * ==========================================
             * CREATE FORM DATA
             * ==========================================
             */

            const payload = new FormData();

            Object.entries(form).forEach(
                ([key, value]) => {
                    payload.append(key, value);
                }
            );

            payload.append("resume", resumeFile);

            /*
             * ==========================================
             * SEND DATA TO BACKEND
             * ==========================================
             */

            const response = await fetch(
                "/api/candidate-screening",
                {
                    method: "POST",
                    body: payload,
                }
            );

            /*
             * ==========================================
             * READ BACKEND RESPONSE
             * ==========================================
             */

            const data = await response.json();

            console.log(
                "Candidate Screening API Response:",
                data
            );

            /*
             * ==========================================
             * HANDLE ERROR
             * ==========================================
             */

            if (!response.ok) {
                throw new Error(
                    data.error ||
                        "Failed to submit application."
                );
            }

            /*
             * ==========================================
             * SUCCESS
             * ==========================================
             */

            console.log(
                "Candidate application submitted successfully."
            );

            showSuccessToast();

            resetForm();
        } catch (error) {
            console.error(
                "Candidate screening submission error:",
                error
            );

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while submitting your application. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#060b16]">
            <Navbar />

            <main className="relative flex-1 overflow-hidden">
                {/* Hero */}

                <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-16 text-center text-white sm:px-8 sm:pb-44 sm:pt-20 lg:px-10">
                    <FloatingBlob
                        className="-left-40 top-24 h-[460px] w-[460px]"
                        color="bg-cyan-300/35"
                        duration={18}
                    />

                    <FloatingBlob
                        className="-right-28 -top-24 h-[420px] w-[420px]"
                        color="bg-violet-300/40"
                        duration={16}
                    />

                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
                            backgroundSize: "56px 56px",
                        }}
                    />

                    <div className="relative mx-auto max-w-4xl">
                        <AnimatedHeading
                            text="Candidate Screening"
                            as="h1"
                            delay={0.05}
                            highlightFrom={1}
                            highlightClassName="brand-text-light"
                            className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]"
                        />

                        <AnimateIn delay={0.1}>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                                Please complete the
                                following information
                                carefully. Our recruitment
                                team will review your
                                application and contact you
                                if your profile matches our
                                requirements.
                            </p>
                        </AnimateIn>
                    </div>
                </section>

                <section className="relative z-10 mx-auto -mt-28 max-w-4xl px-4 pb-20 sm:-mt-32 sm:px-6 lg:pb-24">
                    {/* Form */}

                    <AnimateIn
                        delay={0.1}
                    >
                        <div>
                            <div>
                                <div className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-10 lg:p-12 dark:border-white/[0.07] dark:bg-[#0b1220]">
                                    <div className="brand-grad mb-8 h-1.5 w-16 rounded-full" />
                                    <form
                                        onSubmit={
                                            handleSubmit
                                        }
                                        className="space-y-6"
                                    >
                                        {fields.map(
                                            (field) => (
                                                <div
                                                    key={
                                                        field.name
                                                    }
                                                >
                                                    <label
                                                        htmlFor={
                                                            field.name
                                                        }
                                                        className="mb-2 block text-[13px] font-semibold text-slate-800 dark:text-slate-200"
                                                    >
                                                        {
                                                            field.label
                                                        }

                                                        {field.required && (
                                                            <span className="ml-1 text-red-500">
                                                                *
                                                            </span>
                                                        )}
                                                    </label>

                                                    {field.type ===
                                                    "textarea" ? (
                                                        <textarea
                                                            id={
                                                                field.name
                                                            }
                                                            name={
                                                                field.name
                                                            }
                                                            value={
                                                                form[
                                                                    field
                                                                        .name
                                                                ]
                                                            }
                                                            onChange={handleChange(
                                                                field.name
                                                            )}
                                                            rows={
                                                                5
                                                            }
                                                            required={
                                                                field.required
                                                            }
                                                            placeholder="Enter your answer..."
                                                            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                                                        />
                                                    ) : field.type ===
                                                      "select" ? (
                                                        <select
                                                            id={
                                                                field.name
                                                            }
                                                            name={
                                                                field.name
                                                            }
                                                            value={
                                                                form[
                                                                    field
                                                                        .name
                                                                ]
                                                            }
                                                            onChange={handleChange(
                                                                field.name
                                                            )}
                                                            required={
                                                                field.required
                                                            }
                                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300"
                                                        >
                                                            <option value="">
                                                                Select
                                                                an
                                                                option
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
                                                            id={
                                                                field.name
                                                            }
                                                            name={
                                                                field.name
                                                            }
                                                            type={
                                                                field.type
                                                            }
                                                            value={
                                                                form[
                                                                    field
                                                                        .name
                                                                ]
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
                                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                                                        />
                                                    )}
                                                </div>
                                            )
                                        )}

                                        {/* Resume Upload */}

                                        <div>
                                            <label className="mb-2 block text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                                                Upload Resume

                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            </label>

                                            {!resumeFile ? (
                                                <label
                                                    onDragOver={(
                                                        e
                                                    ) => {
                                                        e.preventDefault();
                                                        setIsDragging(
                                                            true
                                                        );
                                                    }}
                                                    onDragLeave={() =>
                                                        setIsDragging(
                                                            false
                                                        )
                                                    }
                                                    onDrop={
                                                        handleDrop
                                                    }
                                                    className={`flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-10 text-center transition-all ${
                                                        isDragging
                                                            ? "border-violet-500 bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300"
                                                            : "border-slate-300 bg-slate-50/60 text-slate-600 hover:border-violet-400 hover:bg-violet-50/60 hover:text-violet-600 dark:border-white/[0.12] dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-violet-400 dark:hover:bg-violet-500/5"
                                                    }`}
                                                >
                                                    <div className="brand-grad flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                                                        <Upload
                                                            size={
                                                                22
                                                            }
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold">
                                                            Drag
                                                            & drop
                                                            your
                                                            resume
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-400">
                                                            or
                                                            click
                                                            to
                                                            browse
                                                        </p>
                                                    </div>

                                                    <p className="text-xs text-slate-400">
                                                        PDF, DOC
                                                        or DOCX
                                                        • Max
                                                        5MB
                                                    </p>

                                                    <input
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={
                                                            handleFile
                                                        }
                                                        className="hidden"
                                                    />
                                                </label>
                                            ) : (
                                                <div className="flex items-center justify-between rounded-2xl border border-violet-200 bg-violet-50/60 px-4 py-4 dark:border-violet-500/30 dark:bg-violet-500/10">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-lg shadow-violet-500/25">
                                                            <FileText
                                                                size={
                                                                    20
                                                                }
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
                                                        onClick={
                                                            removeFile
                                                        }
                                                        aria-label="Remove resume"
                                                        className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
                                                    >
                                                        <X
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Error */}

                                        {errorMessage && (
                                            <div
                                                role="alert"
                                                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                                            >
                                                {
                                                    errorMessage
                                                }
                                            </div>
                                        )}

                                        {/* Captcha */}

                                        <label className="flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-violet-300 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    recaptchaChecked
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setRecaptchaChecked(
                                                        e
                                                            .target
                                                            .checked
                                                    )
                                                }
                                                className="h-4 w-4 cursor-pointer accent-violet-600"
                                            />

                                            <span>
                                                I&apos;m not
                                                a robot
                                            </span>
                                        </label>

                                        {/* Submit */}

                                        <div className="pt-2">
                                            <RippleButton
                                                type="submit"
                                                disabled={
                                                    isSubmitting
                                                }
                                                className="brand-grad flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send
                                                            size={
                                                                15
                                                            }
                                                        />

                                                        Submit
                                                        Application
                                                    </>
                                                )}
                                            </RippleButton>
                                        </div>

                                        <p className="text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
                                            By submitting
                                            this form,
                                            you confirm
                                            that the
                                            information
                                            provided is
                                            accurate and
                                            complete.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </AnimateIn>
                </section>
            </main>

            <Footer />

            {/* Success Toast */}

            {showToast && (
                <div
                    role="status"
                    className="fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-violet-200 bg-white px-5 py-4 text-sm font-medium text-slate-800 shadow-2xl dark:border-violet-500/20 dark:bg-[#0b1220] dark:text-white"
                    style={{
                        animation:
                            "candidate-toast-in 0.3s ease-out",
                    }}
                >
                    <div className="brand-grad flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-lg shadow-violet-500/25">
                        <CheckCircle size={18} />
                    </div>

                    <div>
                        <p className="font-semibold">
                            Application submitted!
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            Your application has been
                            received successfully.
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