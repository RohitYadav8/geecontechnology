"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  EyeOff,
  LayoutGrid,
  Package,
} from "lucide-react";

type Product = {
  id: string;
  title: string;
  slug: string;

  bannerImage: string | null;
  logoImage: string | null;

  shortDescription: string | null;

  cardTagline: string | null;
  cardSecondaryText: string | null;

  flipEyebrow: string | null;
  flipTitle: string | null;
  flipDescription: string | null;

  isActive: boolean;
  order: number;
  createdAt: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  /* =====================================================
     FETCH PRODUCTS
  ===================================================== */

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/products", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to fetch products"
        );
      }

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch products error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =====================================================
     DELETE PRODUCT
  ===================================================== */

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/products/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to delete product"
        );
      }

      setProducts((current) =>
        current.filter((product) => product.id !== id)
      );
    } catch (err) {
      console.error("Delete product error:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Failed to delete product"
      );
    }
  };

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.slug.toLowerCase().includes(query) ||
        product.shortDescription
          ?.toLowerCase()
          .includes(query) ||
        product.cardTagline
          ?.toLowerCase()
          .includes(query) ||
        product.flipTitle
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" &&
          product.isActive) ||
        (statusFilter === "inactive" &&
          !product.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  /* =====================================================
     STATS
  ===================================================== */

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.isActive
  ).length;

  const inactiveProducts =
    totalProducts - activeProducts;

  const completedCards = products.filter(
    (product) =>
      product.cardTagline ||
      product.cardSecondaryText ||
      product.flipTitle ||
      product.flipDescription
  ).length;

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 pb-24 pt-7 text-white sm:px-8 sm:pb-28 sm:pt-8">
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

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex rounded-full border border-white/30 bg-white/[0.14] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                Admin / Products
              </div>

              <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                Products
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-indigo-50/90">
                Manage product cards, flip content and
                product detail pages.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={fetchProducts}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/[0.14] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/25 disabled:opacity-50"
              >
                ↻ Refresh
              </button>

              <Link
                href="/admin/products/new"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg transition hover:-translate-y-0.5"
              >
                + Add Product
              </Link>
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="relative z-10 -mt-16 mb-6 grid gap-4 px-3 sm:-mt-20 sm:grid-cols-2 sm:px-5 xl:grid-cols-4">
          <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Total Products
                </p>

                <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight">
                  {totalProducts}
                </p>
              </div>

              <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                <Package size={19} />
              </div>
            </div>
          </div>

          <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Active Products
                </p>

                <p className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
                  {activeProducts}
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/25">
                <CheckCircle2 size={19} />
              </div>
            </div>
          </div>

          <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Inactive Products
                </p>

                <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {inactiveProducts}
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-300">
                <EyeOff size={19} />
              </div>
            </div>
          </div>

          <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Card Content Added
                </p>

                <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight">
                  {completedCards}
                </p>
              </div>

              <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                <LayoutGrid size={19} />
              </div>
            </div>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}

        {/* FILTER */}

        <div className="mb-5 rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search product, slug, card content..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | "all"
                    | "active"
                    | "inactive"
                )
              }
              className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-semibold text-slate-700 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200"
            >
              <option value="all">
                All Status
              </option>

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="rounded-[24px] border border-slate-200/80 bg-white p-14 text-center shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600 dark:border-white/10 dark:border-t-violet-400" />

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* EMPTY */

          <div className="rounded-[24px] border border-slate-200/80 bg-white p-14 text-center shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="brand-grad mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] text-2xl shadow-lg shadow-violet-500/25">
              📦
            </div>

            <h2 className="mt-5 text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
              No products found
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {search
                ? "Try changing your search or filter."
                : "Start by adding your first product."}
            </p>

            {!search && (
              <Link
                href="/admin/products/new"
                className="brand-grad mt-5 inline-flex rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5"
              >
                + Add Product
              </Link>
            )}
          </div>
        ) : (
          /* TABLE */

          <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead className="border-b border-slate-100 bg-slate-50/80 dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      Card Content
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      Slug
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      Order
                    </th>

                    <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                  {filteredProducts.map(
                    (product) => {
                      const frontReady =
                        Boolean(
                          product.cardTagline ||
                            product.cardSecondaryText
                        );

                      const flipReady =
                        Boolean(
                          product.flipEyebrow ||
                            product.flipTitle ||
                            product.flipDescription
                        );

                      return (
                        <tr
                          key={product.id}
                          className="transition hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                        >
                          {/* PRODUCT */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-[14px] border border-slate-200/80 bg-slate-50 dark:border-white/[0.08] dark:bg-white/[0.04]">
                                {product.bannerImage ? (
                                  <img
                                    src={
                                      product.bannerImage
                                    }
                                    alt={
                                      product.title
                                    }
                                    className="h-full w-full object-contain"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                    No image
                                  </div>
                                )}

                                {/* SMALL LOGO */}

                                {product.logoImage && (
                                  <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-white bg-white p-1 shadow">
                                    <img
                                      src={
                                        product.logoImage
                                      }
                                      alt={`${product.title} logo`}
                                      className="h-full w-full object-contain"
                                    />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <h3 className="font-bold text-slate-950 dark:text-white">
                                  {
                                    product.title
                                  }
                                </h3>

                                {product.shortDescription && (
                                  <p className="mt-1 max-w-xs truncate text-xs text-slate-500 dark:text-slate-400">
                                    {
                                      product.shortDescription
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* CARD CONTENT STATUS */}

                          <td className="px-6 py-5">
                            <div className="flex flex-col items-start gap-2">
                              {frontReady ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                                  Front Ready
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                                  Front Empty
                                </span>
                              )}

                              {flipReady ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                                  Flip Ready
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                                  Flip Empty
                                </span>
                              )}
                            </div>
                          </td>

                          {/* SLUG */}

                          <td className="px-6 py-5">
                            <code className="rounded-lg bg-violet-50/70 px-2.5 py-1.5 text-xs font-semibold text-violet-700 dark:bg-white/[0.06] dark:text-violet-300">
                              {product.slug}
                            </code>
                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-5">
                            {product.isActive ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-600 dark:bg-white/[0.06] dark:text-slate-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                Inactive
                              </span>
                            )}
                          </td>

                          {/* ORDER */}

                          <td className="px-6 py-5 text-sm font-bold text-slate-600 dark:text-slate-300">
                            {product.order}
                          </td>

                          {/* ACTIONS */}

                          <td className="px-6 py-5">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/products/${product.slug}`}
                                target="_blank"
                                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
                              >
                                View
                              </Link>

                              <Link
                                href={`/admin/products/${product.id}/edit`}
                                className="brand-grad rounded-xl px-3 py-2 text-xs font-bold text-white shadow-md shadow-violet-500/25 transition hover:-translate-y-0.5"
                              >
                                Edit
                              </Link>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    product.id
                                  )
                                }
                                className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}