"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 text-sm font-medium text-blue-600">
              Admin / Products
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Products
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage product cards, flip content and
              product detail pages.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchProducts}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              ↻ Refresh
            </button>

            <Link
              href="/admin/products/new"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              + Add Product
            </Link>
          </div>
        </div>

        {/* STATS */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Products
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {totalProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm dark:border-green-900/40 dark:bg-green-950/20">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Active Products
            </p>

            <p className="mt-2 text-3xl font-bold text-green-800 dark:text-green-300">
              {activeProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Inactive Products
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {inactiveProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm dark:border-blue-900/40 dark:bg-blue-950/20">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
              Card Content Added
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-800 dark:text-blue-300">
              {completedCards}
            </p>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* FILTER */}

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search product, slug, card content..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
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
          <div className="rounded-2xl border border-slate-200 bg-white p-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* EMPTY */

          <div className="rounded-2xl border border-slate-200 bg-white p-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl dark:bg-slate-800">
              📦
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
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
                className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                + Add Product
              </Link>
            )}
          </div>
        ) : (
          /* TABLE */

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Card Content
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
                          className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        >
                          {/* PRODUCT */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
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
                                <h3 className="font-semibold text-slate-900 dark:text-white">
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
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                  Front Ready
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                  Front Empty
                                </span>
                              )}

                              {flipReady ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400">
                                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                  Flip Ready
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                  Flip Empty
                                </span>
                              )}
                            </div>
                          </td>

                          {/* SLUG */}

                          <td className="px-6 py-5">
                            <code className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              {product.slug}
                            </code>
                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-5">
                            {product.isActive ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                Inactive
                              </span>
                            )}
                          </td>

                          {/* ORDER */}

                          <td className="px-6 py-5 text-sm font-medium text-slate-600 dark:text-slate-300">
                            {product.order}
                          </td>

                          {/* ACTIONS */}

                          <td className="px-6 py-5">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/products/${product.slug}`}
                                target="_blank"
                                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                              >
                                View
                              </Link>

                              <Link
                                href={`/admin/products/${product.id}/edit`}
                                className="rounded-xl border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-900/50 dark:hover:bg-blue-900/20"
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
                                className="rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20"
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