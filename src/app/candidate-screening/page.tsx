"use client";

import { useState } from "react";
import { Upload, FileText, X, ArrowUpRight } from "lucide-react";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import {
    SitePage,
    PageHeader,
    Section,
    fieldClass,
    labelClass,
} from "../../../components/site/ui";

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

/* Question groups: consecutive slices of `fields` (order unchanged) */
const fieldGroups = [
    { label: "Personal & education", start: 0, end: 7 },
    { label: "Role & experience", start: 7, end: 17 },
    { label: "Compensation & availability", start: 17, end: fields.length },
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

    const renderField = (field: FieldConfig) => {
        if (field.type === "textarea") {
            return (
                <textarea
                    id={field.name}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange(field.name)}
                    rows={4}
                    required={field.required}
                    placeholder="Enter your answer..."
                    className={`${fieldClass} resize-y`}
                />
            );
        }

        if (field.type === "select") {
            return (
                <select
                    id={field.name}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange(field.name)}
                    required={field.required}
                    className={`${fieldClass} cursor-pointer`}
                >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            );
        }

        return (
            <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange(field.name)}
                required={field.required}
                placeholder={
                    field.type === "date" ? undefined : "Enter your answer..."
                }
                className={fieldClass}
            />
        );
    };

    return (
        <SitePage>
            <Navbar />

            <main className="flex-1">
                <PageHeader
                    trail={[{ label: "Careers", href: "/careers" }]}
                    title="Candidate Screening"
                    intro="Please complete the following information carefully. Our recruitment team will review your application and contact you if your profile matches our requirements."
                    meta={
                        <p className={labelClass}>
                            <span className="text-accent">*</span> Required
                        </p>
                    }
                />

                <form onSubmit={handleSubmit}>
                    {fieldGroups.map((group, groupIndex) => (
                        <Section
                            key={group.label}
                            index={String(groupIndex + 1).padStart(2, "0")}
                            label={group.label}
                        >
                            <ol className="border-t border-line">
                                {fields
                                    .slice(group.start, group.end)
                                    .map((field, i) => (
                                        <li
                                            key={field.name}
                                            className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-line py-6 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-10"
                                        >
                                            <span className="pt-0.5 font-mono text-xs text-muted">
                                                {String(
                                                    group.start + i + 1
                                                ).padStart(2, "0")}
                                            </span>

                                            <label
                                                htmlFor={field.name}
                                                className="text-[15px] leading-6 text-ink"
                                            >
                                                {field.label}
                                                {field.required && (
                                                    <span
                                                        aria-hidden
                                                        className="ml-1 text-accent"
                                                    >
                                                        *
                                                    </span>
                                                )}
                                            </label>

                                            <div className="col-start-2 lg:col-start-3 lg:-mt-3">
                                                {renderField(field)}
                                            </div>
                                        </li>
                                    ))}
                            </ol>
                        </Section>
                    ))}

                    <Section
                        index={String(fieldGroups.length + 1).padStart(2, "0")}
                        label="Resume & submit"
                    >
                        <div className="max-w-3xl">
                            <p className={labelClass}>
                                Upload Resume
                                <span className="ml-1 text-accent">*</span>
                            </p>

                            {!resumeFile ? (
                                <label
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleDrop}
                                    className={`mt-4 flex w-full cursor-pointer items-center gap-4 border border-dashed px-5 py-8 transition-colors ${
                                        isDragging
                                            ? "border-accent bg-paper-2 text-accent"
                                            : "border-line text-ink-2 hover:border-ink"
                                    }`}
                                >
                                    <Upload
                                        size={20}
                                        className="shrink-0 text-accent"
                                    />

                                    <span>
                                        <span className="block text-[15px] text-ink">
                                            Drag &amp; drop your resume, or
                                            click to browse
                                        </span>
                                        <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                                            PDF, DOC or DOCX · Max 5MB
                                        </span>
                                    </span>

                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFile}
                                        className="hidden"
                                    />
                                </label>
                            ) : (
                                <div className="mt-4 flex items-center justify-between gap-4 border border-line px-5 py-4">
                                    <div className="flex min-w-0 items-center gap-4">
                                        <FileText
                                            size={20}
                                            className="shrink-0 text-accent"
                                        />

                                        <div className="min-w-0">
                                            <p className="truncate text-[15px] text-ink">
                                                {resumeFile.name}
                                            </p>
                                            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                                                {(
                                                    resumeFile.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}{" "}
                                                MB
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        aria-label="Remove resume"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}

                            <label className="mt-8 flex w-fit cursor-pointer items-center gap-3 text-[15px] text-ink">
                                <input
                                    type="checkbox"
                                    checked={recaptchaChecked}
                                    onChange={(e) =>
                                        setRecaptchaChecked(e.target.checked)
                                    }
                                    className="h-4 w-4 cursor-pointer rounded-none accent-[var(--accent)]"
                                />
                                <span>I&apos;m not a robot</span>
                            </label>

                            <div className="mt-10 border-t border-line pt-8">
                                {errorMessage && (
                                    <p
                                        role="alert"
                                        className="mb-6 border-l-2 border-red-600 pl-4 text-[15px] text-red-700 dark:border-red-400 dark:text-red-400"
                                    >
                                        {errorMessage}
                                    </p>
                                )}

                                {showToast && (
                                    <div
                                        role="status"
                                        className="mb-6 border-l-2 border-accent pl-4"
                                    >
                                        <p className="text-[15px] font-semibold text-ink">
                                            Application submitted!
                                        </p>
                                        <p className="mt-1 text-[14px] text-ink-2">
                                            Your application has been received
                                            successfully.
                                        </p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-2 bg-accent px-7 py-4 text-sm font-semibold text-accent-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin border-2 border-current border-t-transparent" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Application
                                            <ArrowUpRight size={16} />
                                        </>
                                    )}
                                </button>

                                <p className="mt-5 max-w-[60ch] text-[13px] leading-6 text-muted">
                                    By submitting this form, you confirm that
                                    the information provided is accurate and
                                    complete.
                                </p>
                            </div>
                        </div>
                    </Section>
                </form>
            </main>

            <Footer />
        </SitePage>
    );
}
