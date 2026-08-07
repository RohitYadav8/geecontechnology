"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
    id: string;
    title: string;
    slug: string;
};

type BrochureRequest = {
    id: string;
    name: string;
    phone: string;
    email: string;
    company: string | null;
    website: string | null;
    status: string;
    createdAt: string;
    product: Product | null;
};

export default function BrochureRequestsPage() {
    const [requests, setRequests] = useState<BrochureRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "/api/admin/brochure-requests"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.error ||
                            "Failed to fetch brochure requests"
                    );
                }

                setRequests(
                    Array.isArray(data) ? data : []
                );
            } catch (error) {
                console.error(
                    "Brochure requests fetch error:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load brochure requests."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

            case "contacted":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

            case "downloaded":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

            case "closed":
                return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

            default:
                return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <Link
                            href="/admin"
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                            ← Back to Admin
                        </Link>

                        <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                            Brochure Requests
                        </h1>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Manage all brochure download requests.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Total Requests
                        </p>

                        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                            {loading ? "..." : requests.length}
                        </p>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                            Loading brochure requests...
                        </p>
                    </div>
                ) : requests.length === 0 ? (
                    /* Empty */
                    <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                            ↓
                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                            No brochure requests
                        </h2>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Brochure requests will appear here when
                            users submit the brochure form.
                        </p>
                    </div>
                ) : (
                    /* Table */
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] text-left">
                                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                                    <tr>
                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Name
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Contact
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Company
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Product
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {requests.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                        >
                                            {/* Name */}
                                            <td className="px-5 py-4">
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-white">
                                                        {request.name}
                                                    </p>

                                                    {request.website && (
                                                        <a
                                                            href={
                                                                request.website.startsWith(
                                                                    "http"
                                                                )
                                                                    ? request.website
                                                                    : `https://${request.website}`
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mt-1 block max-w-[180px] truncate text-xs text-blue-600 hover:underline dark:text-blue-400"
                                                        >
                                                            {request.website}
                                                        </a>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Contact */}
                                            <td className="px-5 py-4">
                                                <div className="space-y-1">
                                                    <a
                                                        href={`mailto:${request.email}`}
                                                        className="block text-sm text-blue-600 hover:underline dark:text-blue-400"
                                                    >
                                                        {request.email}
                                                    </a>

                                                    <a
                                                        href={`tel:${request.phone}`}
                                                        className="block text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                                    >
                                                        {request.phone}
                                                    </a>
                                                </div>
                                            </td>

                                            {/* Company */}
                                            <td className="px-5 py-4">
                                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                                    {request.company ||
                                                        "—"}
                                                </span>
                                            </td>

                                            {/* Product */}
                                            <td className="px-5 py-4">
                                                {request.product ? (
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                            {
                                                                request
                                                                    .product
                                                                    .title
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-400">
                                                            {
                                                                request
                                                                    .product
                                                                    .slug
                                                            }
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-slate-400">
                                                        General
                                                    </span>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                                                        request.status
                                                    )}`}
                                                >
                                                    {request.status}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4">
                                                <span className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                    {formatDate(
                                                        request.createdAt
                                                    )}
                                                </span>
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