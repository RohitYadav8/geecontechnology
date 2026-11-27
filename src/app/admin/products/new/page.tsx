"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProductForm = {
  title: string;
  slug: string;

  bannerImage: string;
  logoImage: string;

  shortDescription: string;
  description: string;

  // Front card
  cardTagline: string;
  cardSecondaryText: string;

  // Flip card
  flipEyebrow: string;
  flipTitle: string;
  flipDescription: string;

  // Detail page
  features: string;
  benefits: string;
  sections: string;
  faqs: string;

  brochureUrl: string;

  // Brochure gradient
  brochureGradientFrom: string;
  brochureGradientVia: string;
  brochureGradientTo: string;

  isActive: boolean;
  order: string;
};

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState<ProductForm>({
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

    // Fallback values for new products.
    // Once the product is saved, these values are stored in the database.
    brochureGradientFrom: "#1a2b4a",
    brochureGradientVia: "#254b7a",
    brochureGradientTo: "#2563a8",

    isActive: true,
    order: "0",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Bulk JSON
  const [bulkJson, setBulkJson] = useState("");
  const [importMessage, setImportMessage] = useState("");

  function handleChange(
    field: keyof ProductForm,
    value: string | boolean
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(value: string) {
    setForm((previous) => ({
      ...previous,
      title: value,
      slug: generateSlug(value),
    }));
  }

  /* =====================================================
     BULK JSON HELPERS
  ===================================================== */

  function getString(value: unknown) {
    return typeof value === "string" ? value : "";
  }

  function stringifyJsonField(value: unknown) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "";
    }

    if (typeof value === "string") {
      return value;
    }

    return JSON.stringify(value, null, 2);
  }

  function handleBulkImport() {
    setError("");
    setImportMessage("");

    if (!bulkJson.trim()) {
      setError("Please paste product JSON first.");
      return;
    }

    try {
      const parsed: unknown = JSON.parse(bulkJson);

      if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        throw new Error(
          "Product JSON must be a single JSON object."
        );
      }

      const data = parsed as Record<string, unknown>;

      const title = getString(data.title).trim();

      if (!title) {
        throw new Error(
          'Product JSON must contain a valid "title".'
        );
      }

      const providedSlug = getString(data.slug).trim();

      setForm((previous) => ({
        ...previous,

        title,

        slug: providedSlug
          ? generateSlug(providedSlug)
          : generateSlug(title),

        bannerImage:
          data.bannerImage !== undefined
            ? getString(data.bannerImage)
            : previous.bannerImage,

        logoImage:
          data.logoImage !== undefined
            ? getString(data.logoImage)
            : previous.logoImage,

        shortDescription:
          data.shortDescription !== undefined
            ? getString(data.shortDescription)
            : previous.shortDescription,

        description:
          data.description !== undefined
            ? getString(data.description)
            : previous.description,

        cardTagline:
          data.cardTagline !== undefined
            ? getString(data.cardTagline)
            : previous.cardTagline,

        cardSecondaryText:
          data.cardSecondaryText !== undefined
            ? getString(data.cardSecondaryText)
            : previous.cardSecondaryText,

        flipEyebrow:
          data.flipEyebrow !== undefined
            ? getString(data.flipEyebrow)
            : previous.flipEyebrow,

        flipTitle:
          data.flipTitle !== undefined
            ? getString(data.flipTitle)
            : previous.flipTitle,

        flipDescription:
          data.flipDescription !== undefined
            ? getString(data.flipDescription)
            : previous.flipDescription,

        features:
          data.features !== undefined
            ? stringifyJsonField(data.features)
            : previous.features,

        benefits:
          data.benefits !== undefined
            ? stringifyJsonField(data.benefits)
            : previous.benefits,

        sections:
          data.sections !== undefined
            ? stringifyJsonField(data.sections)
            : previous.sections,

        faqs:
          data.faqs !== undefined
            ? stringifyJsonField(data.faqs)
            : previous.faqs,

        brochureUrl:
          data.brochureUrl !== undefined
            ? getString(data.brochureUrl)
            : previous.brochureUrl,

        brochureGradientFrom:
          data.brochureGradientFrom !== undefined
            ? getString(data.brochureGradientFrom)
            : previous.brochureGradientFrom,

        brochureGradientVia:
          data.brochureGradientVia !== undefined
            ? getString(data.brochureGradientVia)
            : previous.brochureGradientVia,

        brochureGradientTo:
          data.brochureGradientTo !== undefined
            ? getString(data.brochureGradientTo)
            : previous.brochureGradientTo,

        order:
          data.order !== undefined &&
          data.order !== null &&
          data.order !== ""
            ? String(data.order)
            : previous.order,

        isActive:
          typeof data.isActive === "boolean"
            ? data.isActive
            : previous.isActive,
      }));

      setImportMessage(
        `"${title}" imported successfully. Review the fields below, then click Create Product.`
      );
    } catch (err) {
      console.error("Bulk product import error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Invalid product JSON."
      );
    }
  }

  function handleClearBulkJson() {
    setBulkJson("");
    setImportMessage("");
    setError("");
  }

  /* =====================================================
     JSON PARSER
  ===================================================== */

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

  /* =====================================================
     CREATE PRODUCT
  ===================================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError("Product title is required.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Product slug is required.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: form.title.trim(),

        slug: form.slug.trim(),

        /* ============================
           MEDIA
        ============================ */

        bannerImage:
          form.bannerImage.trim() || null,

        logoImage:
          form.logoImage.trim() || null,

        /* ============================
           BASIC CONTENT
        ============================ */

        shortDescription:
          form.shortDescription.trim() || null,

        description:
          form.description.trim() || null,

        /* ============================
           FRONT CARD
        ============================ */

        cardTagline:
          form.cardTagline.trim() || null,

        cardSecondaryText:
          form.cardSecondaryText.trim() || null,

        /* ============================
           FLIP CARD
        ============================ */

        flipEyebrow:
          form.flipEyebrow.trim() || null,

        flipTitle:
          form.flipTitle.trim() || null,

        flipDescription:
          form.flipDescription.trim() || null,

        /* ============================
           DETAIL PAGE
        ============================ */

        features: parseJsonField(
          form.features,
          "Features"
        ),

        benefits: parseJsonField(
          form.benefits,
          "Benefits"
        ),

        sections: parseJsonField(
          form.sections,
          "Sections"
        ),

        faqs: parseJsonField(
          form.faqs,
          "FAQs"
        ),

        brochureUrl:
          form.brochureUrl.trim() || null,

        brochureGradientFrom:
          form.brochureGradientFrom.trim() || null,

        brochureGradientVia:
          form.brochureGradientVia.trim() || null,

        brochureGradientTo:
          form.brochureGradientTo.trim() || null,

        isActive: form.isActive,

        order: Number(form.order) || 0,
      };

      const response = await fetch(
        "/api/admin/products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to create product"
        );
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      console.error(
        "Create product error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     STYLES
  ===================================================== */

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500";

  const textareaClass =
    "w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500";

  const jsonTextareaClass =
    "w-full resize-y rounded-xl border border-slate-800 bg-[#0b1220] px-4 py-3 font-mono text-xs leading-6 text-slate-200 placeholder:text-slate-500 transition focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-500/15 dark:border-white/[0.08] dark:bg-[#060b16]";

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto max-w-5xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="brand-grad relative mb-6 overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
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

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <p className="inline-flex rounded-full border border-white/30 bg-white/[0.14] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                Admin / Products
              </p>

              <h1 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                Add Product
              </h1>

              <p className="mt-2 max-w-xl text-sm text-indigo-50/90">
                Add product card content and complete
                product detail information.
              </p>
            </div>

            <Link
              href="/admin/products"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg transition hover:-translate-y-0.5"
            >
              ← Back to Products
            </Link>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* ===============================================
              BULK PRODUCT JSON IMPORT
          =============================================== */}

          <section className="overflow-hidden rounded-[24px] border border-violet-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(91,33,182,.45)] dark:border-violet-400/20 dark:bg-[#0b1220]">
            <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 via-indigo-50 to-cyan-50 px-5 py-5 sm:px-7 dark:border-white/[0.06] dark:from-violet-500/10 dark:via-indigo-500/[0.06] dark:to-cyan-500/[0.06]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="brand-text text-[11px] font-extrabold uppercase tracking-[0.2em]">
                    Quick Product Entry
                  </p>

                  <h2 className="mt-2 text-lg font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
                    Bulk Product JSON Import
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Paste one complete product JSON
                    object and automatically fill all
                    product fields below.
                  </p>
                </div>

                <span className="inline-flex w-fit rounded-full border border-violet-200 bg-white px-3 py-1 text-[11px] font-bold text-violet-700 shadow-sm dark:border-violet-400/20 dark:bg-white/[0.04] dark:text-violet-300">
                  One JSON = One Product
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                Product JSON
              </label>

              <textarea
                value={bulkJson}
                onChange={(event) => {
                  setBulkJson(event.target.value);

                  if (importMessage) {
                    setImportMessage("");
                  }
                }}
                rows={18}
                spellCheck={false}
                placeholder={`{
  "title": "Global HR",
  "slug": "global-hr",
  "shortDescription": "Complete HR Solution",
  "description": "Complete product description...",
  "bannerImage": "/global-hr.png",
  "logoImage": "/global-hr.png",
  "cardTagline": "Make HR Process Quick, Easy and Simple.",
  "cardSecondaryText": "HR software for companies where people matter.",
  "flipEyebrow": "Take a tour of Global HR!",
  "flipTitle": "Powerful but simple.",
  "flipDescription": "Product flip description...",
  "features": [],
  "benefits": [],
  "sections": [],
  "faqs": [],
  "brochureUrl": "",
  "brochureGradientFrom": "#1a2b4a",
  "brochureGradientVia": "#254b7a",
  "brochureGradientTo": "#2563a8",
  "order": 1,
  "isActive": true
}`}
                className="w-full resize-y rounded-xl border border-slate-800 bg-[#0b1220] px-4 py-4 font-mono text-xs leading-6 text-slate-100 transition placeholder:text-slate-500 focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-500/15 dark:border-white/[0.08] dark:bg-[#060b16]"
              />

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Paste strict JSON only. Do not include
                JavaScript variables, export statements
                or markdown code fences.
              </p>

              {importMessage && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                  ✓ {importMessage}
                </div>
              )}

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleBulkImport}
                  className="brand-grad inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
                >
                  Import & Fill All Fields
                </button>

                <button
                  type="button"
                  onClick={handleClearBulkJson}
                  disabled={
                    !bulkJson && !importMessage
                  }
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
                >
                  Clear JSON
                </button>
              </div>
            </div>
          </section>

          {/* ===============================================
              BASIC INFORMATION
          =============================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:p-7">
            <div>
              <h2 className="text-lg font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Main information used across the
                product website.
              </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* TITLE */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Product Title *
                </label>

                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(event) =>
                    handleTitleChange(
                      event.target.value
                    )
                  }
                  placeholder="Global HR"
                  className={inputClass}
                />
              </div>

              {/* SLUG */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Slug *
                </label>

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
                  placeholder="global-hr"
                  className={inputClass}
                />

                <p className="mt-2 text-[11px] text-slate-400">
                  Product URL: /products/
                  {form.slug || "product-slug"}
                </p>
              </div>

              {/* SHORT DESCRIPTION */}

              <div className="sm:col-span-2">
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Short Description
                </label>

                <textarea
                  value={form.shortDescription}
                  onChange={(event) =>
                    handleChange(
                      "shortDescription",
                      event.target.value
                    )
                  }
                  rows={3}
                  placeholder="Complete HR Solution"
                  className={textareaClass}
                />
              </div>

              {/* DESCRIPTION */}

              <div className="sm:col-span-2">
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Full Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    handleChange(
                      "description",
                      event.target.value
                    )
                  }
                  rows={7}
                  placeholder="Complete product description..."
                  className={textareaClass}
                />
              </div>
            </div>
          </section>

          {/* ===============================================
              PRODUCT MEDIA
          =============================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:p-7">
            <div>
              <h2 className="text-lg font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
                Product Media
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Banner and logo used on product
                cards and pages.
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* BANNER */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Banner Image URL
                </label>

                <input
                  type="text"
                  value={form.bannerImage}
                  onChange={(event) =>
                    handleChange(
                      "bannerImage",
                      event.target.value
                    )
                  }
                  placeholder="/global-hr-banner.png"
                  className={inputClass}
                />

                {form.bannerImage && (
                  <div className="mt-4 h-44 overflow-hidden rounded-[16px] border border-dashed border-violet-200 bg-slate-50/60 dark:border-white/[0.1] dark:bg-[#060b16]">
                    <img
                      src={form.bannerImage}
                      alt="Banner preview"
                      className="h-full w-full object-contain p-3"
                    />
                  </div>
                )}
              </div>

              {/* LOGO */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Logo Image URL
                </label>

                <input
                  type="text"
                  value={form.logoImage}
                  onChange={(event) =>
                    handleChange(
                      "logoImage",
                      event.target.value
                    )
                  }
                  placeholder="/global-hr-logo.png"
                  className={inputClass}
                />

                <p className="mt-2 text-[11px] text-slate-400">
                  Later this field can receive the
                  selected Media Library URL.
                </p>

                {form.logoImage && (
                  <div className="mt-4 flex h-44 items-center justify-center overflow-hidden rounded-[16px] border border-dashed border-violet-200 bg-slate-50/60 dark:border-white/[0.1] dark:bg-[#060b16]">
                    <img
                      src={form.logoImage}
                      alt="Logo preview"
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ===============================================
              FRONT CARD
          =============================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:p-7">
            <div>
              <p className="brand-text text-[11px] font-extrabold uppercase tracking-[0.2em]">
                Product Listing
              </p>

              <h2 className="mt-2 text-lg font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
                Front Card Content
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                This content appears before the
                product card flips.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              {/* TAGLINE */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Card Tagline
                </label>

                <textarea
                  value={form.cardTagline}
                  onChange={(event) =>
                    handleChange(
                      "cardTagline",
                      event.target.value
                    )
                  }
                  rows={2}
                  placeholder="Make HR Process Quick, Easy and Simple."
                  className={textareaClass}
                />
              </div>

              {/* SECONDARY TEXT */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Card Secondary Text
                </label>

                <textarea
                  value={form.cardSecondaryText}
                  onChange={(event) =>
                    handleChange(
                      "cardSecondaryText",
                      event.target.value
                    )
                  }
                  rows={2}
                  placeholder="HR software for companies where people matter."
                  className={textareaClass}
                />
              </div>
            </div>
          </section>

          {/* ===============================================
              FLIP CARD
          =============================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:p-7">
            <div>
              <p className="brand-text text-[11px] font-extrabold uppercase tracking-[0.2em]">
                Hover Content
              </p>

              <h2 className="mt-2 text-lg font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
                Flip Card Content
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                This content appears when the card
                flips on desktop.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              {/* EYEBROW */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Flip Eyebrow
                </label>

                <input
                  type="text"
                  value={form.flipEyebrow}
                  onChange={(event) =>
                    handleChange(
                      "flipEyebrow",
                      event.target.value
                    )
                  }
                  placeholder="TAKE A TOUR OF GLOBAL HR!"
                  className={inputClass}
                />
              </div>

              {/* TITLE */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Flip Title
                </label>

                <input
                  type="text"
                  value={form.flipTitle}
                  onChange={(event) =>
                    handleChange(
                      "flipTitle",
                      event.target.value
                    )
                  }
                  placeholder="POWERFUL BUT SIMPLE."
                  className={inputClass}
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Flip Description
                </label>

                <textarea
                  value={form.flipDescription}
                  onChange={(event) =>
                    handleChange(
                      "flipDescription",
                      event.target.value
                    )
                  }
                  rows={5}
                  placeholder="Description displayed on the back side of the product card..."
                  className={textareaClass}
                />
              </div>
            </div>
          </section>

          {/* ===============================================
              DETAIL PAGE CONTENT
          =============================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:p-7">
            <h2 className="text-lg font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
              Product Detail Page Content
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              This information appears after the user
              clicks Explore Product / Read More.
            </p>

            <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
              Features, Benefits, Sections and FAQs
              must contain valid JSON.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* FEATURES */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Features
                </label>

                <textarea
                  value={form.features}
                  onChange={(event) =>
                    handleChange(
                      "features",
                      event.target.value
                    )
                  }
                  rows={9}
                  placeholder={`[
  "Employee Management",
  "Attendance Management",
  "Payroll Management"
]`}
                  className={jsonTextareaClass}
                />
              </div>

              {/* BENEFITS */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Benefits
                </label>

                <textarea
                  value={form.benefits}
                  onChange={(event) =>
                    handleChange(
                      "benefits",
                      event.target.value
                    )
                  }
                  rows={9}
                  placeholder={`[
  "Save HR processing time",
  "Improve workforce visibility",
  "Simplify administration"
]`}
                  className={jsonTextareaClass}
                />
              </div>

              {/* SECTIONS */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Sections
                </label>

                <textarea
                  value={form.sections}
                  onChange={(event) =>
                    handleChange(
                      "sections",
                      event.target.value
                    )
                  }
                  rows={12}
                  placeholder={`[
  {
    "title": "Dashboard",
    "description": "Complete HR dashboard."
  }
]`}
                  className={jsonTextareaClass}
                />
              </div>

              {/* FAQS */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  FAQs
                </label>

                <textarea
                  value={form.faqs}
                  onChange={(event) =>
                    handleChange(
                      "faqs",
                      event.target.value
                    )
                  }
                  rows={12}
                  placeholder={`[
  {
    "question": "What is Global HR?",
    "answer": "Global HR is a complete HR management system."
  }
]`}
                  className={jsonTextareaClass}
                />
              </div>
            </div>
          </section>

          {/* ===============================================
              SETTINGS
          =============================================== */}

          <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:p-7">
            <h2 className="text-lg font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
              Settings
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* BROCHURE */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Brochure URL
                </label>

                <input
                  type="text"
                  value={form.brochureUrl}
                  onChange={(event) =>
                    handleChange(
                      "brochureUrl",
                      event.target.value
                    )
                  }
                  placeholder="/brochures/global-hr.pdf"
                  className={inputClass}
                />
              </div>

              {/* BROCHURE GRADIENT */}

              <div className="md:col-span-2">
                <div className="rounded-[20px] border border-violet-200/80 bg-violet-50/40 p-5 dark:border-violet-400/15 dark:bg-violet-500/[0.05]">
                  <div>
                    <p className="brand-text text-[11px] font-extrabold uppercase tracking-[0.2em]">
                      Brochure Appearance
                    </p>

                    <h3 className="mt-2 text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                      Brochure Gradient
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Choose the three colors used on this product&apos;s brochure request card.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                        Start Color
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={form.brochureGradientFrom}
                          onChange={(event) =>
                            handleChange(
                              "brochureGradientFrom",
                              event.target.value
                            )
                          }
                          className="h-[46px] w-12 shrink-0 cursor-pointer rounded-xl border border-slate-200 bg-white p-1 dark:border-white/[0.08] dark:bg-white/[0.04]"
                        />

                        <input
                          type="text"
                          value={form.brochureGradientFrom}
                          onChange={(event) =>
                            handleChange(
                              "brochureGradientFrom",
                              event.target.value
                            )
                          }
                          placeholder="#1a2b4a"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                        Middle Color
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={form.brochureGradientVia}
                          onChange={(event) =>
                            handleChange(
                              "brochureGradientVia",
                              event.target.value
                            )
                          }
                          className="h-[46px] w-12 shrink-0 cursor-pointer rounded-xl border border-slate-200 bg-white p-1 dark:border-white/[0.08] dark:bg-white/[0.04]"
                        />

                        <input
                          type="text"
                          value={form.brochureGradientVia}
                          onChange={(event) =>
                            handleChange(
                              "brochureGradientVia",
                              event.target.value
                            )
                          }
                          placeholder="#254b7a"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                        End Color
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={form.brochureGradientTo}
                          onChange={(event) =>
                            handleChange(
                              "brochureGradientTo",
                              event.target.value
                            )
                          }
                          className="h-[46px] w-12 shrink-0 cursor-pointer rounded-xl border border-slate-200 bg-white p-1 dark:border-white/[0.08] dark:bg-white/[0.04]"
                        />

                        <input
                          type="text"
                          value={form.brochureGradientTo}
                          onChange={(event) =>
                            handleChange(
                              "brochureGradientTo",
                              event.target.value
                            )
                          }
                          placeholder="#2563a8"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="brand-text mb-2 text-[11px] font-extrabold uppercase tracking-[0.2em]">
                      Live Preview
                    </p>

                    <div
                      className="relative min-h-[190px] overflow-hidden rounded-[22px] p-6 text-white shadow-[0_30px_70px_-35px_rgba(91,33,182,.45)]"
                      style={{
                        background: `linear-gradient(135deg, ${form.brochureGradientFrom}, ${form.brochureGradientVia}, ${form.brochureGradientTo})`,
                      }}
                    >
                      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                      <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

                      <div className="relative z-10">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                          Brochure
                        </span>

                        <h4 className="mt-5 text-2xl font-bold">
                          {form.title || "Product Brochure"}
                        </h4>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
                          This is how the brochure request section gradient will appear on the product page.
                        </p>

                        <div className="mt-5 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-lg">
                          Request Brochure
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ORDER */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Display Order
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.order}
                  onChange={(event) =>
                    handleChange(
                      "order",
                      event.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

              {/* ACTIVE */}

              <div className="flex items-center">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(event) =>
                      handleChange(
                        "isActive",
                        event.target.checked
                      )
                    }
                    className="h-5 w-5 rounded border-slate-300 accent-violet-600 text-violet-600 focus:ring-violet-500"
                  />

                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Product is active
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* ===============================================
              BUTTONS
          =============================================== */}

          <div className="flex flex-col-reverse justify-end gap-3 rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:flex-row">
            <Link
              href="/admin/products"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="brand-grad inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating..."
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}