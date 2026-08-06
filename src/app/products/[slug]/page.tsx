"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Image from "next/image";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";
import { FaqAccordion } from "../../../../components/faq-accordion";

type Product = {
    id: string;
    title: string;
    slug: string;
    bannerImage: string | null;
    shortDescription: string | null;
    description: string | null;
    features: unknown;
    benefits: unknown;
    sections: unknown;
    faqs: unknown;
    brochureUrl: string | null;
    isActive: boolean;
    order: number;
    createdAt?: string;
    updatedAt?: string;
};

type FAQ = {
    question: string;
    answer: string;
};

type ContentSection = {
    title: string;
    description: string;
};

export default function ProductDetailPage() {
    const params = useParams();

    const slug = params?.slug as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `/api/products/${encodeURIComponent(slug)}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.error || "Failed to fetch product"
                    );
                }

                setProduct(data);
            } catch (err) {
                console.error("Product detail fetch error:", err);

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
    }, [slug]);

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
                <Navbar />

                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="text-center">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                            Loading product...
                        </p>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
                <Navbar />

                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Product Not Found
                        </h1>

                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            {error ||
                                "The product you are looking for does not exist."}
                        </p>

                        <Link
                            href="/products"
                            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            ← Back to Products
                        </Link>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    const features = parseStringArray(product.features);

    const benefits = parseStringArray(product.benefits);

    const sections = parseSections(product.sections);

    const faqs = parseFAQs(product.faqs);

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />

            <main className="relative flex-1 overflow-hidden">
                {/* Background Grid */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10" />

                {/* Background Glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]" />

                {/* Floating Blobs */}
                <FloatingBlob
                    className="-right-20 top-10 h-72 w-72"
                    color="bg-blue-400/10"
                    duration={16}
                />

                <FloatingBlob
                    className="-left-16 top-96 h-64 w-64"
                    color="bg-cyan-300/10"
                    duration={20}
                />

                <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-20">
                    {/* Back */}
                    <AnimateIn>
                        <Link
                            href="/products"
                            className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                        >
                            ← Back to Products
                        </Link>
                    </AnimateIn>

                    {/* Title */}
                    <AnimatedHeading
                        text={product.title}
                        as="h1"
                        className="mt-6 text-3xl font-bold text-blue-600 dark:text-blue-400 sm:text-4xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        {/* Main Content */}
                        <div>
                            {/* Banner */}
                            {product.bannerImage && (
                                <AnimateIn>
                                    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-slate-300/30 p-[2px]">
                                        <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-white dark:bg-slate-900 sm:h-72">
                                            <Image
                                                src={product.bannerImage}
                                                alt={product.title}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 800px"
                                                className="object-contain p-4"
                                            />
                                        </div>
                                    </div>
                                </AnimateIn>
                            )}

                            {/* Short Description */}
                            {product.shortDescription && (
                                <AnimateIn delay={0.1}>
                                    <p className="mt-8 text-base font-medium leading-7 text-slate-700 dark:text-slate-300">
                                        {product.shortDescription}
                                    </p>
                                </AnimateIn>
                            )}

                            {/* Description */}
                            {product.description && (
                                <AnimateIn delay={0.15}>
                                    <div className="mt-6 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {product.description
                                            .split("\n")
                                            .filter(Boolean)
                                            .map((paragraph, index) => (
                                                <p key={index}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                    </div>
                                </AnimateIn>
                            )}

                            {/* Features */}
                            {features.length > 0 && (
                                <AnimateIn delay={0.2}>
                                    <section className="mt-10">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                            Features
                                        </h2>

                                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                            {features.map(
                                                (feature, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                                                    >
                                                        <div className="flex gap-3">
                                                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                                ✓
                                                            </div>

                                                            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                                                {feature}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </section>
                                </AnimateIn>
                            )}

                            {/* Benefits */}
                            {benefits.length > 0 && (
                                <AnimateIn delay={0.25}>
                                    <section className="mt-10">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                            Benefits
                                        </h2>

                                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                            {benefits.map(
                                                (benefit, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                                    >
                                                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                                            {benefit}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </section>
                                </AnimateIn>
                            )}

                            {/* Content Sections */}
                            {sections.length > 0 && (
                                <AnimateIn delay={0.3}>
                                    <section className="mt-10">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                            More About {product.title}
                                        </h2>

                                        <div className="mt-6 space-y-5">
                                            {sections.map(
                                                (section, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                                    >
                                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                            {
                                                                section.title
                                                            }
                                                        </h3>

                                                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                                            {
                                                                section.description
                                                            }
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </section>
                                </AnimateIn>
                            )}

                            {/* FAQs */}
                            {faqs.length > 0 && (
                                <AnimateIn delay={0.35}>
                                    <section className="mt-10">
                                        <FaqAccordion items={faqs} />
                                    </section>
                                </AnimateIn>
                            )}
                        </div>

                        {/* Sidebar */}
                        <AnimateIn
                            delay={0.25}
                            direction="left"
                            className="lg:sticky lg:top-24 lg:self-start"
                        >
                            <BrochureForm />

                            {product.brochureUrl && (
                                <a
                                    href={product.brochureUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 flex w-full items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400 dark:hover:bg-blue-950/50"
                                >
                                    Download Brochure
                                </a>
                            )}
                        </AnimateIn>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

/* =========================
   JSON Helpers
========================= */

function parseStringArray(value: unknown): string[] {
    if (!value) {
        return [];
    }

    if (Array.isArray(value)) {
        return value.filter(
            (item): item is string => typeof item === "string"
        );
    }

    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);

            if (Array.isArray(parsed)) {
                return parsed.filter(
                    (item): item is string =>
                        typeof item === "string"
                );
            }
        } catch {
            return [];
        }
    }

    return [];
}

function parseSections(value: unknown): ContentSection[] {
    if (!value) {
        return [];
    }

    let parsed: unknown = value;

    if (typeof value === "string") {
        try {
            parsed = JSON.parse(value);
        } catch {
            return [];
        }
    }

    if (!Array.isArray(parsed)) {
        return [];
    }

    return parsed.filter(
        (item): item is ContentSection =>
            typeof item === "object" &&
            item !== null &&
            "title" in item &&
            "description" in item &&
            typeof item.title === "string" &&
            typeof item.description === "string"
    );
}

function parseFAQs(value: unknown): FAQ[] {
    if (!value) {
        return [];
    }

    let parsed: unknown = value;

    if (typeof value === "string") {
        try {
            parsed = JSON.parse(value);
        } catch {
            return [];
        }
    }

    if (!Array.isArray(parsed)) {
        return [];
    }

    return parsed.filter(
        (item): item is FAQ =>
            typeof item === "object" &&
            item !== null &&
            "question" in item &&
            "answer" in item &&
            typeof item.question === "string" &&
            typeof item.answer === "string"
    );
}