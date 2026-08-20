"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  PackageOpen,
  RefreshCw,
} from "lucide-react";

type ProductSolution = {
  id: string;
  name: string;
  slug: string;
  projectTag: string | null;
  excerpt: string | null;
  logoImage: string | null;
  bannerImage: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function ProductSolutionPage() {
  const [solutions, setSolutions] = useState<ProductSolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchSolutions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/product-solutions",
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to fetch product solutions"
        );
      }

      setSolutions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch product solutions error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch product solutions"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  async function handleDelete(solution: ProductSolution) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${solution.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(solution.id);

      const response = await fetch(
        `/api/admin/product-solutions/${solution.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to delete product solution"
        );
      }

      setSolutions((current) =>
        current.filter((item) => item.id !== solution.id)
      );
    } catch (err) {
      console.error("Delete product solution error:", err);

      window.alert(
        err instanceof Error
          ? err.message
          : "Failed to delete product solution"
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Website Content
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Product Solutions
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Manage the solutions displayed in the Products &
              Solutions section of the website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchSolutions}
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  loading ? "animate-spin" : ""
                }`}
              />
              Refresh
            </button>

            <Link
              href="/admin/product-solution/new"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <Plus className="h-4 w-4" />
              Add Product Solution
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            <span>{error}</span>

            <button
              type="button"
              onClick={fetchSolutions}
              className="shrink-0 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-slate-500" />

              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Loading product solutions...
              </p>
            </div>
          </div>
        ) : solutions.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <PackageOpen className="h-7 w-7 text-slate-500" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">
              No product solutions yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Create your first product solution. It will later be
              connected to the Products & Solutions section on the
              home page.
            </p>

            <Link
              href="/admin/product-solution/new"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950"
            >
              <Plus className="h-4 w-4" />
              Add Product Solution
            </Link>
          </div>
        ) : (
          /* Table */
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Order
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Solution
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Slug
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {solutions.map((solution) => (
                    <tr
                      key={solution.id}
                      className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/30"
                    >
                      {/* Order */}
                      <td className="whitespace-nowrap px-6 py-5 align-middle">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          {String(solution.order).padStart(2, "0")}
                        </span>
                      </td>

                      {/* Solution */}
                      <td className="px-6 py-5 align-middle">
                        <div className="max-w-md">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-slate-950 dark:text-white">
                              {solution.name}
                            </p>

                            {solution.projectTag && (
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {solution.projectTag}
                              </span>
                            )}
                          </div>

                          {solution.excerpt && (
                            <p className="mt-1 line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                              {solution.excerpt}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="whitespace-nowrap px-6 py-5 align-middle">
                        <code className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {solution.slug}
                        </code>
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-6 py-5 align-middle">
                        <span
                          className={
                            solution.isActive
                              ? "inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300"
                              : "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-500/10 dark:bg-slate-800 dark:text-slate-300"
                          }
                        >
                          {solution.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="whitespace-nowrap px-6 py-5 align-middle">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/product-solution/${solution.id}`}
                            title="Edit product solution"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>

                          <button
                            type="button"
                            title="Delete product solution"
                            onClick={() => handleDelete(solution)}
                            disabled={deletingId === solution.id}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/30"
                          >
                            {deletingId === solution.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {solutions.length}{" "}
                {solutions.length === 1
                  ? "product solution"
                  : "product solutions"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}