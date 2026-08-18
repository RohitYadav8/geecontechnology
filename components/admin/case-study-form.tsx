"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CaseStudyFormData = {
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  shortDescription: string;
  description: string;
  image: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string;
  projectUrl: string;
  isActive: boolean;
  order: number;
};

type CaseStudyFormProps = {
  id?: string;
};

const initialForm: CaseStudyFormData = {
  title: "",
  slug: "",
  clientName: "",
  industry: "",
  shortDescription: "",
  description: "",
  image: "",
  challenge: "",
  solution: "",
  results: "",
  technologies: "",
  projectUrl: "",
  isActive: true,
  order: 0,
};

export function CaseStudyForm({
  id,
}: CaseStudyFormProps) {
  const router = useRouter();

  const [form, setForm] =
    useState<CaseStudyFormData>(initialForm);

  const [loading, setLoading] =
    useState(Boolean(id));

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const isEdit = Boolean(id);

  /* =========================================================
     LOAD CASE STUDY FOR EDIT
  ========================================================= */

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/admin/case-studies/${encodeURIComponent(id)}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "Failed to load case study"
          );
        }

        setForm({
          title: data.title || "",
          slug: data.slug || "",
          clientName: data.clientName || "",
          industry: data.industry || "",
          shortDescription:
            data.shortDescription || "",
          description: data.description || "",
          image: data.image || "",
          challenge: data.challenge || "",
          solution: data.solution || "",
          results: data.results || "",

          technologies: Array.isArray(
            data.technologies
          )
            ? data.technologies.join(", ")
            : "",

          projectUrl: data.projectUrl || "",
          isActive: data.isActive ?? true,
          order: data.order ?? 0,
        });
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load case study"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [id]);

  /* =========================================================
     SLUG
  ========================================================= */

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,

      title: value,

      slug: isEdit
        ? previous.slug
        : generateSlug(value),
    }));
  };

  /* =========================================================
     UPDATE FIELD
  ========================================================= */

  const updateField = <
    K extends keyof CaseStudyFormData
  >(
    field: K,
    value: CaseStudyFormData[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =========================================================
     SUBMIT CREATE / UPDATE
  ========================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      if (!form.title.trim()) {
        throw new Error(
          "Title is required."
        );
      }

      if (!form.slug.trim()) {
        throw new Error(
          "Slug is required."
        );
      }

      if (
        !form.shortDescription.trim()
      ) {
        throw new Error(
          "Short description is required."
        );
      }

      const technologies =
        form.technologies
          .split(",")
          .map((item) =>
            item.trim()
          )
          .filter(Boolean);

      const payload = {
        title:
          form.title.trim(),

        slug:
          form.slug.trim(),

        clientName:
          form.clientName.trim() ||
          null,

        industry:
          form.industry.trim() ||
          null,

        shortDescription:
          form.shortDescription.trim(),

        description:
          form.description.trim() ||
          null,

        image:
          form.image.trim() ||
          null,

        challenge:
          form.challenge.trim() ||
          null,

        solution:
          form.solution.trim() ||
          null,

        results:
          form.results.trim() ||
          null,

        technologies,

        projectUrl:
          form.projectUrl.trim() ||
          null,

        isActive:
          form.isActive,

        order:
          Number(form.order) || 0,
      };

      const url = isEdit
        ? `/api/admin/case-studies/${encodeURIComponent(
            id!
          )}`
        : "/api/admin/case-studies";

      const response = await fetch(url, {
        method: isEdit
          ? "PUT"
          : "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to save case study"
        );
      }

      router.push(
        "/admin/case-studies"
      );

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />

        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Loading case study...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* =====================================================
          BASIC INFORMATION
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Basic Information
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Title *
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                handleTitleChange(
                  e.target.value
                )
              }
              placeholder="Modern E-Commerce Platform"
              required
              className={inputClass}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Slug *
            </label>

            <input
              type="text"
              value={form.slug}
              onChange={(e) =>
                updateField(
                  "slug",
                  generateSlug(
                    e.target.value
                  )
                )
              }
              placeholder="modern-ecommerce-platform"
              required
              className={inputClass}
            />
          </div>

          {/* Client */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Client Name
            </label>

            <input
              type="text"
              value={form.clientName}
              onChange={(e) =>
                updateField(
                  "clientName",
                  e.target.value
                )
              }
              placeholder="Client name"
              className={inputClass}
            />
          </div>

          {/* Industry */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Industry
            </label>

            <input
              type="text"
              value={form.industry}
              onChange={(e) =>
                updateField(
                  "industry",
                  e.target.value
                )
              }
              placeholder="E-Commerce"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Project Content
        </h2>

        <div className="mt-6 space-y-5">
          {/* Short Description */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Short Description *
            </label>

            <textarea
              value={
                form.shortDescription
              }
              onChange={(e) =>
                updateField(
                  "shortDescription",
                  e.target.value
                )
              }
              rows={3}
              required
              className={inputClass}
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Description
            </label>

            <textarea
              value={
                form.description
              }
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              rows={6}
              className={inputClass}
            />
          </div>

          {/* Challenge */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Challenge
            </label>

            <textarea
              value={
                form.challenge
              }
              onChange={(e) =>
                updateField(
                  "challenge",
                  e.target.value
                )
              }
              rows={5}
              className={inputClass}
            />
          </div>

          {/* Solution */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Solution
            </label>

            <textarea
              value={
                form.solution
              }
              onChange={(e) =>
                updateField(
                  "solution",
                  e.target.value
                )
              }
              rows={5}
              className={inputClass}
            />
          </div>

          {/* Results */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Results
            </label>

            <textarea
              value={
                form.results
              }
              onChange={(e) =>
                updateField(
                  "results",
                  e.target.value
                )
              }
              rows={5}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          MEDIA
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Media & Technology
        </h2>

        <div className="mt-6 space-y-5">
          {/* Image */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Image URL
            </label>

            <input
              type="text"
              value={form.image}
              onChange={(e) =>
                updateField(
                  "image",
                  e.target.value
                )
              }
              placeholder="/uploads/media/project.jpg"
              className={inputClass}
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Technologies
            </label>

            <input
              type="text"
              value={
                form.technologies
              }
              onChange={(e) =>
                updateField(
                  "technologies",
                  e.target.value
                )
              }
              placeholder="Next.js, TypeScript, Prisma, MySQL"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-slate-400">
              Technologies ko comma se
              separate karo.
            </p>
          </div>

          {/* Project URL */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Project URL
            </label>

            <input
              type="url"
              value={
                form.projectUrl
              }
              onChange={(e) =>
                updateField(
                  "projectUrl",
                  e.target.value
                )
              }
              placeholder="https://example.com"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          SETTINGS
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Settings
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Order */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Display Order
            </label>

            <input
              type="number"
              min={0}
              value={form.order}
              onChange={(e) =>
                updateField(
                  "order",
                  Number(
                    e.target.value
                  )
                )
              }
              className={inputClass}
            />
          </div>

          {/* Active */}
          <div className="flex items-center pt-7">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={
                  form.isActive
                }
                onChange={(e) =>
                  updateField(
                    "isActive",
                    e.target.checked
                  )
                }
                className="h-5 w-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />

              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Case study is active
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() =>
            router.push(
              "/admin/case-studies"
            )
          }
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : isEdit
              ? "Update Case Study"
              : "Create Case Study"}
        </button>
      </div>
    </form>
  );
}