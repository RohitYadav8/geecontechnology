"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";

import { fieldClass, labelClass } from "./site/ui";

type BrochureFormProps = {
  productId?: string;

  /*
   * Kept for API compatibility with existing callers.
   * The editorial design uses the single site accent, so
   * these per-record colours are no longer rendered.
   */
  gradientFrom?: string | null;
  gradientVia?: string | null;
  gradientTo?: string | null;
};

const fields = [
  {
    key: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter your name",
    autoComplete: "name",
  },
  {
    key: "phone",
    label: "Phone",
    type: "tel",
    required: true,
    placeholder: "Enter phone number",
    autoComplete: "tel",
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter your email",
    autoComplete: "email",
  },
  {
    key: "company",
    label: "Company Name",
    type: "text",
    required: false,
    placeholder: "Enter company name",
    autoComplete: "organization",
  },
  {
    key: "website",
    label: "Company Website",
    type: "text",
    required: false,
    placeholder: "https://example.com",
    autoComplete: "url",
  },
] as const;

export function BrochureForm({ productId }: BrochureFormProps) {
  // ============================================================
  // FORM STATE
  // ============================================================

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  // ============================================================
  // INPUT CHANGE
  // ============================================================

  const handleChange =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      if (error) {
        setError("");
      }

      if (success) {
        setSuccess("");
      }
    };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const response = await fetch("/api/brochure-requests", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,
          productId: productId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to submit brochure request.");
      }

      setSuccess(
        "Request submitted successfully. We will contact you shortly."
      );

      setForm({
        name: "",
        phone: "",
        email: "",
        company: "",
        website: "",
      });
    } catch (err) {
      console.error("Brochure request error:", err);

      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="@container w-full border-t-2 border-ink pt-6">
      <h3 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[28px]">
        Download brochure
      </h3>

      <p className="mt-3 max-w-[48ch] text-[15px] leading-7 text-ink-2">
        Share your details and our team will provide the brochure and
        relevant information.
      </p>

      {success && (
        <p
          role="status"
          className="mt-6 border-l-2 border-accent pl-4 text-sm leading-6 text-ink"
        >
          {success}
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-6 border-l-2 border-red-600 pl-4 text-sm leading-6 text-red-700 dark:border-red-400 dark:text-red-300"
        >
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-x-8 gap-y-6 @lg:grid-cols-2"
      >
        {fields.map((field) => (
          <div
            key={field.key}
            className={field.key === "website" ? "@lg:col-span-2" : undefined}
          >
            <label htmlFor={`brochure-${field.key}`} className={labelClass}>
              {field.label}
              {field.required && (
                <span aria-hidden className="ml-1 text-accent">
                  *
                </span>
              )}
            </label>

            <input
              id={`brochure-${field.key}`}
              type={field.type}
              required={field.required}
              value={form[field.key]}
              onChange={handleChange(field.key)}
              placeholder={field.placeholder}
              disabled={loading}
              autoComplete={field.autoComplete}
              className={`${fieldClass} disabled:cursor-not-allowed disabled:opacity-60`}
            />
          </div>
        ))}

        <div className="flex flex-col gap-4 pt-2 @lg:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 bg-accent px-6 text-sm font-semibold text-accent-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 @lg:w-auto @lg:self-start"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin border-2 border-current border-t-transparent" />
                Submitting…
              </>
            ) : (
              <>
                Download brochure
                <ArrowDown size={16} />
              </>
            )}
          </button>

          <p className="font-mono text-[11px] uppercase leading-5 tracking-[0.12em] text-muted">
            Your details are used only for brochure requests and business
            communication.
          </p>
        </div>
      </form>
    </div>
  );
}
