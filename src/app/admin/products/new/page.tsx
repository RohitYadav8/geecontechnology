
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProductForm = {
    title: string;
    slug: string;
    bannerImage: string;
    shortDescription: string;
    description: string;
    features: string;
    benefits: string;
    sections: string;
    faqs: string;
    brochureUrl: string;
    isActive: boolean;
    order: string;
};

export default function NewProductPage() {
    const router = useRouter();

    const [form, setForm] = useState<ProductForm>({
        title: "",
        slug: "",
        bannerImage: "",
        shortDescription: "",
        description: "",
        features: "",
        benefits: "",
        sections: "",
        faqs: "",
        brochureUrl: "",
        isActive: true,
        order: "0",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        field: keyof ProductForm,
        value: string | boolean
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    const handleTitleChange = (value: string) => {
        setForm((prev) => ({
            ...prev,
            title: value,
            slug: generateSlug(value),
        }));
    };

    const parseJsonField = (value: string, fieldName: string) => {
        if (!value.trim()) {
            return null;
        }

        try {
            return JSON.parse(value);
        } catch {
            throw new Error(`${fieldName} must contain valid JSON.`);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
                bannerImage: form.bannerImage.trim() || null,
                shortDescription:
                    form.shortDescription.trim() || null,
                description: form.description.trim() || null,

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

                brochureUrl: form.brochureUrl.trim() || null,

                isActive: form.isActive,

                order: Number(form.order) || 0,
            };

            const response = await fetch("/api/admin/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to create product"
                );
            }

            router.push("/admin/products");
            router.refresh();
        } catch (err) {
            console.error("Create product error:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to create product"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Add Product
                        </h1>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Create a new product for your website.
                        </p>
                    </div>

                    <Link
                        href="/admin/products"
                        className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        ← Back to Products
                    </Link>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Basic Information
                        </h2>

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                            {/* Title */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Product Title *
                                </label>

                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) =>
                                        handleTitleChange(
                                            e.target.value
                                        )
                                    }
                                    placeholder="CRM360"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                    required
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
                                    onChange={(e) =>
                                        handleChange(
                                            "slug",
                                            e.target.value
                                        )
                                    }
                                    placeholder="crm360"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                    required
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    Example: crm360
                                </p>
                            </div>

                            {/* Banner */}
                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Banner Image URL
                                </label>

                                <input
                                    type="text"
                                    value={form.bannerImage}
                                    onChange={(e) =>
                                        handleChange(
                                            "bannerImage",
                                            e.target.value
                                        )
                                    }
                                    placeholder="/crm-banner.png"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    Example: /crm-banner.png or an external image URL.
                                </p>
                            </div>

                            {/* Short Description */}
                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Short Description
                                </label>

                                <textarea
                                    value={form.shortDescription}
                                    onChange={(e) =>
                                        handleChange(
                                            "shortDescription",
                                            e.target.value
                                        )
                                    }
                                    rows={3}
                                    placeholder="Short description of the product..."
                                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Full Description
                                </label>

                                <textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        handleChange(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    rows={8}
                                    placeholder="Write the complete product description..."
                                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Features & Benefits */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Features & Benefits
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                            These fields are stored as JSON. Use the examples below.
                        </p>

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                            {/* Features */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Features
                                </label>

                                <textarea
                                    value={form.features}
                                    onChange={(e) =>
                                        handleChange(
                                            "features",
                                            e.target.value
                                        )
                                    }
                                    rows={8}
                                    placeholder={`[
  "Lead Management",
  "Sales Force Automation",
  "Reporting",
  "Inventory Management"
]`}
                                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />
                            </div>

                            {/* Benefits */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Benefits
                                </label>

                                <textarea
                                    value={form.benefits}
                                    onChange={(e) =>
                                        handleChange(
                                            "benefits",
                                            e.target.value
                                        )
                                    }
                                    rows={8}
                                    placeholder={`[
  "Easy to use",
  "Save time",
  "Better productivity"
]`}
                                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Sections */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Content Sections
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                            Add custom sections as a JSON array.
                        </p>

                        <div className="mt-5">
                            <textarea
                                value={form.sections}
                                onChange={(e) =>
                                    handleChange(
                                        "sections",
                                        e.target.value
                                    )
                                }
                                rows={12}
                                placeholder={`[
  {
    "title": "Contact Management",
    "description": "Manage all customer contacts from one place."
  },
  {
    "title": "Reporting",
    "description": "Generate detailed business reports."
  }
]`}
                                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </div>
                    </section>

                    {/* FAQs */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            FAQs
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                            Add FAQ questions and answers as JSON.
                        </p>

                        <div className="mt-5">
                            <textarea
                                value={form.faqs}
                                onChange={(e) =>
                                    handleChange(
                                        "faqs",
                                        e.target.value
                                    )
                                }
                                rows={12}
                                placeholder={`[
  {
    "question": "What is CRM360?",
    "answer": "CRM360 is a web-based customer relationship management system."
  },
  {
    "question": "Does it support reporting?",
    "answer": "Yes, CRM360 provides reporting features."
  }
]`}
                                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </div>
                    </section>

                    {/* Settings */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Product Settings
                        </h2>

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                            {/* Brochure */}
                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Brochure URL
                                </label>

                                <input
                                    type="text"
                                    value={form.brochureUrl}
                                    onChange={(e) =>
                                        handleChange(
                                            "brochureUrl",
                                            e.target.value
                                        )
                                    }
                                    placeholder="/brochures/crm360.pdf"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />
                            </div>

                            {/* Order */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Display Order
                                </label>

                                <input
                                    type="number"
                                    value={form.order}
                                    onChange={(e) =>
                                        handleChange(
                                            "order",
                                            e.target.value
                                        )
                                    }
                                    min="0"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />
                            </div>

                            {/* Active */}
                            <div className="flex items-center">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={form.isActive}
                                        onChange={(e) =>
                                            handleChange(
                                                "isActive",
                                                e.target.checked
                                            )
                                        }
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />

                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Product is active
                                    </span>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                        <Link
                            href="/admin/products"
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Creating Product..."
                                : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

