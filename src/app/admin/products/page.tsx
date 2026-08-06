"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
id: string;
title: string;
slug: string;
bannerImage: string | null;
shortDescription: string | null;
isActive: boolean;
order: number;
createdAt: string;
};

export default function AdminProductsPage() {
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");


const fetchProducts = async () => {
    try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/admin/products");

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
    } catch (err) {
        console.error(err);
        setError("Failed to load products");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchProducts();
}, []);

const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
        const response = await fetch(`/api/admin/products/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete product");
        }

        setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
        console.error(err);
        alert("Failed to delete product");
    }
};

return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Products
                    </h1>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Manage your website products from here.
                    </p>
                </div>

                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    + Add Product
                </Link>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm text-slate-500">
                        Loading products...
                    </p>
                </div>
            ) : products.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        No products found
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Start by adding your first product.
                    </p>

                    <Link
                        href="/admin/products/new"
                        className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Add Product
                    </Link>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Product
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Slug
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Order
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    >
                                        {/* Product */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-20 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                                                    {product.bannerImage ? (
                                                        <img
                                                            src={product.bannerImage}
                                                            alt={product.title}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                                        {product.title}
                                                    </h3>

                                                    {product.shortDescription && (
                                                        <p className="mt-1 max-w-md truncate text-xs text-slate-500 dark:text-slate-400">
                                                            {product.shortDescription}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Slug */}
                                        <td className="px-6 py-5">
                                            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                                {product.slug}
                                            </code>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5">
                                            {product.isActive ? (
                                                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>

                                        {/* Order */}
                                        <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                                            {product.order}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(product.id)
                                                    }
                                                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    </div>
);


}
