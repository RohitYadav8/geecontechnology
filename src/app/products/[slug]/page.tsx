import { notFound } from "next/navigation";

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
};

async function getProduct(slug: string): Promise<Product | null> {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000";

    const response = await fetch(
        `${baseUrl}/api/products/${encodeURIComponent(slug)}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return null;
    }

    return response.json();
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const product = await getProduct(slug);

    if (!product || !product.isActive) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                                Product
                            </p>

                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                {product.title}
                            </h1>

                            {product.shortDescription && (
                                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                                    {product.shortDescription}
                                </p>
                            )}
                        </div>

                        {product.bannerImage && (
                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
                                <img
                                    src={product.bannerImage}
                                    alt={product.title}
                                    className="h-auto w-full object-contain"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Description */}
            {product.description && (
                <section className="px-6 py-20">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="text-3xl font-bold text-slate-900">
                            About {product.title}
                        </h2>

                        <p className="mt-6 whitespace-pre-line text-lg leading-8 text-slate-600">
                            {product.description}
                        </p>
                    </div>
                </section>
            )}

            {/* Features */}
            {Array.isArray(product.features) &&
                product.features.length > 0 && (
                    <section className="bg-slate-50 px-6 py-20">
                        <div className="mx-auto max-w-7xl">
                            <h2 className="text-3xl font-bold text-slate-900">
                                Features
                            </h2>

                            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {product.features.map(
                                    (feature, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                                        >
                                            <p className="text-slate-700">
                                                {typeof feature ===
                                                "string"
                                                    ? feature
                                                    : JSON.stringify(
                                                          feature
                                                      )}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}

            {/* Benefits */}
            {Array.isArray(product.benefits) &&
                product.benefits.length > 0 && (
                    <section className="px-6 py-20">
                        <div className="mx-auto max-w-7xl">
                            <h2 className="text-3xl font-bold text-slate-900">
                                Benefits
                            </h2>

                            <div className="mt-10 grid gap-6 md:grid-cols-3">
                                {product.benefits.map(
                                    (benefit, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-slate-200 p-6"
                                        >
                                            <p className="text-slate-700">
                                                {typeof benefit ===
                                                "string"
                                                    ? benefit
                                                    : JSON.stringify(
                                                          benefit
                                                      )}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}

            {/* Sections */}
            {Array.isArray(product.sections) &&
                product.sections.length > 0 && (
                    <section className="bg-slate-950 px-6 py-20 text-white">
                        <div className="mx-auto max-w-5xl">
                            {product.sections.map(
                                (section, index) => {
                                    if (
                                        typeof section !==
                                            "object" ||
                                        section === null
                                    ) {
                                        return null;
                                    }

                                    const item =
                                        section as {
                                            title?: string;
                                            description?: string;
                                        };

                                    return (
                                        <div
                                            key={index}
                                            className="border-b border-white/10 py-10 first:pt-0 last:border-b-0"
                                        >
                                            {item.title && (
                                                <h3 className="text-2xl font-bold">
                                                    {
                                                        item.title
                                                    }
                                                </h3>
                                            )}

                                            {item.description && (
                                                <p className="mt-4 leading-8 text-slate-300">
                                                    {
                                                        item.description
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </section>
                )}

            {/* Brochure */}
            {product.brochureUrl && (
                <section className="px-6 py-16">
                    <div className="mx-auto max-w-4xl text-center">
                        <a
                            href={product.brochureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Download Brochure
                        </a>
                    </div>
                </section>
            )}
        </main>
    );
}