"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

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

function jsonToText(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return "";
  }
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [form, setForm] = useState<ProductForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/admin/products/${encodeURIComponent(id)}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error || "Failed to fetch product"
          );
        }

        setForm({
          title: data.title || "",
          slug: data.slug || "",

          bannerImage: data.bannerImage || "",
          logoImage: data.logoImage || "",

          shortDescription:
            data.shortDescription || "",

          description:
            data.description || "",

          cardTagline:
            data.cardTagline || "",

          cardSecondaryText:
            data.cardSecondaryText || "",

          flipEyebrow:
            data.flipEyebrow || "",

          flipTitle:
            data.flipTitle || "",

          flipDescription:
            data.flipDescription || "",

          features:
            jsonToText(data.features),

          benefits:
            jsonToText(data.benefits),

          sections:
            jsonToText(data.sections),

          faqs:
            jsonToText(data.faqs),

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

  function handleChange(
    field: keyof ProductForm,
    value: string | boolean | number
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

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

        /* MEDIA */

        bannerImage:
          form.bannerImage.trim() ||
          null,

        logoImage:
          form.logoImage.trim() ||
          null,

        /* BASIC CONTENT */

        shortDescription:
          form.shortDescription.trim() ||
          null,

        description:
          form.description.trim() ||
          null,

        /* FRONT CARD */

        cardTagline:
          form.cardTagline.trim() ||
          null,

        cardSecondaryText:
          form.cardSecondaryText.trim() ||
          null,

        /* FLIP CARD */

        flipEyebrow:
          form.flipEyebrow.trim() ||
          null,

        flipTitle:
          form.flipTitle.trim() ||
          null,

        flipDescription:
          form.flipDescription.trim() ||
          null,

        /* DETAIL PAGE */

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

        /* BROCHURE GRADIENT */

        brochureGradientFrom:
          form.brochureGradientFrom.trim() ||
          null,

        brochureGradientVia:
          form.brochureGradientVia.trim() ||
          null,

        brochureGradientTo:
          form.brochureGradientTo.trim() ||
          null,

        /* DISPLAY */

        isActive:
          form.isActive,

        order:
          Number(form.order) || 0,
      };

      const response = await fetch(
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

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  const textareaClass =
    "w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  const jsonTextareaClass =
    "w-full resize-y rounded-lg border border-slate-300 bg-slate-950 px-4 py-3 font-mono text-xs text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700";

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Loading product...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/admin/products"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ← Back to Products
            </Link>

            <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              Edit Product
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Update card, flip and detail
              page information.
            </p>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* BASIC INFORMATION */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Basic Information
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Product Title *
                </label>

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
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className={inputClass}
                />

                <p className="mt-1 text-xs text-slate-400">
                  /products/{form.slug}
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Short Description
                </label>

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
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Full Description
                </label>

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

          {/* PRODUCT MEDIA */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Product Media
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Banner and logo can use a
              Media Library URL/path.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
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
                    handleChange(
                      "bannerImage",
                      event.target.value
                    )
                  }
                  placeholder="/product-banner.png"
                  className={inputClass}
                />

                {form.bannerImage && (
                  <div className="mt-4 h-44 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
                    <img
                      src={
                        form.bannerImage
                      }
                      alt="Banner preview"
                      className="h-full w-full object-contain p-3"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  placeholder="/product-logo.png"
                  className={inputClass}
                />

                {form.logoImage && (
                  <div className="mt-4 flex h-44 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
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

          {/* FRONT CARD */}

          <section className="rounded-2xl border border-blue-200 bg-blue-50/40 p-6 shadow-sm dark:border-blue-900/40 dark:bg-blue-950/10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              Product Listing
            </p>

            <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              Front Card Content
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Card Tagline
                </label>

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
                  rows={2}
                  placeholder="Make HR Process Quick, Easy and Simple."
                  className={
                    textareaClass
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Card Secondary Text
                </label>

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
                  rows={2}
                  placeholder="HR software for companies where people matter."
                  className={
                    textareaClass
                  }
                />
              </div>
            </div>
          </section>

          {/* FLIP CARD */}

          <section className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-6 shadow-sm dark:border-indigo-900/40 dark:bg-indigo-950/10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              Hover Content
            </p>

            <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              Flip Card Content
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Flip Eyebrow
                </label>

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
                  placeholder="TAKE A TOUR OF GLOBAL HR!"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Flip Title
                </label>

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
                  placeholder="POWERFUL BUT SIMPLE."
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Flip Description
                </label>

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
                  rows={5}
                  placeholder="Content displayed after the card flips..."
                  className={
                    textareaClass
                  }
                />
              </div>
            </div>
          </section>

          {/* DETAIL CONTENT */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Product Detail Page Content
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Used after clicking Explore
              Product.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className={
                    jsonTextareaClass
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className={
                    jsonTextareaClass
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className={
                    jsonTextareaClass
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className={
                    jsonTextareaClass
                  }
                />
              </div>
            </div>
          </section>

          {/* BROCHURE APPEARANCE */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
                Brochure
              </p>

              <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                Brochure Appearance
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Select the gradient colors for
                this product&apos;s brochure
                request card.
              </p>
            </div>

            <div className="p-6">
              <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1fr]">
                {/* START */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Start Color
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={
                        form.brochureGradientFrom
                      }
                      onChange={(event) =>
                        handleChange(
                          "brochureGradientFrom",
                          event.target.value
                        )
                      }
                      className="h-12 w-14 shrink-0 cursor-pointer rounded-lg border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-950"
                    />

                    <input
                      type="text"
                      value={
                        form.brochureGradientFrom
                      }
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

                {/* MIDDLE */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Middle Color
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={
                        form.brochureGradientVia
                      }
                      onChange={(event) =>
                        handleChange(
                          "brochureGradientVia",
                          event.target.value
                        )
                      }
                      className="h-12 w-14 shrink-0 cursor-pointer rounded-lg border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-950"
                    />

                    <input
                      type="text"
                      value={
                        form.brochureGradientVia
                      }
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

                {/* END */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    End Color
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={
                        form.brochureGradientTo
                      }
                      onChange={(event) =>
                        handleChange(
                          "brochureGradientTo",
                          event.target.value
                        )
                      }
                      className="h-12 w-14 shrink-0 cursor-pointer rounded-lg border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-950"
                    />

                    <input
                      type="text"
                      value={
                        form.brochureGradientTo
                      }
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

              {/* LIVE PREVIEW */}

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Live Preview
                  </p>

                  <p className="text-xs text-slate-400">
                    135° gradient
                  </p>
                </div>

                <div
                  className="relative min-h-[190px] overflow-hidden rounded-2xl p-6 text-white shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${form.brochureGradientFrom}, ${form.brochureGradientVia}, ${form.brochureGradientTo})`,
                  }}
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

                  <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

                  <div className="relative z-10">
                    <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                      Brochure
                    </div>

                    <h3 className="mt-5 max-w-xl text-2xl font-bold">
                      {form.title ||
                        "Product Brochure"}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
                      This gradient will be used
                      on the brochure request
                      card for this product.
                    </p>

                    <div className="mt-5 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg">
                      Request Brochure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SETTINGS */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Settings
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Brochure URL
                </label>

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
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Display Order
                </label>

                <input
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(event) =>
                    handleChange(
                      "order",
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div className="flex items-center">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={
                      form.isActive
                    }
                    onChange={(event) =>
                      handleChange(
                        "isActive",
                        event.target.checked
                      )
                    }
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Product is active
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* ACTIONS */}

          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Link
              href="/admin/products"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Updating..."
                : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}