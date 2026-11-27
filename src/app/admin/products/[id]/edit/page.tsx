"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  FileJson2,
  ImageIcon,
  Layers3,
  Loader2,
  MonitorUp,
  Palette,
  Save,
  Settings2,
  Sparkles,
  Tag,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ProductForm = {
  title: string;
  slug: string;

  bannerImage: string;
  logoImage: string;

  shortDescription: string;
  description: string;

  cardTagline: string;
  cardSecondaryText: string;

  flipEyebrow: string;
  flipTitle: string;
  flipDescription: string;

  features: string;
  benefits: string;
  sections: string;
  faqs: string;

  brochureUrl: string;

  brochureGradientFrom: string;
  brochureGradientVia: string;
  brochureGradientTo: string;

  isActive: boolean;
  order: number;
};

/* =========================================================
   INITIAL FORM
========================================================= */

const initialForm: ProductForm = {
  title: "",
  slug: "",

  bannerImage: "",
  logoImage: "",

  shortDescription: "",
  description: "",

  cardTagline: "",
  cardSecondaryText: "",

  flipEyebrow: "",
  flipTitle: "",
  flipDescription: "",

  features: "",
  benefits: "",
  sections: "",
  faqs: "",

  brochureUrl: "",

  brochureGradientFrom: "#1a2b4a",
  brochureGradientVia: "#254b7a",
  brochureGradientTo: "#2563a8",

  isActive: true,
  order: 0,
};

/* =========================================================
   HELPERS
========================================================= */

function jsonToText(value: unknown): string {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(
      value,
      null,
      2
    );
  } catch {
    return "";
  }
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon: React.ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
        {icon}
      </div>

      <div className="min-w-0">
        {eyebrow && (
          <p className="brand-text text-[11px] font-extrabold uppercase tracking-[0.2em]">
            {eyebrow}
          </p>
        )}

        <h2
          className={`text-lg font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white ${
            eyebrow ? "mt-1" : ""
          }`}
        >
          {title}
        </h2>

        {description && (
          <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   LABEL
========================================================= */

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
      {children}

      {required && (
        <span className="ml-1 text-red-500">
          *
        </span>
      )}
    </label>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [form, setForm] =
    useState<ProductForm>(
      initialForm
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =========================================================
     FETCH PRODUCT
  ========================================================= */

  useEffect(() => {
    if (!id) return;

    const fetchProduct =
      async () => {
        try {
          setLoading(true);
          setError("");

          const response =
            await fetch(
              `/api/admin/products/${encodeURIComponent(
                id
              )}`,
              {
                cache: "no-store",
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data?.error ||
                "Failed to fetch product"
            );
          }

          setForm({
            title:
              data.title || "",

            slug:
              data.slug || "",

            bannerImage:
              data.bannerImage || "",

            logoImage:
              data.logoImage || "",

            shortDescription:
              data.shortDescription ||
              "",

            description:
              data.description || "",

            cardTagline:
              data.cardTagline || "",

            cardSecondaryText:
              data.cardSecondaryText ||
              "",

            flipEyebrow:
              data.flipEyebrow || "",

            flipTitle:
              data.flipTitle || "",

            flipDescription:
              data.flipDescription ||
              "",

            features:
              jsonToText(
                data.features
              ),

            benefits:
              jsonToText(
                data.benefits
              ),

            sections:
              jsonToText(
                data.sections
              ),

            faqs:
              jsonToText(
                data.faqs
              ),

            brochureUrl:
              data.brochureUrl || "",

            brochureGradientFrom:
              data.brochureGradientFrom ||
              "#1a2b4a",

            brochureGradientVia:
              data.brochureGradientVia ||
              "#254b7a",

            brochureGradientTo:
              data.brochureGradientTo ||
              "#2563a8",

            isActive:
              data.isActive ?? true,

            order:
              data.order ?? 0,
          });
        } catch (err) {
          console.error(
            "Fetch product error:",
            err
          );

          setError(
            err instanceof Error
              ? err.message
              : "Failed to load product"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProduct();
  }, [id]);

  /* =========================================================
     CHANGE
  ========================================================= */

  function handleChange(
    field: keyof ProductForm,
    value:
      | string
      | boolean
      | number
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  /* =========================================================
     JSON
  ========================================================= */

  function parseJsonField(
    value: string,
    fieldName: string
  ) {
    if (!value.trim()) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch {
      throw new Error(
        `${fieldName} must contain valid JSON.`
      );
    }
  }

  /* =========================================================
     SUBMIT
  ========================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError(
        "Product title is required."
      );
      return;
    }

    if (!form.slug.trim()) {
      setError(
        "Product slug is required."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title:
          form.title.trim(),

        slug:
          form.slug.trim(),

        bannerImage:
          form.bannerImage.trim() ||
          null,

        logoImage:
          form.logoImage.trim() ||
          null,

        shortDescription:
          form.shortDescription.trim() ||
          null,

        description:
          form.description.trim() ||
          null,

        cardTagline:
          form.cardTagline.trim() ||
          null,

        cardSecondaryText:
          form.cardSecondaryText.trim() ||
          null,

        /*
         * Existing database fields kept.
         * Frontend can display these
         * without using card flip.
         */

        flipEyebrow:
          form.flipEyebrow.trim() ||
          null,

        flipTitle:
          form.flipTitle.trim() ||
          null,

        flipDescription:
          form.flipDescription.trim() ||
          null,

        features:
          parseJsonField(
            form.features,
            "Features"
          ),

        benefits:
          parseJsonField(
            form.benefits,
            "Benefits"
          ),

        sections:
          parseJsonField(
            form.sections,
            "Sections"
          ),

        faqs:
          parseJsonField(
            form.faqs,
            "FAQs"
          ),

        brochureUrl:
          form.brochureUrl.trim() ||
          null,

        brochureGradientFrom:
          form.brochureGradientFrom.trim() ||
          null,

        brochureGradientVia:
          form.brochureGradientVia.trim() ||
          null,

        brochureGradientTo:
          form.brochureGradientTo.trim() ||
          null,

        isActive:
          form.isActive,

        order:
          Number(form.order) || 0,
      };

      const response =
        await fetch(
          `/api/admin/products/${encodeURIComponent(
            id
          )}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to update product"
        );
      }

      setSuccess(
        "Product updated successfully."
      );

      setTimeout(() => {
        router.push(
          "/admin/products"
        );

        router.refresh();
      }, 700);
    } catch (err) {
      console.error(
        "Update product error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update product"
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     STYLES
  ========================================================= */

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500";

  const textareaClass =
    "w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500";

  const jsonTextareaClass =
    "w-full resize-y rounded-xl border border-slate-800 bg-[#0b1220] px-4 py-3 font-mono text-xs leading-6 text-slate-200 placeholder:text-slate-500 transition focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-500/15 dark:border-white/[0.08] dark:bg-[#060b16]";

  const sectionClass =
    "rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:p-7";

  /* =========================================================
     GRADIENT
  ========================================================= */

  const brochureGradient =
    useMemo(
      () =>
        `linear-gradient(135deg, ${form.brochureGradientFrom}, ${form.brochureGradientVia}, ${form.brochureGradientTo})`,
      [
        form.brochureGradientFrom,
        form.brochureGradientVia,
        form.brochureGradientTo,
      ]
    );

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="w-full min-w-0">
        <div className="mx-auto max-w-6xl">
          <div className="flex min-h-[420px] items-center justify-center rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="text-center">
              <div className="brand-grad mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>

              <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                Loading product...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="w-full min-w-0">
      <form
        onSubmit={handleSubmit}
      >
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="brand-grad relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative">
            {/* BREADCRUMB */}

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-50/75">
              <Link
                href="/admin/products"
                className="transition hover:text-white"
              >
                Products
              </Link>

              <ChevronRight
                size={13}
              />

              <span className="truncate text-white">
                {form.title ||
                  "Edit Product"}
              </span>
            </div>

            <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <Link
                  href="/admin/products"
                  aria-label="Back to products"
                  className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/[0.14] text-white backdrop-blur-xl transition hover:bg-white/25"
                >
                  <ArrowLeft
                    size={17}
                  />
                </Link>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                      Edit Product
                    </h1>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] backdrop-blur-xl ${
                        form.isActive
                          ? "border-white/30 bg-white/[0.14] text-white"
                          : "border-white/20 bg-slate-950/20 text-white/80"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          form.isActive
                            ? "bg-emerald-300"
                            : "bg-white/50"
                        }`}
                      />

                      {form.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  <p className="mt-2 max-w-xl text-sm text-indigo-50/90">
                    Manage product card,
                    detail page, media and
                    brochure appearance.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={16} />
                )}

                {saving
                  ? "Updating..."
                  : "Update Product"}
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mx-auto max-w-6xl py-6 sm:py-7">
          {/* ALERTS */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Check size={16} />

              {success}
            </div>
          )}

          <div className="space-y-6">
            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <section
              className={sectionClass}
            >
              <SectionHeader
                icon={
                  <Tag size={18} />
                }
                eyebrow="Product"
                title="Basic Information"
                description="Core product information displayed across the website."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel required>
                    Product Title
                  </FieldLabel>

                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(event) =>
                      handleChange(
                        "title",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel required>
                    Slug
                  </FieldLabel>

                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(event) =>
                      handleChange(
                        "slug",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />

                  <p className="mt-2 text-[11px] text-slate-400">
                    /products/
                    {form.slug ||
                      "product-slug"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <FieldLabel>
                    Short Description
                  </FieldLabel>

                  <textarea
                    value={
                      form.shortDescription
                    }
                    onChange={(event) =>
                      handleChange(
                        "shortDescription",
                        event.target.value
                      )
                    }
                    rows={3}
                    className={
                      textareaClass
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <FieldLabel>
                    Full Description
                  </FieldLabel>

                  <textarea
                    value={
                      form.description
                    }
                    onChange={(event) =>
                      handleChange(
                        "description",
                        event.target.value
                      )
                    }
                    rows={7}
                    className={
                      textareaClass
                    }
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                PRODUCT MEDIA
            ================================================= */}

            <section
              className={sectionClass}
            >
              <SectionHeader
                icon={
                  <ImageIcon
                    size={18}
                  />
                }
                eyebrow="Media"
                title="Product Media"
                description="Banner and logo paths can use images from the Media Library."
              />

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {/* BANNER */}

                <div className="rounded-[20px] border border-slate-200/80 bg-slate-50/60 p-4 dark:border-white/[0.07] dark:bg-white/[0.02]">
                  <FieldLabel>
                    Banner Image URL
                  </FieldLabel>

                  <input
                    type="text"
                    value={
                      form.bannerImage
                    }
                    onChange={(event) =>
                      handleChange(
                        "bannerImage",
                        event.target.value
                      )
                    }
                    placeholder="/product-banner.png"
                    className={
                      inputClass
                    }
                  />

                  <div className="mt-4 flex h-[180px] items-center justify-center overflow-hidden rounded-[16px] border border-dashed border-violet-200 bg-white dark:border-white/[0.1] dark:bg-[#060b16]">
                    {form.bannerImage ? (
                      <img
                        src={
                          form.bannerImage
                        }
                        alt="Banner preview"
                        className="h-full w-full object-contain p-3"
                      />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-6 w-6 text-violet-300 dark:text-violet-400/50" />

                        <p className="mt-2 text-xs text-slate-400">
                          No banner selected
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* LOGO */}

                <div className="rounded-[20px] border border-slate-200/80 bg-slate-50/60 p-4 dark:border-white/[0.07] dark:bg-white/[0.02]">
                  <FieldLabel>
                    Logo Image URL
                  </FieldLabel>

                  <input
                    type="text"
                    value={
                      form.logoImage
                    }
                    onChange={(event) =>
                      handleChange(
                        "logoImage",
                        event.target.value
                      )
                    }
                    placeholder="/product-logo.png"
                    className={
                      inputClass
                    }
                  />

                  <div className="mt-4 flex h-[180px] items-center justify-center overflow-hidden rounded-[16px] border border-dashed border-violet-200 bg-white dark:border-white/[0.1] dark:bg-[#060b16]">
                    {form.logoImage ? (
                      <img
                        src={
                          form.logoImage
                        }
                        alt="Logo preview"
                        className="h-28 w-28 object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-6 w-6 text-violet-300 dark:text-violet-400/50" />

                        <p className="mt-2 text-xs text-slate-400">
                          No logo selected
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                PRODUCT CARD
            ================================================= */}

            <section
              className={sectionClass}
            >
              <SectionHeader
                icon={
                  <Layers3
                    size={18}
                  />
                }
                eyebrow="Products Page"
                title="Product Card Content"
                description="Content displayed on the product card in the products listing."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel>
                    Card Tagline
                  </FieldLabel>

                  <textarea
                    value={
                      form.cardTagline
                    }
                    onChange={(event) =>
                      handleChange(
                        "cardTagline",
                        event.target.value
                      )
                    }
                    rows={3}
                    className={
                      textareaClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel>
                    Card Secondary Text
                  </FieldLabel>

                  <textarea
                    value={
                      form.cardSecondaryText
                    }
                    onChange={(event) =>
                      handleChange(
                        "cardSecondaryText",
                        event.target.value
                      )
                    }
                    rows={3}
                    className={
                      textareaClass
                    }
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                ADDITIONAL CARD CONTENT
            ================================================= */}

            <section
              className={sectionClass}
            >
              <SectionHeader
                icon={
                  <Sparkles
                    size={18}
                  />
                }
                eyebrow="Products Page"
                title="Additional Card Content"
                description="Additional content shown on the product card."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel>
                    Eyebrow
                  </FieldLabel>

                  <input
                    type="text"
                    value={
                      form.flipEyebrow
                    }
                    onChange={(event) =>
                      handleChange(
                        "flipEyebrow",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel>
                    Additional Title
                  </FieldLabel>

                  <input
                    type="text"
                    value={
                      form.flipTitle
                    }
                    onChange={(event) =>
                      handleChange(
                        "flipTitle",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <FieldLabel>
                    Additional Description
                  </FieldLabel>

                  <textarea
                    value={
                      form.flipDescription
                    }
                    onChange={(event) =>
                      handleChange(
                        "flipDescription",
                        event.target.value
                      )
                    }
                    rows={4}
                    className={
                      textareaClass
                    }
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                DETAIL PAGE
            ================================================= */}

            <section
              className={sectionClass}
            >
              <SectionHeader
                icon={
                  <FileJson2
                    size={18}
                  />
                }
                eyebrow="Product Detail"
                title="Detail Page Content"
                description="Structured content displayed after opening a product."
              />

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div>
                  <FieldLabel>
                    Features
                  </FieldLabel>

                  <textarea
                    value={
                      form.features
                    }
                    onChange={(event) =>
                      handleChange(
                        "features",
                        event.target.value
                      )
                    }
                    rows={10}
                    spellCheck={false}
                    className={
                      jsonTextareaClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel>
                    Benefits
                  </FieldLabel>

                  <textarea
                    value={
                      form.benefits
                    }
                    onChange={(event) =>
                      handleChange(
                        "benefits",
                        event.target.value
                      )
                    }
                    rows={10}
                    spellCheck={false}
                    className={
                      jsonTextareaClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel>
                    Sections
                  </FieldLabel>

                  <textarea
                    value={
                      form.sections
                    }
                    onChange={(event) =>
                      handleChange(
                        "sections",
                        event.target.value
                      )
                    }
                    rows={13}
                    spellCheck={false}
                    className={
                      jsonTextareaClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel>
                    FAQs
                  </FieldLabel>

                  <textarea
                    value={
                      form.faqs
                    }
                    onChange={(event) =>
                      handleChange(
                        "faqs",
                        event.target.value
                      )
                    }
                    rows={13}
                    spellCheck={false}
                    className={
                      jsonTextareaClass
                    }
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                BROCHURE APPEARANCE
            ================================================= */}

            <section className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
              <div className="p-5 sm:p-7">
                <SectionHeader
                  icon={
                    <Palette
                      size={18}
                    />
                  }
                  eyebrow="Brochure"
                  title="Brochure Appearance"
                  description="Control the dynamic gradient used on this product's brochure request card."
                />

                <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                  {/* COLORS */}

                  <div className="space-y-4">
                    {/* START */}

                    <div>
                      <FieldLabel>
                        Start Color
                      </FieldLabel>

                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={
                            form.brochureGradientFrom
                          }
                          onChange={(
                            event
                          ) =>
                            handleChange(
                              "brochureGradientFrom",
                              event.target
                                .value
                            )
                          }
                          className="h-[46px] w-12 shrink-0 cursor-pointer rounded-xl border border-slate-200 bg-white p-1 dark:border-white/[0.08] dark:bg-white/[0.04]"
                        />

                        <input
                          type="text"
                          value={
                            form.brochureGradientFrom
                          }
                          onChange={(
                            event
                          ) =>
                            handleChange(
                              "brochureGradientFrom",
                              event.target
                                .value
                            )
                          }
                          className={
                            inputClass
                          }
                        />
                      </div>
                    </div>

                    {/* MIDDLE */}

                    <div>
                      <FieldLabel>
                        Middle Color
                      </FieldLabel>

                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={
                            form.brochureGradientVia
                          }
                          onChange={(
                            event
                          ) =>
                            handleChange(
                              "brochureGradientVia",
                              event.target
                                .value
                            )
                          }
                          className="h-[46px] w-12 shrink-0 cursor-pointer rounded-xl border border-slate-200 bg-white p-1 dark:border-white/[0.08] dark:bg-white/[0.04]"
                        />

                        <input
                          type="text"
                          value={
                            form.brochureGradientVia
                          }
                          onChange={(
                            event
                          ) =>
                            handleChange(
                              "brochureGradientVia",
                              event.target
                                .value
                            )
                          }
                          className={
                            inputClass
                          }
                        />
                      </div>
                    </div>

                    {/* END */}

                    <div>
                      <FieldLabel>
                        End Color
                      </FieldLabel>

                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={
                            form.brochureGradientTo
                          }
                          onChange={(
                            event
                          ) =>
                            handleChange(
                              "brochureGradientTo",
                              event.target
                                .value
                            )
                          }
                          className="h-[46px] w-12 shrink-0 cursor-pointer rounded-xl border border-slate-200 bg-white p-1 dark:border-white/[0.08] dark:bg-white/[0.04]"
                        />

                        <input
                          type="text"
                          value={
                            form.brochureGradientTo
                          }
                          onChange={(
                            event
                          ) =>
                            handleChange(
                              "brochureGradientTo",
                              event.target
                                .value
                            )
                          }
                          className={
                            inputClass
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* PREVIEW */}

                  <div>
                    <p className="brand-text mb-2 text-[11px] font-extrabold uppercase tracking-[0.2em]">
                      Live Preview
                    </p>

                    <div
                      className="relative min-h-[245px] overflow-hidden rounded-[22px] p-6 text-white shadow-[0_30px_70px_-35px_rgba(91,33,182,.45)]"
                      style={{
                        background:
                          brochureGradient,
                      }}
                    >
                      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

                      <div className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

                      <div className="relative z-10">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
                          Brochure
                        </span>

                        <h3 className="mt-5 line-clamp-2 text-xl font-bold tracking-tight">
                          {form.title ||
                            "Product Brochure"}
                        </h3>

                        {form.shortDescription && (
                          <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/70">
                            {
                              form.shortDescription
                            }
                          </p>
                        )}

                        <div className="mt-5 inline-flex rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-slate-900 shadow-lg">
                          Request Brochure
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                SETTINGS
            ================================================= */}

            <section
              className={sectionClass}
            >
              <SectionHeader
                icon={
                  <Settings2
                    size={18}
                  />
                }
                eyebrow="Configuration"
                title="Product Settings"
                description="Manage brochure URL, display order and product visibility."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <FieldLabel>
                    Brochure URL
                  </FieldLabel>

                  <input
                    type="text"
                    value={
                      form.brochureUrl
                    }
                    onChange={(event) =>
                      handleChange(
                        "brochureUrl",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel>
                    Display Order
                  </FieldLabel>

                  <input
                    type="number"
                    min={0}
                    value={form.order}
                    onChange={(event) =>
                      handleChange(
                        "order",
                        Number(
                          event.target
                            .value
                        )
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                {/* STATUS */}

                <div>
                  <FieldLabel>
                    Product Status
                  </FieldLabel>

                  <button
                    type="button"
                    onClick={() =>
                      handleChange(
                        "isActive",
                        !form.isActive
                      )
                    }
                    className={`flex min-h-[46px] w-full items-center justify-between rounded-xl border px-4 transition ${
                      form.isActive
                        ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                        : "border-slate-200 bg-slate-50/70 dark:border-white/[0.08] dark:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          form.isActive
                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                            : "bg-slate-200 text-slate-500 dark:bg-white/[0.08] dark:text-slate-400"
                        }`}
                      >
                        <MonitorUp
                          size={15}
                        />
                      </div>

                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {form.isActive
                            ? "Active"
                            : "Inactive"}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {form.isActive
                            ? "Visible on website"
                            : "Hidden from website"}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`relative h-6 w-11 rounded-full transition ${
                        form.isActive
                          ? "bg-emerald-500"
                          : "bg-slate-300 dark:bg-white/[0.12]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                          form.isActive
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </section>

            {/* =================================================
                BOTTOM ACTIONS
            ================================================= */}

            <div className="flex flex-col-reverse items-stretch justify-between gap-3 rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:flex-row sm:items-center">
              <Link
                href="/admin/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
              >
                <ArrowLeft
                  size={15}
                />

                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="brand-grad inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={16} />
                )}

                {saving
                  ? "Updating..."
                  : "Update Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}