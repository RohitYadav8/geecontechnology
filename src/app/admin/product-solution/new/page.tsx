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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =================================================
            HEADER
        ================================================== */}

        <div className="mb-8">
          <button
            type="button"
            onClick={() =>
              router.push(
                "/admin/product-solution"
              )
            }
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Product Solutions
          </button>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Add Product Solution
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
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
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
              {success}
            </div>
          )}

          {/* =================================================
              BASIC INFORMATION
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
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
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Slug */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Project Tag */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Card Back Title */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Excerpt */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Order */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Active */}

              <div className="flex items-end">
                <label className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
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
                    className="h-5 w-5 rounded border-slate-300"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* =================================================
              DYNAMIC CONTENT SECTIONS
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
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
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-950/40"
                    >
                      {/* Section header */}

                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-500 dark:bg-slate-800">
                            <GripVertical className="h-4 w-4" />
                          </span>

                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
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
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
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
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
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
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                            title="Remove section"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-5">
                        {/* Type */}

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                          </div>
                        )}

                        {/* Paragraph */}

                        {section.type ===
                          "paragraph" && (
                          <>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                                className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              />
                            </div>
                          </>
                        )}

                        {/* List */}

                        {section.type ===
                          "list" && (
                          <>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                                className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
              <div className="rounded-xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
                <p className="text-sm text-slate-500">
                  No content sections
                  added.
                </p>

                <button
                  type="button"
                  onClick={
                    addContentSection
                  }
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white"
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

          <section className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 dark:border-amber-900/40 dark:bg-amber-950/10">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
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
              className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </section>

          {/* =================================================
              BENEFITS
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />

                Add Benefit
              </button>
            </div>

            {/* Benefits title */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                      className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
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
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center dark:border-slate-700">
                <p className="text-sm text-slate-500">
                  No benefits added.
                </p>

                <button
                  type="button"
                  onClick={
                    addBenefit
                  }
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white"
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

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
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
                      className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
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
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center dark:border-slate-700">
                <p className="text-sm text-slate-500">
                  No highlight cards
                  added.
                </p>

                <button
                  type="button"
                  onClick={
                    addHighlightCard
                  }
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white"
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

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
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
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Sidebar */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Logo */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              SEO
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
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
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Keywords */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Description */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Canonical */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* OG image */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="sticky bottom-4 z-20 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur-lg sm:flex-row sm:justify-end dark:border-slate-800 dark:bg-slate-900/90">
            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/product-solution"
                )
              }
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                !canSubmit
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
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