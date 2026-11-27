"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { contactInfo } from "../../../lib/site-nav";
import {
  SitePage,
  PageHeader,
  Section,
  ButtonLink,
  fieldClass,
  labelClass,
} from "../../../components/site/ui";

const offices = [
  {
    title: "Head Office — UK",
    lines: [
      "Trading as Visualytes Limited",
      "Cumberland House,",
      "Southampton,",
      "SO15 2BG.",
    ],
  },
  {
    title: "Asia Corporate Office",
    lines: [
      "Row House 20, Golden Nest,",
      "Phase III, Mira-Bhayandar Road,",
      "Bhayandar East, Thane-401105.",
    ],
  },
];

const sourceOptions = [
  "Search Engine",
  "Social Media",
  "Referral",
  "Advertisement",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  source: "",
  requirements: "",
};

/* Label rail + field row */
function FieldRow({
  htmlFor,
  label,
  required,
  children,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:items-baseline sm:gap-8">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      <div>{children}</div>
    </div>
  );
}

export default function ContactUsPage() {
  const [form, setForm] = useState(initialForm);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (errorMessage) {
        setErrorMessage("");
      }
    };

  const handleClear = () => {
    setForm(initialForm);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setShowToast(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          source: form.source,
          requirements: form.requirements,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit the form.");
      }

      setForm(initialForm);
      setShowToast(true);

      window.setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } catch (error) {
      console.error("Contact form error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = `${fieldClass} disabled:cursor-not-allowed disabled:opacity-60`;

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          title="Contact Us"
          intro="Have a project in mind, or just want to say hello? We'd love to hear from you."
        />

        {/* 01 — Offices & direct contact */}

        <Section index="01" label="Offices">
          <div className="grid border-t border-line md:grid-cols-3">
            {offices.map((office) => (
              <address
                key={office.title}
                className="border-b border-line py-7 not-italic md:border-r md:px-6 md:first:pl-0"
              >
                <p className="font-display text-xl font-semibold leading-snug text-ink">
                  {office.title}
                </p>
                <div className="mt-3 text-[15px] leading-7 text-ink-2">
                  {office.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </address>
            ))}

            <div className="border-b border-line py-7 md:px-6">
              <p className={labelClass}>Email</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="mt-2 block break-all font-display text-lg font-semibold text-ink hover:text-accent"
              >
                {contactInfo.email}
              </a>

              <p className={`${labelClass} mt-6`}>Phone</p>
              <a
                href={`tel:${contactInfo.phone}`}
                className="mt-2 block font-display text-lg font-semibold text-ink hover:text-accent"
              >
                {contactInfo.phoneDisplay}
              </a>
            </div>
          </div>
        </Section>

        {/* 02 — Enquiry form */}

        <Section
          index="02"
          label="Enquiry"
          title="If you'd like us to contact you, please fill out the form."
        >
          <p className="-mt-4 mb-10 max-w-[60ch] text-[16px] leading-7 text-ink-2">
            We usually reply within 24 hours. Whether it&apos;s a quick
            question or a full project brief, our team is ready to help.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-3xl divide-y divide-line border-t border-line"
          >
            <FieldRow htmlFor="contact-name" label="Name" required>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={handleChange("name")}
                disabled={isSubmitting}
                className={field}
              />
            </FieldRow>

            <FieldRow htmlFor="contact-email" label="Email" required>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
                disabled={isSubmitting}
                className={field}
              />
            </FieldRow>

            <FieldRow htmlFor="contact-phone" label="Phone" required>
              <input
                id="contact-phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange("phone")}
                disabled={isSubmitting}
                className={field}
              />
            </FieldRow>

            <FieldRow
              htmlFor="contact-source"
              label="How did you come to know about us?"
            >
              <select
                id="contact-source"
                value={form.source}
                onChange={handleChange("source")}
                disabled={isSubmitting}
                className={`${field} cursor-pointer`}
              >
                <option value="">Select an option</option>

                {sourceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </FieldRow>

            <FieldRow htmlFor="contact-address" label="Address" required>
              <textarea
                id="contact-address"
                required
                value={form.address}
                onChange={handleChange("address")}
                disabled={isSubmitting}
                rows={3}
                className={`${field} resize-y`}
              />
            </FieldRow>

            <FieldRow htmlFor="contact-requirements" label="Requirements">
              <textarea
                id="contact-requirements"
                value={form.requirements}
                onChange={handleChange("requirements")}
                disabled={isSubmitting}
                rows={4}
                className={`${field} resize-y`}
              />
            </FieldRow>

            <div className="pt-8">
              {errorMessage && (
                <p
                  role="alert"
                  className="mb-6 border-l-2 border-red-600 pl-4 text-[15px] text-red-700 dark:border-red-400 dark:text-red-400"
                >
                  {errorMessage}
                </p>
              )}

              {showToast && (
                <p
                  role="status"
                  className="mb-6 border-l-2 border-accent pl-4 text-[15px] text-ink"
                >
                  Message sent successfully! We&apos;ll get back to you soon.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowUpRight size={16} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isSubmitting}
                  className="border-b border-current pb-0.5 text-sm font-semibold text-ink transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </Section>

        {/* 03 — Careers pointer (full text lives on /careers) */}

        <Section index="03" label="Careers">
          <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[46ch] font-display text-2xl font-medium leading-snug text-ink">
              Come on, join US. And we will help You to explore your values
              and valuate your skills.
            </p>
            <ButtonLink href="/careers" variant="outline">
              Career With Us
            </ButtonLink>
          </div>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
