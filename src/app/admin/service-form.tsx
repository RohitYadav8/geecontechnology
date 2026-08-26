"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { RippleButton } from "../../../components/ripple-button";

interface ServiceFormValues {
  id?: string;

  tag: string;
  title: string;
  slug: string;
  description: string;

  image: string;
  bannerImage: string;
  href: string;
  gradient: string;

  intro: string[];
  challenges: string[];
  middle: string[];
  benefits: string[];
  closing: string;
  coverage: string[];
  qa: string[];

  sections: {
    title: string;
    body: string;
  }[];

  order: number;
  isActive: boolean;
}

const emptyForm: ServiceFormValues = {
  tag: "",
  title: "",
  slug: "",
  description: "",

  image: "",
  bannerImage: "",
  href: "",
  gradient: "",

  intro: [],
  challenges: [],
  middle: [],
  benefits: [],
  closing: "",
  coverage: [],
  qa: [],

  sections: [],

  order: 0,
  isActive: true,
};

export function ServiceForm({
  initialValues,
}: {
  initialValues?: ServiceFormValues;
}) {
  const router = useRouter();

  const [form, setForm] = useState<ServiceFormValues>(
    initialValues ?? emptyForm
  );

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(initialValues?.id);

  // =========================================================
  // SLUG GENERATOR
  // =========================================================

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // =========================================================
  // NORMAL INPUT CHANGE
  // =========================================================

  const handleChange =
    (
      field:
        | "tag"
        | "title"
        | "slug"
        | "description"
        | "image"
        | "bannerImage"
        | "href"
        | "gradient"
        | "closing"
    ) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
    ) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // =========================================================
  // TITLE + AUTO SLUG
  // =========================================================

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      title: value,
      slug:
        !isEditing || !prev.slug
          ? generateSlug(value)
          : prev.slug,
    }));
  };

  // =========================================================
  // ARRAY HELPERS
  // One line = one array item
  // =========================================================

  const arrayToText = (items: string[]) => {
    return items.join("\n");
  };

  const textToArray = (value: string) => {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleArrayChange =
    (
      field:
        | "intro"
        | "challenges"
        | "middle"
        | "benefits"
        | "coverage"
        | "qa"
    ) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: textToArray(e.target.value),
      }));
    };

  // =========================================================
  // SECTIONS
  // =========================================================

  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "",
          body: "",
        },
      ],
    }));
  };

  const updateSection = (
    index: number,
    field: "title" | "body",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index
          ? {
              ...section,
              [field]: value,
            }
          : section
      ),
    }));
  };

  const removeSection = (index: number) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      if (!form.title.trim()) {
        throw new Error("Title is required.");
      }

      if (!form.slug.trim()) {
        throw new Error("Slug is required.");
      }

      if (!form.description.trim()) {
        throw new Error(
          "Description is required."
        );
      }

      if (!form.image.trim()) {
        throw new Error(
          "Service image is required."
        );
      }

      if (!form.href.trim()) {
        throw new Error("Href is required.");
      }

      const url = isEditing
        ? `/api/admin/services/${initialValues!.id}`
        : "/api/admin/services";

      const method = isEditing
        ? "PUT"
        : "POST";

      const payload = {
        tag: form.tag.trim() || null,

        title: form.title.trim(),

        slug: generateSlug(form.slug),

        description:
          form.description.trim(),

        image: form.image.trim(),

        bannerImage:
          form.bannerImage.trim() || null,

        href: form.href.trim(),

        gradient:
          form.gradient.trim() || null,

        intro:
          form.intro.length > 0
            ? form.intro
            : null,

        challenges:
          form.challenges.length > 0
            ? form.challenges
            : null,

        middle:
          form.middle.length > 0
            ? form.middle
            : null,

        benefits:
          form.benefits.length > 0
            ? form.benefits
            : null,

        closing:
          form.closing.trim() || null,

        coverage:
          form.coverage.length > 0
            ? form.coverage
            : null,

        qa:
          form.qa.length > 0
            ? form.qa
            : null,

        sections:
          form.sections.length > 0
            ? form.sections.filter(
                (section) =>
                  section.title.trim() ||
                  section.body.trim()
              )
            : null,

        order: Number(form.order) || 0,

        isActive: form.isActive,
      };

      const res = await fetch(url, {
        method,

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Something went wrong."
        );
      }

      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      console.error(
        "Service save error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // COMMON CLASSES
  // =========================================================

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

  const helpClass =
    "mt-1 text-xs text-slate-400";

  // =========================================================
  // UI
  // =========================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl space-y-8"
    >
      {/* ========================================
          BASIC INFORMATION
      ======================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Main information used on the services
          listing and detail page.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label className={labelClass}>
              Tag
            </label>

            <input
              type="text"
              value={form.tag}
              onChange={handleChange("tag")}
              placeholder="e.g. Cloud Services"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Title *
            </label>

            <input
              type="text"
              required
              value={form.title}
              onChange={handleTitleChange}
              placeholder="Cloud Services"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Slug *
            </label>

            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  slug: generateSlug(
                    e.target.value
                  ),
                }))
              }
              placeholder="cloud-services"
              className={`${inputClass} font-mono`}
            />

            <p className={helpClass}>
              Example: cloud-services
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Description *
            </label>

            <textarea
              required
              rows={5}
              value={form.description}
              onChange={handleChange(
                "description"
              )}
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>
      </div>

      {/* ========================================
          MEDIA & URL
      ======================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Media & URL
        </h2>

        <div className="mt-6 space-y-5">
          <div>
            <label className={labelClass}>
              Service Card Image *
            </label>

            <input
              type="text"
              required
              value={form.image}
              onChange={handleChange("image")}
              placeholder="/service-grid.png"
              className={inputClass}
            />

            <p className={helpClass}>
              Image displayed on the services
              listing page.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Banner Image
            </label>

            <input
              type="text"
              value={form.bannerImage}
              onChange={handleChange(
                "bannerImage"
              )}
              placeholder="/cloud-services-banner.png"
              className={inputClass}
            />

            <p className={helpClass}>
              Image displayed on the service
              detail page.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Link (href) *
            </label>

            <input
              type="text"
              required
              value={form.href}
              onChange={handleChange("href")}
              placeholder="/cloud-services"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Gradient
            </label>

            <input
              type="text"
              value={form.gradient}
              onChange={handleChange(
                "gradient"
              )}
              placeholder="from-blue-500 to-cyan-500"
              className={inputClass}
            />

            <p className={helpClass}>
              Optional Tailwind gradient classes
              used by the service page.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================
          DETAIL PAGE CONTENT
      ======================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Detail Page Content
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Enter one item per line for list
          content.
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <label className={labelClass}>
              Introduction
            </label>

            <textarea
              rows={6}
              value={arrayToText(form.intro)}
              onChange={handleArrayChange(
                "intro"
              )}
              placeholder={`First introduction paragraph\nSecond introduction paragraph`}
              className={`${inputClass} resize-y`}
            />

            <p className={helpClass}>
              One paragraph per line.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Challenges
            </label>

            <textarea
              rows={6}
              value={arrayToText(
                form.challenges
              )}
              onChange={handleArrayChange(
                "challenges"
              )}
              placeholder={`Challenge one\nChallenge two\nChallenge three`}
              className={`${inputClass} resize-y`}
            />

            <p className={helpClass}>
              One challenge per line.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Middle Content
            </label>

            <textarea
              rows={6}
              value={arrayToText(form.middle)}
              onChange={handleArrayChange(
                "middle"
              )}
              placeholder={`First paragraph\nSecond paragraph`}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div>
            <label className={labelClass}>
              Benefits
            </label>

            <textarea
              rows={6}
              value={arrayToText(
                form.benefits
              )}
              onChange={handleArrayChange(
                "benefits"
              )}
              placeholder={`Benefit one\nBenefit two\nBenefit three`}
              className={`${inputClass} resize-y`}
            />

            <p className={helpClass}>
              One benefit per line.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Closing Content
            </label>

            <textarea
              rows={6}
              value={form.closing}
              onChange={handleChange(
                "closing"
              )}
              placeholder="Closing paragraph..."
              className={`${inputClass} resize-y`}
            />
          </div>

          <div>
            <label className={labelClass}>
              Coverage
            </label>

            <textarea
              rows={6}
              value={arrayToText(
                form.coverage
              )}
              onChange={handleArrayChange(
                "coverage"
              )}
              placeholder={`Coverage item one\nCoverage item two`}
              className={`${inputClass} resize-y`}
            />

            <p className={helpClass}>
              One coverage item per line.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Q&A / Additional Points
            </label>

            <textarea
              rows={6}
              value={arrayToText(form.qa)}
              onChange={handleArrayChange(
                "qa"
              )}
              placeholder={`Question or point one\nQuestion or point two`}
              className={`${inputClass} resize-y`}
            />

            <p className={helpClass}>
              One item per line.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================
          CUSTOM SECTIONS
      ======================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Custom Sections
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add title and body sections when
              required.
            </p>
          </div>

          <button
            type="button"
            onClick={addSection}
            className="rounded-lg bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-600 transition hover:bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400 dark:hover:bg-violet-500/20"
          >
            + Add Section
          </button>
        </div>

        {form.sections.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400 dark:border-slate-700">
            No custom sections added.
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {form.sections.map(
              (section, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 p-5 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Section {index + 1}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        removeSection(index)
                      }
                      className="text-sm font-medium text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 space-y-4">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) =>
                        updateSection(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="Section title"
                      className={inputClass}
                    />

                    <textarea
                      rows={5}
                      value={section.body}
                      onChange={(e) =>
                        updateSection(
                          index,
                          "body",
                          e.target.value
                        )
                      }
                      placeholder="Section content"
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* ========================================
          DISPLAY SETTINGS
      ======================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Display Settings
        </h2>

        <div className="mt-6">
          <label className={labelClass}>
            Display Order
          </label>

          <input
            type="number"
            min={0}
            value={form.order}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                order:
                  Number(e.target.value) ||
                  0,
              }))
            }
            className={`${inputClass} max-w-40`}
          />
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Active Service
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Inactive services can be hidden
                from the public website.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  isActive:
                    !prev.isActive,
                }))
              }
              aria-pressed={form.isActive}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                form.isActive
                  ? "bg-violet-600"
                  : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  form.isActive
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </p>
      )}

      {/* SUBMIT */}

      <div className="flex items-center gap-3">
        <RippleButton
          type="submit"
          disabled={saving}
          className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Service"}
        </RippleButton>

        <button
          type="button"
          onClick={() =>
            router.push("/admin/services")
          }
          disabled={saving}
          className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}