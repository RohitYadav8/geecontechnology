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
    <div className="w-full min-w-0">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="brand-grad relative mb-8 overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="mb-3 inline-flex rounded-full border border-white/30 bg-white/[0.14] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
              Website Content
            </p>

            <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              Product Solutions
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-50/90">
              Manage the solutions displayed in the Products &
              Solutions section of the website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={fetchSolutions}
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/[0.14] px-4 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60"
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
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-violet-700 shadow-lg transition hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" />
              Add Product Solution
            </Link>
          </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
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
          <div className="flex min-h-[350px] items-center justify-center rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-500" />

              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Loading product solutions...
              </p>
            </div>
          </div>
        ) : solutions.length === 0 ? (
          /* Empty State */
          <div className="rounded-[24px] border border-dashed border-violet-200 bg-white px-6 py-16 text-center shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.1] dark:bg-[#0b1220]">
            <div className="brand-grad mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
              <PackageOpen className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
              No product solutions yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Create your first product solution. It will later be
              connected to the Products & Solutions section on the
              home page.
            </p>

            <Link
              href="/admin/product-solution/new"
              className="brand-grad mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" />
              Add Product Solution
            </Link>
          </div>
        ) : (
          /* Table */
          <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-slate-100 bg-slate-50/80 dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Order
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Solution
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Slug
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                  {solutions.map((solution) => (
                    <tr
                      key={solution.id}
                      className="transition hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                    >
                      {/* Order */}
                      <td className="whitespace-nowrap px-6 py-5 align-middle">
                        <span className="brand-text text-sm font-extrabold">
                          {String(solution.order).padStart(2, "0")}
                        </span>
                      </td>

                      {/* Solution */}
                      <td className="px-6 py-5 align-middle">
                        <div className="max-w-md">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-slate-950 dark:text-white">
                              {solution.name}
                            </p>

                            {solution.projectTag && (
                              <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
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
                        <code className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                          {solution.slug}
                        </code>
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-6 py-5 align-middle">
                        <span
                          className={
                            solution.isActive
                              ? "inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                              : "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-inset ring-slate-500/10 dark:bg-white/[0.06] dark:text-slate-300"
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
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:text-violet-300"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>

                          <button
                            type="button"
                            title="Delete product solution"
                            onClick={() => handleDelete(solution)}
                            disabled={deletingId === solution.id}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
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
            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
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