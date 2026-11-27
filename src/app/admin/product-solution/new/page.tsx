"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";

// =========================================================
// TYPES
// =========================================================

type ContentSectionType =
  | "heading"
  | "paragraph"
  | "list";

type ContentSection = {
  type: ContentSectionType;
  title: string;
  content: string;
};

type Benefit = {
  title: string;
  description: string;
};

type HighlightCard = {
  title: string;
  description: string;
};

type FormState = {
  // Basic
  name: string;
  slug: string;
  projectTag: string;
  cardBackTitle: string;
  excerpt: string;

  // Old content
  // Filhaal retain kar rahe hain
  content: string;

  // Generic dynamic content
  contentSections: ContentSection[];

  // Benefits
  benefitsTitle: string;
  benefits: Benefit[];

  // Highlight cards
  highlightCards: HighlightCard[];

  // Display
  order: string;
  isActive: boolean;

  // Media
  logoImage: string;
  bannerImage: string;
  sidebarImage: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  openGraphImage: string;
};

// =========================================================
// INITIAL STATE
// =========================================================

const initialForm: FormState = {
  name: "",
  slug: "",
  projectTag: "",
  cardBackTitle: "",
  excerpt: "",

  content: "",

  contentSections: [
    {
      type: "paragraph",
      title: "",
      content: "",
    },
  ],

  benefitsTitle: "",

  benefits: [
    {
      title: "",
      description: "",
    },
  ],

  highlightCards: [
    {
      title: "",
      description: "",
    },
  ],

  order: "0",
  isActive: true,

  logoImage: "",
  bannerImage: "",
  sidebarImage: "",

  metaTitle: "",
  metaDescription: "",
  keywords: "",
  canonicalUrl: "",
  openGraphImage: "",
};

// =========================================================
// HELPERS
// =========================================================

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// =========================================================
// PAGE
// =========================================================

export default function NewProductSolutionPage() {
  const router = useRouter();

  const [form, setForm] =
    useState<FormState>(initialForm);

  const [slugTouched, setSlugTouched] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =======================================================
  // CAN SUBMIT
  // =======================================================

  const canSubmit = useMemo(() => {
    return (
      form.name.trim() !== "" &&
      form.slug.trim() !== ""
    );
  }, [form.name, form.slug]);

  // =======================================================
  // GENERIC FIELD UPDATE
  // =======================================================

  function updateField<
    K extends keyof FormState
  >(
    field: K,
    value: FormState[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  // =======================================================
  // NAME + SLUG
  // =======================================================

  function handleNameChange(
    value: string
  ) {
    setForm((previous) => ({
      ...previous,

      name: value,

      slug: slugTouched
        ? previous.slug
        : createSlug(value),
    }));
  }

  // =======================================================
  // CONTENT SECTIONS
  // =======================================================

  function addContentSection() {
    setForm((previous) => ({
      ...previous,

      contentSections: [
        ...previous.contentSections,
        {
          type: "paragraph",
          title: "",
          content: "",
        },
      ],
    }));
  }

  function updateContentSection(
    index: number,
    field: keyof ContentSection,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,

      contentSections:
        previous.contentSections.map(
          (section, currentIndex) =>
            currentIndex === index
              ? {
                  ...section,
                  [field]: value,
                }
              : section
        ),
    }));
  }

  function removeContentSection(
    index: number
  ) {
    setForm((previous) => ({
      ...previous,

      contentSections:
        previous.contentSections.filter(
          (_, currentIndex) =>
            currentIndex !== index
        ),
    }));
  }

  function moveContentSectionUp(
    index: number
  ) {
    if (index === 0) {
      return;
    }

    setForm((previous) => {
      const sections = [
        ...previous.contentSections,
      ];

      [
        sections[index - 1],
        sections[index],
      ] = [
        sections[index],
        sections[index - 1],
      ];

      return {
        ...previous,
        contentSections: sections,
      };
    });
  }

  function moveContentSectionDown(
    index: number
  ) {
    setForm((previous) => {
      if (
        index ===
        previous.contentSections.length - 1
      ) {
        return previous;
      }

      const sections = [
        ...previous.contentSections,
      ];

      [
        sections[index],
        sections[index + 1],
      ] = [
        sections[index + 1],
        sections[index],
      ];

      return {
        ...previous,
        contentSections: sections,
      };
    });
  }

  // =======================================================
  // BENEFITS
  // =======================================================

  function addBenefit() {
    setForm((previous) => ({
      ...previous,

      benefits: [
        ...previous.benefits,
        {
          title: "",
          description: "",
        },
      ],
    }));
  }

  function updateBenefit(
    index: number,
    field: keyof Benefit,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,

      benefits: previous.benefits.map(
        (benefit, currentIndex) =>
          currentIndex === index
            ? {
                ...benefit,
                [field]: value,
              }
            : benefit
      ),
    }));
  }

  function removeBenefit(
    index: number
  ) {
    setForm((previous) => ({
      ...previous,

      benefits:
        previous.benefits.filter(
          (_, currentIndex) =>
            currentIndex !== index
        ),
    }));
  }

  // =======================================================
  // HIGHLIGHT CARDS
  // =======================================================

  function addHighlightCard() {
    setForm((previous) => ({
      ...previous,

      highlightCards: [
        ...previous.highlightCards,
        {
          title: "",
          description: "",
        },
      ],
    }));
  }

  function updateHighlightCard(
    index: number,
    field: keyof HighlightCard,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,

      highlightCards:
        previous.highlightCards.map(
          (card, currentIndex) =>
            currentIndex === index
              ? {
                  ...card,
                  [field]: value,
                }
              : card
        ),
    }));
  }

  function removeHighlightCard(
    index: number
  ) {
    setForm((previous) => ({
      ...previous,

      highlightCards:
        previous.highlightCards.filter(
          (_, currentIndex) =>
            currentIndex !== index
        ),
    }));
  }

  // =======================================================
  // SUBMIT
  // =======================================================

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Slug is required.");
      return;
    }

    try {
      setSaving(true);

      // -----------------------------------------------
      // Content sections cleanup
      // -----------------------------------------------

      const filteredContentSections =
        form.contentSections
          .map((section) => ({
            type: section.type,

            title:
              section.title.trim(),

            content:
              section.content.trim(),
          }))
          .filter(
            (section) =>
              section.title !== "" ||
              section.content !== ""
          );

      // -----------------------------------------------
      // Benefits cleanup
      // -----------------------------------------------

      const filteredBenefits =
        form.benefits
          .map((benefit) => ({
            title:
              benefit.title.trim(),

            description:
              benefit.description.trim(),
          }))
          .filter(
            (benefit) =>
              benefit.title !== "" ||
              benefit.description !== ""
          );

      // -----------------------------------------------
      // Highlight cards cleanup
      // -----------------------------------------------

      const filteredHighlightCards =
        form.highlightCards
          .map((card) => ({
            title:
              card.title.trim(),

            description:
              card.description.trim(),
          }))
          .filter(
            (card) =>
              card.title !== "" ||
              card.description !== ""
          );

      // -----------------------------------------------
      // API
      // -----------------------------------------------

      const response = await fetch(
        "/api/admin/product-solutions",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            // Basic
            name: form.name,
            slug: form.slug,
            projectTag:
              form.projectTag,
            cardBackTitle:
              form.cardBackTitle,
            excerpt:
              form.excerpt,

            // Old content
            content:
              form.content,

            // Generic content
            contentSections:
              filteredContentSections,

            // Benefits
            benefitsTitle:
              form.benefitsTitle,

            benefits:
              filteredBenefits,

            // Cards
            highlightCards:
              filteredHighlightCards,

            // Display
            order:
              Number(form.order) || 0,

            isActive:
              form.isActive,

            // Media
            logoImage:
              form.logoImage,

            bannerImage:
              form.bannerImage,

            sidebarImage:
              form.sidebarImage,

            // SEO
            metaTitle:
              form.metaTitle,

            metaDescription:
              form.metaDescription,

            keywords:
              form.keywords,

            canonicalUrl:
              form.canonicalUrl,

            openGraphImage:
              form.openGraphImage,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to create product solution"
        );
      }

      setSuccess(
        "Product solution created successfully."
      );

      setTimeout(() => {
        router.push(
          "/admin/product-solution"
        );

        router.refresh();
      }, 700);
    } catch (err) {
      console.error(
        "Create product solution error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================== */}

        <div className="brand-grad relative mb-8 overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          <button
            type="button"
            onClick={() =>
              router.push(
                "/admin/product-solution"
              )
            }
            className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-xl transition hover:bg-white/25"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Product Solutions
          </button>

          <h1 className="relative text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
            Add Product Solution
          </h1>

          <p className="relative mt-2 max-w-2xl text-sm leading-6 text-indigo-50/90">
            Create and manage a dynamic
            product solution page. The
            same structure can be used
            for Mobile Solution, ERP,
            Hosting, Training and other
            solutions.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* =================================================
              ERROR / SUCCESS
          ================================================== */}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              {success}
            </div>
          )}

          {/* =================================================
              BASIC INFORMATION
          ================================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="mb-6">
              <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Main information used on
                the home page and detail
                page.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Name *
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    handleNameChange(
                      event.target.value
                    )
                  }
                  placeholder="ERP Solutions"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Slug */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Slug *
                </label>

                <input
                  type="text"
                  value={form.slug}
                  onChange={(event) => {
                    setSlugTouched(true);

                    updateField(
                      "slug",
                      createSlug(
                        event.target.value
                      )
                    );
                  }}
                  placeholder="erp-solutions"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Project Tag */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Project Tag
                </label>

                <input
                  type="text"
                  value={
                    form.projectTag
                  }
                  onChange={(event) =>
                    updateField(
                      "projectTag",
                      event.target.value
                    )
                  }
                  placeholder="Enterprise Solutions"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Card Back Title */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Card / CTA Title
                </label>

                <input
                  type="text"
                  value={
                    form.cardBackTitle
                  }
                  onChange={(event) =>
                    updateField(
                      "cardBackTitle",
                      event.target.value
                    )
                  }
                  placeholder="Explore ERP Solutions"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Excerpt */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Excerpt
                </label>

                <textarea
                  value={form.excerpt}
                  onChange={(event) =>
                    updateField(
                      "excerpt",
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Short description shown on the home page..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06] resize-y"
                />
              </div>

              {/* Order */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Order
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.order}
                  onChange={(event) =>
                    updateField(
                      "order",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Active */}

              <div className="flex items-end">
                <label className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 transition hover:border-violet-300 dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Active
                    </p>

                    <p className="text-xs text-slate-500">
                      Show this solution
                      on the website.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={
                      form.isActive
                    }
                    onChange={(event) =>
                      updateField(
                        "isActive",
                        event.target.checked
                      )
                    }
                    className="h-5 w-5 shrink-0 rounded border-slate-300 accent-violet-600"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* =================================================
              DYNAMIC CONTENT SECTIONS
          ================================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Content Sections
                </h2>

                <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                  Build the detail-page
                  content using headings,
                  paragraphs and lists.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  addContentSection
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300"
              >
                <Plus className="h-4 w-4" />

                Add Section
              </button>
            </div>

            {form.contentSections
              .length > 0 ? (
              <div className="space-y-5">
                {form.contentSections.map(
                  (
                    section,
                    index
                  ) => (
                    <div
                      key={index}
                      className="rounded-[20px] border border-slate-200/80 bg-slate-50/60 p-4 transition hover:border-violet-200 sm:p-5 dark:border-white/[0.07] dark:bg-white/[0.02]"
                    >
                      {/* Section header */}

                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="brand-grad flex h-8 w-8 items-center justify-center rounded-[10px] text-white shadow-md shadow-violet-500/25">
                            <GripVertical className="h-4 w-4" />
                          </span>

                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            Section{" "}
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={
                              index === 0
                            }
                            onClick={() =>
                              moveContentSectionUp(
                                index
                              )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
                          >
                            Up
                          </button>

                          <button
                            type="button"
                            disabled={
                              index ===
                              form
                                .contentSections
                                .length -
                                1
                            }
                            onClick={() =>
                              moveContentSectionDown(
                                index
                              )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
                          >
                            Down
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              removeContentSection(
                                index
                              )
                            }
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                            title="Remove section"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-5">
                        {/* Type */}

                        <div>
                          <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                            Section Type
                          </label>

                          <select
                            value={
                              section.type
                            }
                            onChange={(
                              event
                            ) =>
                              updateContentSection(
                                index,
                                "type",
                                event.target
                                  .value as ContentSectionType
                              )
                            }
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                          >
                            <option value="paragraph">
                              Paragraph
                            </option>

                            <option value="heading">
                              Heading
                            </option>

                            <option value="list">
                              List
                            </option>
                          </select>
                        </div>

                        {/* Heading type */}

                        {section.type ===
                          "heading" && (
                          <div>
                            <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                              Heading
                            </label>

                            <input
                              type="text"
                              value={
                                section.title
                              }
                              onChange={(
                                event
                              ) =>
                                updateContentSection(
                                  index,
                                  "title",
                                  event.target
                                    .value
                                )
                              }
                              placeholder="From Mobile Opportunity to Business Advantage"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                            />
                          </div>
                        )}

                        {/* Paragraph */}

                        {section.type ===
                          "paragraph" && (
                          <>
                            <div>
                              <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                                Optional
                                Heading
                              </label>

                              <input
                                type="text"
                                value={
                                  section.title
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateContentSection(
                                    index,
                                    "title",
                                    event.target
                                      .value
                                  )
                                }
                                placeholder="Optional section heading"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                                Paragraph
                              </label>

                              <textarea
                                value={
                                  section.content
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateContentSection(
                                    index,
                                    "content",
                                    event.target
                                      .value
                                  )
                                }
                                rows={5}
                                placeholder="Write paragraph content..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06] resize-y"
                              />
                            </div>
                          </>
                        )}

                        {/* List */}

                        {section.type ===
                          "list" && (
                          <>
                            <div>
                              <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                                List Heading
                              </label>

                              <input
                                type="text"
                                value={
                                  section.title
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateContentSection(
                                    index,
                                    "title",
                                    event.target
                                      .value
                                  )
                                }
                                placeholder="Training"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                                List Items
                              </label>

                              <textarea
                                value={
                                  section.content
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateContentSection(
                                    index,
                                    "content",
                                    event.target
                                      .value
                                  )
                                }
                                rows={7}
                                placeholder={`Enter one item per line:

Customer Service Training
Trainer Training
Skills Development Programmes`}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06] resize-y"
                              />

                              <p className="mt-2 text-xs text-slate-500">
                                Enter one list
                                item per line.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="rounded-[18px] border border-dashed border-violet-200 bg-violet-50/30 dark:border-white/[0.1] dark:bg-white/[0.02] px-6 py-12 text-center">
                <p className="text-sm text-slate-500">
                  No content sections
                  added.
                </p>

                <button
                  type="button"
                  onClick={
                    addContentSection
                  }
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition hover:text-violet-700 dark:text-violet-300"
                >
                  <Plus className="h-4 w-4" />

                  Add Content Section
                </button>
              </div>
            )}
          </section>

          {/* =================================================
              OLD CONTENT BACKUP
          ================================================== */}

          <section className="rounded-[24px] border border-amber-200 bg-amber-50/50 p-6 sm:p-7 dark:border-amber-500/20 dark:bg-amber-500/[0.06]">
            <div className="mb-5">
              <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                Legacy Content
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Temporary old content
                field. We can remove this
                after all existing pages
                are migrated successfully.
              </p>
            </div>

            <textarea
              value={form.content}
              onChange={(event) =>
                updateField(
                  "content",
                  event.target.value
                )
              }
              rows={6}
              placeholder="Optional old content..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06] resize-y"
            />
          </section>

          {/* =================================================
              BENEFITS
          ================================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex-1">
                <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Benefits
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Optional benefits list
                  for this solution.
                </p>
              </div>

              <button
                type="button"
                onClick={addBenefit}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300"
              >
                <Plus className="h-4 w-4" />

                Add Benefit
              </button>
            </div>

            {/* Benefits title */}

            <div className="mb-6">
              <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                Benefits Section Title
              </label>

              <input
                type="text"
                value={
                  form.benefitsTitle
                }
                onChange={(event) =>
                  updateField(
                    "benefitsTitle",
                    event.target.value
                  )
                }
                placeholder="Your Benefits"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
              />
            </div>

            {form.benefits.length >
            0 ? (
              <div className="space-y-4">
                {form.benefits.map(
                  (
                    benefit,
                    index
                  ) => (
                    <div
                      key={index}
                      className="rounded-[18px] border border-slate-200/80 bg-slate-50/60 p-4 sm:p-5 dark:border-white/[0.07] dark:bg-white/[0.02]"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          Benefit{" "}
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removeBenefit(
                              index
                            )
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                            Title
                          </label>

                          <input
                            type="text"
                            value={
                              benefit.title
                            }
                            onChange={(
                              event
                            ) =>
                              updateBenefit(
                                index,
                                "title",
                                event.target
                                  .value
                              )
                            }
                            placeholder="Accelerated Solutions"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                            Description
                          </label>

                          <input
                            type="text"
                            value={
                              benefit.description
                            }
                            onChange={(
                              event
                            ) =>
                              updateBenefit(
                                index,
                                "description",
                                event.target
                                  .value
                              )
                            }
                            placeholder="Decrease time-to-market..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="rounded-[18px] border border-dashed border-violet-200 bg-violet-50/30 dark:border-white/[0.1] dark:bg-white/[0.02] px-6 py-10 text-center">
                <p className="text-sm text-slate-500">
                  No benefits added.
                </p>

                <button
                  type="button"
                  onClick={
                    addBenefit
                  }
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition hover:text-violet-700 dark:text-violet-300"
                >
                  <Plus className="h-4 w-4" />

                  Add Benefit
                </button>
              </div>
            )}
          </section>

          {/* =================================================
              HIGHLIGHT CARDS
          ================================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Highlight Cards
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Cards displayed near
                  the bottom of the
                  product solution page.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  addHighlightCard
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300"
              >
                <Plus className="h-4 w-4" />

                Add Card
              </button>
            </div>

            {form.highlightCards
              .length > 0 ? (
              <div className="space-y-4">
                {form.highlightCards.map(
                  (
                    card,
                    index
                  ) => (
                    <div
                      key={index}
                      className="rounded-[18px] border border-slate-200/80 bg-slate-50/60 p-4 sm:p-5 dark:border-white/[0.07] dark:bg-white/[0.02]"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}{" "}
                          Highlight Card
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removeHighlightCard(
                              index
                            )
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                            Title
                          </label>

                          <input
                            type="text"
                            value={
                              card.title
                            }
                            onChange={(
                              event
                            ) =>
                              updateHighlightCard(
                                index,
                                "title",
                                event.target
                                  .value
                              )
                            }
                            placeholder="Faster Solutions"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                            Description
                          </label>

                          <input
                            type="text"
                            value={
                              card.description
                            }
                            onChange={(
                              event
                            ) =>
                              updateHighlightCard(
                                index,
                                "description",
                                event.target
                                  .value
                              )
                            }
                            placeholder="Short description..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="rounded-[18px] border border-dashed border-violet-200 bg-violet-50/30 dark:border-white/[0.1] dark:bg-white/[0.02] px-6 py-10 text-center">
                <p className="text-sm text-slate-500">
                  No highlight cards
                  added.
                </p>

                <button
                  type="button"
                  onClick={
                    addHighlightCard
                  }
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition hover:text-violet-700 dark:text-violet-300"
                >
                  <Plus className="h-4 w-4" />

                  Add Highlight Card
                </button>
              </div>
            )}
          </section>

          {/* =================================================
              MEDIA
          ================================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="mb-6">
              <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                Media
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Images used on the home
                card and detail page.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Banner */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Banner Image URL
                </label>

                <input
                  type="text"
                  value={
                    form.bannerImage
                  }
                  onChange={(event) =>
                    updateField(
                      "bannerImage",
                      event.target.value
                    )
                  }
                  placeholder="/mobile-solution.png"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Sidebar */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Sidebar Image URL
                </label>

                <input
                  type="text"
                  value={
                    form.sidebarImage
                  }
                  onChange={(event) =>
                    updateField(
                      "sidebarImage",
                      event.target.value
                    )
                  }
                  placeholder="/mobile-Solution-Service.png"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Logo */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Logo / Home Card Image
                  URL
                </label>

                <input
                  type="text"
                  value={
                    form.logoImage
                  }
                  onChange={(event) =>
                    updateField(
                      "logoImage",
                      event.target.value
                    )
                  }
                  placeholder="/mobile-logo.png"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              SEO
          ================================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="mb-6">
              <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                SEO
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Search engine and social
                sharing information.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Meta title */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Meta Title
                </label>

                <input
                  type="text"
                  value={
                    form.metaTitle
                  }
                  onChange={(event) =>
                    updateField(
                      "metaTitle",
                      event.target.value
                    )
                  }
                  placeholder="ERP Solutions | Geecon Technology"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Keywords */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Keywords
                </label>

                <input
                  type="text"
                  value={
                    form.keywords
                  }
                  onChange={(event) =>
                    updateField(
                      "keywords",
                      event.target.value
                    )
                  }
                  placeholder="ERP solutions, enterprise software, business management"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Description */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Meta Description
                </label>

                <textarea
                  value={
                    form.metaDescription
                  }
                  onChange={(event) =>
                    updateField(
                      "metaDescription",
                      event.target.value
                    )
                  }
                  rows={3}
                  placeholder="Short SEO description..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06] resize-y"
                />
              </div>

              {/* Canonical */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Canonical URL
                </label>

                <input
                  type="text"
                  value={
                    form.canonicalUrl
                  }
                  onChange={(event) =>
                    updateField(
                      "canonicalUrl",
                      event.target.value
                    )
                  }
                  placeholder="/erp-solutions"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* OG image */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Open Graph Image
                </label>

                <input
                  type="text"
                  value={
                    form.openGraphImage
                  }
                  onChange={(event) =>
                    updateField(
                      "openGraphImage",
                      event.target.value
                    )
                  }
                  placeholder="/erp-solutions.png"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="sticky bottom-4 z-20 flex flex-col-reverse gap-3 rounded-[22px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_30px_70px_-35px_rgba(15,23,42,.45)] backdrop-blur-lg sm:flex-row sm:justify-end dark:border-white/[0.07] dark:bg-[#0b1220]/90">
            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/product-solution"
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                !canSubmit
              }
              className="brand-grad inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <Save className="h-4 w-4" />

              {saving
                ? "Saving..."
                : "Save Product Solution"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}