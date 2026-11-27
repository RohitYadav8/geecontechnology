"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Upload } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { StatCounter } from "../../../components/stat-counter";
import {
  SitePage,
  PageHeader,
  Section,
  Prose,
  Figure,
  Stats,
  ButtonLink,
  fieldClass,
  labelClass,
} from "../../../components/site/ui";

/* =========================================================
   CAREER STATS
========================================================= */

const careerStats = [
  {
    label: "Team Members",
    value: 50,
    suffix: "+",
  },
  {
    label: "Years of Experience",
    value: 10,
    suffix: "+",
  },
  {
    label: "Client Satisfaction",
    value: 95,
    suffix: "%",
  },
];

/* =========================================================
   RESUME VALIDATION
========================================================= */

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];

function validateResume(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return "Only PDF, DOC and DOCX files are allowed.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Resume must be smaller than 5 MB.";
  }

  return null;
}

/* =========================================================
   FORM ROW: label rail + field
========================================================= */

function FieldRow({
  htmlFor,
  label,
  children,
}: {
  htmlFor: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      <div>{children}</div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function CareersPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* FORM CHANGE */

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  /* SELECT RESUME */

  const setSelectedResume = (file: File) => {
    setSubmitError("");

    const validationError = validateResume(file);

    if (validationError) {
      setResumeFile(null);
      setFileName("");
      setSubmitError(validationError);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setResumeFile(file);
    setFileName(file.name);
  };

  /* FILE INPUT */

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedResume(file);
  };

  /* DRAG DROP */

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    setSelectedResume(file);
  };

  /* SUBMIT */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitError("");

    if (!resumeFile) {
      setSubmitError("Please upload your resume.");

      return;
    }

    const validationError = validateResume(resumeFile);

    if (validationError) {
      setSubmitError(validationError);

      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("firstName", form.firstName.trim());
      formData.append("lastName", form.lastName.trim());
      formData.append("email", form.email.trim());
      formData.append("phone", form.phone.trim());
      formData.append("resume", resumeFile);

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to submit application.");
      }

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });

      setResumeFile(null);
      setFileName("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setShowToast(true);

      window.setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } catch (error) {
      console.error("Career application error:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          title="Career With Us"
          intro="Come on, join US. And we will help You to explore your values and valuate your skills."
        />

        {/* 01 — About working here */}

        <Section index="01" label="Working here">
          <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-16">
            <Prose>
              <p>
                Geecon Group has many years experience of providing software
                solutions and affordable services for small, mid and large
                companies &amp; corporations. We also provide services in
                different industries like Resourcing, Corporate Training and
                Design. We have the history of working hard to ensure the
                customer confidence in us and have mission to continue the same
                with the dedication to serve our customers.
              </p>
              <p>
                The first appeal: you are the star. All we want to know is: Are
                you capable enough to &lsquo;outcast&rsquo; the dreams in you?
              </p>
              <p>
                At Geecon Technology, we believe in &lsquo;optimism&rsquo;.
                After lots of efforts we decided to throw out the
                &lsquo;creative persona test&rsquo; among you.
              </p>
              <p>
                Once you realise you have the &lsquo;stardom&rsquo; in you,
                unleash it. The world is yours, and your career is ready to go
                heights.
              </p>
              <p>
                Explore yourselves with us. Valuate your skills. Take the test,
                take the challenge. This is our work &lsquo;pledge&rsquo;.
              </p>
              <p>
                If you think you have your own rules, you are most welcome to
                share them with us.
              </p>
              <p>
                We want fresh or experienced candidates for our described
                services.
              </p>
            </Prose>

            <Figure
              src="/careers.png"
              alt="Careers at Geecon Technology"
              ratio="aspect-[4/5]"
              contain={false}
              priority
            />
          </div>

          <div className="mt-14">
            <Stats
              items={careerStats.map((stat) => ({
                label: stat.label,
                value: <StatCounter value={stat.value} suffix={stat.suffix} />,
              }))}
            />
          </div>

          <div className="mt-10">
            <ButtonLink href="/careers/openings">View Openings</ButtonLink>
          </div>
        </Section>

        {/* 02 — Application */}

        <div id="application-form" className="scroll-mt-24">
          <Section index="02" label="Application" title="Submit Your Details">
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl divide-y divide-line border-t border-line"
            >
              <FieldRow htmlFor="firstName" label="First name">
                <input
                  id="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  required
                  className={fieldClass}
                />
              </FieldRow>

              <FieldRow htmlFor="lastName" label="Last name">
                <input
                  id="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  required
                  className={fieldClass}
                />
              </FieldRow>

              <FieldRow htmlFor="email" label="Your email">
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                  className={fieldClass}
                />
              </FieldRow>

              <FieldRow htmlFor="phone" label="Phone">
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  required
                  className={fieldClass}
                />
              </FieldRow>

              <FieldRow htmlFor="resume" label="Upload Resume">
                <label
                  htmlFor="resume"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => {
                    setIsDragging(false);
                  }}
                  onDrop={handleDrop}
                  className={`mt-2 flex w-full cursor-pointer items-center gap-4 border border-dashed px-4 py-5 transition-colors ${
                    isDragging
                      ? "border-accent bg-paper-2 text-accent"
                      : "border-line text-ink-2 hover:border-ink"
                  }`}
                >
                  <Upload size={18} className="shrink-0 text-accent" />

                  <span className="min-w-0">
                    <span className="block truncate text-[15px] text-ink">
                      {fileName ||
                        "Drag & drop your resume, or click to browse"}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                      PDF, DOC or DOCX · Maximum 5 MB
                    </span>
                  </span>

                  <input
                    ref={fileInputRef}
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    className="hidden"
                  />
                </label>
              </FieldRow>

              <div className="pt-8">
                {submitError && (
                  <p
                    role="alert"
                    className="mb-6 border-l-2 border-red-600 pl-4 text-[15px] text-red-700 dark:border-red-400 dark:text-red-400"
                  >
                    {submitError}
                  </p>
                )}

                {showToast && (
                  <p
                    role="status"
                    className="mb-6 border-l-2 border-accent pl-4 text-[15px] text-ink"
                  >
                    Application submitted successfully!
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit"}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </form>
          </Section>
        </div>
      </main>

      <Footer />
    </SitePage>
  );
}
