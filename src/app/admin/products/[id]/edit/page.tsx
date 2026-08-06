"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
    order: number;
};

const initialForm: ProductForm = {
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
                    `/api/admin/products/${encodeURIComponent(id)}`
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
                    shortDescription: data.shortDescription || "",
                    description: data.description || "",
                    features: jsonToText(data.features),
                    benefits: jsonToText(data.benefits),
                    sections: jsonToText(data.sections),
                    faqs: jsonToText(data.faqs),
                    brochureUrl: data.brochureUrl || "",
                    isActive: data.isActive ?? true,
                    order: data.order ?? 0,
                });
            } catch (err) {
                console.error("Fetch product error:", err);

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

    const handleChange = (
        field: keyof ProductForm,
        value: string | boolean | number
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const parseJsonField = (value: string) => {
        if (!value.trim()) {
            return null;
        }

        try {
            return JSON.parse(value);
        } catch {
            throw new Error(
                "Features, benefits, sections and FAQs must contain valid JSON."
            );
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (!form.title.trim() || !form.slug.trim()) {
                setError("Title and slug are required.");
                return;
            }

            const payload = {
                title: form.title.trim(),
                slug: form.slug.trim(),
                bannerImage: form.bannerImage.trim() || null,
                shortDescription:
                    form.shortDescription.trim() || null,
                description: form.description.trim() || null,
                features: parseJsonField(form.features),
                benefits: parseJsonField(form.benefits),
                sections: parseJsonField(form.sections),
                faqs: parseJsonField(form.faqs),
                brochureUrl: form.brochureUrl.trim() || null,
                isActive: form.isActive,
                order: Number(form.order) || 0,
            };

            const response = await fetch(
                `/api/admin/products/${encodeURIComponent(id)}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.error || "Failed to update product"
                );
            }

            setSuccess("Product updated successfully.");

            setTimeout(() => {
                router.push("/admin/products");
                router.refresh();
            }, 800);
        } catch (err) {
            console.error("Update product error:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update product"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
                <div className="mx-auto max-w-5xl">
                    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

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
                {/* Header */}
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
                            Update your product information.
                        </p>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Basic Information
                        </h2>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            {/* Title */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Product Title *
                                </label>

                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) =>
                                        handleChange(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter product title"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                                    placeholder="product-slug"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    Used in the public product URL.
                                </p>
                            </div>

                            {/* Short Description */}
                            <div className="md:col-span-2">
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
                                    placeholder="Short description of the product"
                                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Description
                                </label>

                                <textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        handleChange(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    rows={7}
                                    placeholder="Full product description"
                                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images & Links */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Images & Links
                        </h2>

                        <div className="mt-6 space-y-5">
                            {/* Banner Image */}
                            <div>
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
                                    placeholder="/images/product-banner.png"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />

                                {form.bannerImage && (
                                    <div className="mt-4 h-48 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                                        <img
                                            src={form.bannerImage}
                                            alt={
                                                form.title ||
                                                "Product"
                                            }
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Brochure */}
                            <div>
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
                                    placeholder="https://example.com/brochure.pdf"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Content */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Product Content
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Enter valid JSON for these fields.
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
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
                                    placeholder={`["Feature one", "Feature two"]`}
                                    className="w-full resize-y rounded-lg border border-slate-300 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700"
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
                                    placeholder={`["Benefit one", "Benefit two"]`}
                                    className="w-full resize-y rounded-lg border border-slate-300 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700"
                                />
                            </div>

                            {/* Sections */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Sections
                                </label>

                                <textarea
                                    value={form.sections}
                                    onChange={(e) =>
                                        handleChange(
                                            "sections",
                                            e.target.value
                                        )
                                    }
                                    rows={10}
                                    placeholder={`[
  {
    "title": "Section title",
    "description": "Section description"
  }
]`}
                                    className="w-full resize-y rounded-lg border border-slate-300 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700"
                                />
                            </div>

                            {/* FAQs */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    FAQs
                                </label>

                                <textarea
                                    value={form.faqs}
                                    onChange={(e) =>
                                        handleChange(
                                            "faqs",
                                            e.target.value
                                        )
                                    }
                                    rows={10}
                                    placeholder={`[
  {
    "question": "What is this product?",
    "answer": "Product answer"
  }
]`}
                                    className="w-full resize-y rounded-lg border border-slate-300 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Settings
                        </h2>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
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
                                            Number(
                                                e.target.value
                                            )
                                        )
                                    }
                                    min={0}
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
                                        className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />

                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Product is active
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                        <Link
                            href="/admin/products"
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
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