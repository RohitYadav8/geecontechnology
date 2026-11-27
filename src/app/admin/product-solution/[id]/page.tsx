"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Loader2,
} from "lucide-react";
import Link from "next/link";

// ============================================================
// TYPES
// ============================================================

type ContentSection = {
  heading: string;
  body: string;
};

type Benefit = {
  title: string;
  description: string;
};

type HighlightCard = {
  title: string;
  description: string;
};

type ProductSolutionForm = {
  name: string;
  slug: string;
  projectTag: string;
  cardBackTitle: string;
  excerpt: string;
  content: string;

  contentSections: ContentSection[];

  benefitsTitle: string;
  benefits: Benefit[];

  highlightCards: HighlightCard[];

  order: number;
  isActive: boolean;

  logoImage: string;
  bannerImage: string;
  sidebarImage: string;

  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  openGraphImage: string;
};

// ============================================================
// EMPTY FORM
// ============================================================

const emptyForm: ProductSolutionForm = {
  name: "",
  slug: "",
  projectTag: "",
  cardBackTitle: "",
  excerpt: "",
  content: "",

  contentSections: [],

  benefitsTitle: "",
  benefits: [],

  highlightCards: [],

  order: 0,
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

// ============================================================
// HELPERS
// ============================================================

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function arrayValue<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

// ============================================================
// PAGE
// ============================================================

export default function EditProductSolutionPage() {
  const router = useRouter();
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";

  const [form, setForm] =
    useState<ProductSolutionForm>(emptyForm);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==========================================================
  // LOAD EXISTING PRODUCT SOLUTION
  // ==========================================================

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadProductSolution = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/admin/product-solutions/${id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Failed to load product solution."
          );
        }

        setForm({
          name: stringValue(data.name),
          slug: stringValue(data.slug),

          projectTag:
            stringValue(data.projectTag),

          cardBackTitle:
            stringValue(data.cardBackTitle),

          excerpt:
            stringValue(data.excerpt),

          content:
            stringValue(data.content),

          contentSections:
            arrayValue<ContentSection>(
              data.contentSections
            ),

          benefitsTitle:
            stringValue(data.benefitsTitle),

          benefits:
            arrayValue<Benefit>(
              data.benefits
            ),

          highlightCards:
            arrayValue<HighlightCard>(
              data.highlightCards
            ),

          order:
            typeof data.order === "number"
              ? data.order
              : 0,

          isActive:
            typeof data.isActive === "boolean"
              ? data.isActive
              : true,

          logoImage:
            stringValue(data.logoImage),

          bannerImage:
            stringValue(data.bannerImage),

          sidebarImage:
            stringValue(data.sidebarImage),

          metaTitle:
            stringValue(data.metaTitle),

          metaDescription:
            stringValue(data.metaDescription),

          keywords:
            stringValue(data.keywords),

          canonicalUrl:
            stringValue(data.canonicalUrl),

          openGraphImage:
            stringValue(data.openGraphImage),
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProductSolution();
  }, [id]);

  // ==========================================================
  // BASIC FIELD CHANGE
  // ==========================================================

  const updateField = <
    K extends keyof ProductSolutionForm,
  >(
    field: K,
    value: ProductSolutionForm[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ==========================================================
  // CONTENT SECTIONS
  // ==========================================================

  const addContentSection = () => {
    setForm((previous) => ({
      ...previous,
      contentSections: [
        ...previous.contentSections,
        {
          heading: "",
          body: "",
        },
      ],
    }));
  };

  const updateContentSection = (
    index: number,
    field: keyof ContentSection,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,

      contentSections:
        previous.contentSections.map(
          (section, sectionIndex) =>
            sectionIndex === index
              ? {
                  ...section,
                  [field]: value,
                }
              : section
        ),
    }));
  };

  const removeContentSection = (
    index: number
  ) => {
    setForm((previous) => ({
      ...previous,

      contentSections:
        previous.contentSections.filter(
          (_, sectionIndex) =>
            sectionIndex !== index
        ),
    }));
  };

  // ==========================================================
  // BENEFITS
  // ==========================================================

  const addBenefit = () => {
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
  };

  const updateBenefit = (
    index: number,
    field: keyof Benefit,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,

      benefits: previous.benefits.map(
        (benefit, benefitIndex) =>
          benefitIndex === index
            ? {
                ...benefit,
                [field]: value,
              }
            : benefit
      ),
    }));
  };

  const removeBenefit = (
    index: number
  ) => {
    setForm((previous) => ({
      ...previous,

      benefits:
        previous.benefits.filter(
          (_, benefitIndex) =>
            benefitIndex !== index
        ),
    }));
  };

  // ==========================================================
  // HIGHLIGHT CARDS
  // ==========================================================

  const addHighlightCard = () => {
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
  };

  const updateHighlightCard = (
    index: number,
    field: keyof HighlightCard,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,

      highlightCards:
        previous.highlightCards.map(
          (card, cardIndex) =>
            cardIndex === index
              ? {
                  ...card,
                  [field]: value,
                }
              : card
        ),
    }));
  };

  const removeHighlightCard = (
    index: number
  ) => {
    setForm((previous) => ({
      ...previous,

      highlightCards:
        previous.highlightCards.filter(
          (_, cardIndex) =>
            cardIndex !== index
        ),
    }));
  };

  // ==========================================================
  // SAVE
  // ==========================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!id) {
      setError(
        "Product solution ID is missing."
      );
      return;
    }

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
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/product-solutions/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to update product solution."
        );
      }

      setSuccess(
        "Product solution updated successfully."
      );

      router.refresh();

      setTimeout(() => {
        router.push(
          "/admin/product-solution"
        );
      }, 700);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <Loader2
            size={20}
            className="animate-spin text-violet-500"
          />

          Loading product solution...
        </div>
      </div>
    );
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="w-full min-w-0">
      {/* HEADER */}

      <div className="brand-grad relative mb-8 overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="relative">
          <Link
            href="/admin/product-solution"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-xl transition hover:bg-white/25"
          >
            <ArrowLeft size={16} />

            Back to Product Solutions
          </Link>

          <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
            Edit Product Solution
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-50/90">
            Add or update content for this
            product solution.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* ERROR */}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {success}
          </div>
        )}

        {/* ================================================= */}
        {/* BASIC INFORMATION */}
        {/* ================================================= */}

        <Section
          title="Basic Information"
          description="Main product solution information."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Name"
              required
              value={form.name}
              onChange={(value) =>
                updateField("name", value)
              }
            />

            <Input
              label="Slug"
              required
              value={form.slug}
              onChange={(value) =>
                updateField("slug", value)
              }
            />

            <Input
              label="Project Tag"
              value={form.projectTag}
              onChange={(value) =>
                updateField(
                  "projectTag",
                  value
                )
              }
            />

            <Input
              label="Card Back Title"
              value={form.cardBackTitle}
              onChange={(value) =>
                updateField(
                  "cardBackTitle",
                  value
                )
              }
            />
          </div>

          <Textarea
            label="Excerpt"
            value={form.excerpt}
            rows={4}
            onChange={(value) =>
              updateField("excerpt", value)
            }
          />

          <Textarea
            label="Old / Main Content"
            value={form.content}
            rows={7}
            onChange={(value) =>
              updateField("content", value)
            }
          />
        </Section>

        {/* ================================================= */}
        {/* CONTENT SECTIONS */}
        {/* ================================================= */}

        <Section
          title="Content Sections"
          description="Add multiple sections to the product solution detail page."
          action={
            <AddButton
              label="Add Section"
              onClick={addContentSection}
            />
          }
        >
          {form.contentSections.length ===
          0 ? (
            <EmptyMessage text="No content sections added yet." />
          ) : (
            <div className="space-y-5">
              {form.contentSections.map(
                (section, index) => (
                  <RepeaterCard
                    key={index}
                    title={`Section ${index + 1}`}
                    onRemove={() =>
                      removeContentSection(
                        index
                      )
                    }
                  >
                    <Input
                      label="Heading"
                      value={
                        section.heading || ""
                      }
                      onChange={(value) =>
                        updateContentSection(
                          index,
                          "heading",
                          value
                        )
                      }
                    />

                    <Textarea
                      label="Content"
                      value={
                        section.body || ""
                      }
                      rows={6}
                      onChange={(value) =>
                        updateContentSection(
                          index,
                          "body",
                          value
                        )
                      }
                    />
                  </RepeaterCard>
                )
              )}
            </div>
          )}
        </Section>

        {/* ================================================= */}
        {/* BENEFITS */}
        {/* ================================================= */}

        <Section
          title="Benefits"
          description="Manage the benefits shown on the detail page."
          action={
            <AddButton
              label="Add Benefit"
              onClick={addBenefit}
            />
          }
        >
          <Input
            label="Benefits Section Title"
            value={form.benefitsTitle}
            onChange={(value) =>
              updateField(
                "benefitsTitle",
                value
              )
            }
          />

          {form.benefits.length === 0 ? (
            <EmptyMessage text="No benefits added yet." />
          ) : (
            <div className="space-y-5">
              {form.benefits.map(
                (benefit, index) => (
                  <RepeaterCard
                    key={index}
                    title={`Benefit ${index + 1}`}
                    onRemove={() =>
                      removeBenefit(index)
                    }
                  >
                    <Input
                      label="Title"
                      value={
                        benefit.title || ""
                      }
                      onChange={(value) =>
                        updateBenefit(
                          index,
                          "title",
                          value
                        )
                      }
                    />

                    <Textarea
                      label="Description"
                      value={
                        benefit.description ||
                        ""
                      }
                      rows={4}
                      onChange={(value) =>
                        updateBenefit(
                          index,
                          "description",
                          value
                        )
                      }
                    />
                  </RepeaterCard>
                )
              )}
            </div>
          )}
        </Section>

        {/* ================================================= */}
        {/* HIGHLIGHT CARDS */}
        {/* ================================================= */}

        <Section
          title="Highlight Cards"
          description="Add important feature or highlight cards."
          action={
            <AddButton
              label="Add Card"
              onClick={addHighlightCard}
            />
          }
        >
          {form.highlightCards.length ===
          0 ? (
            <EmptyMessage text="No highlight cards added yet." />
          ) : (
            <div className="space-y-5">
              {form.highlightCards.map(
                (card, index) => (
                  <RepeaterCard
                    key={index}
                    title={`Highlight ${index + 1}`}
                    onRemove={() =>
                      removeHighlightCard(
                        index
                      )
                    }
                  >
                    <Input
                      label="Title"
                      value={
                        card.title || ""
                      }
                      onChange={(value) =>
                        updateHighlightCard(
                          index,
                          "title",
                          value
                        )
                      }
                    />

                    <Textarea
                      label="Description"
                      value={
                        card.description ||
                        ""
                      }
                      rows={4}
                      onChange={(value) =>
                        updateHighlightCard(
                          index,
                          "description",
                          value
                        )
                      }
                    />
                  </RepeaterCard>
                )
              )}
            </div>
          )}
        </Section>

        {/* ================================================= */}
        {/* MEDIA */}
        {/* ================================================= */}

        <Section
          title="Media"
          description="Update images used throughout the product solution."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Logo Image"
              placeholder="/images/product-logo.png"
              value={form.logoImage}
              onChange={(value) =>
                updateField(
                  "logoImage",
                  value
                )
              }
            />

            <Input
              label="Banner Image"
              placeholder="/images/product-banner.png"
              value={form.bannerImage}
              onChange={(value) =>
                updateField(
                  "bannerImage",
                  value
                )
              }
            />

            <Input
              label="Sidebar Image"
              placeholder="/images/product-sidebar.png"
              value={form.sidebarImage}
              onChange={(value) =>
                updateField(
                  "sidebarImage",
                  value
                )
              }
            />
          </div>
        </Section>

        {/* ================================================= */}
        {/* DISPLAY */}
        {/* ================================================= */}

        <Section
          title="Display Settings"
          description="Control visibility and display order."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                Display Order
              </label>

              <input
                type="number"
                value={form.order}
                onChange={(event) =>
                  updateField(
                    "order",
                    Number(
                      event.target.value
                    )
                  )
                }
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                Status
              </label>

              <label className="flex min-h-[46px] cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 transition hover:border-violet-300 dark:border-white/[0.08] dark:bg-white/[0.04]">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    updateField(
                      "isActive",
                      event.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-slate-300 accent-violet-600"
                />

                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Active Product Solution
                </span>
              </label>
            </div>
          </div>
        </Section>

        {/* ================================================= */}
        {/* SEO */}
        {/* ================================================= */}

        <Section
          title="SEO"
          description="Search engine and social sharing information."
        >
          <Input
            label="Meta Title"
            value={form.metaTitle}
            onChange={(value) =>
              updateField(
                "metaTitle",
                value
              )
            }
          />

          <Textarea
            label="Meta Description"
            value={form.metaDescription}
            rows={4}
            onChange={(value) =>
              updateField(
                "metaDescription",
                value
              )
            }
          />

          <Input
            label="Keywords"
            placeholder="crm, software, business"
            value={form.keywords}
            onChange={(value) =>
              updateField(
                "keywords",
                value
              )
            }
          />

          <Input
            label="Canonical URL"
            value={form.canonicalUrl}
            onChange={(value) =>
              updateField(
                "canonicalUrl",
                value
              )
            }
          />

          <Input
            label="Open Graph Image"
            value={form.openGraphImage}
            onChange={(value) =>
              updateField(
                "openGraphImage",
                value
              )
            }
          />
        </Section>

        {/* ================================================= */}
        {/* SAVE */}
        {/* ================================================= */}

        <div className="sticky bottom-4 z-10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="brand-grad inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================
// REUSABLE UI
// ============================================================

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]";

function Section({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>

        {action}
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type="text"
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={inputClasses}
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`${inputClasses} resize-y`}
      />
    </div>
  );
}

function AddButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300"
    >
      <Plus size={14} />
      {label}
    </button>
  );
}

function RepeaterCard({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200/80 bg-slate-50/60 p-4 transition hover:border-violet-200 sm:p-5 dark:border-white/[0.07] dark:bg-white/[0.02]">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </h3>

        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
        >
          <Trash2 size={14} />
          Remove
        </button>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function EmptyMessage({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-[18px] border border-dashed border-violet-200 bg-violet-50/30 dark:border-white/[0.1] dark:bg-white/[0.02] px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
      {text}
    </div>
  );
}