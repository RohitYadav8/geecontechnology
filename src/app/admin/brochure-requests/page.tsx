"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  CalendarDays,
  Download,
  Mail,
  Phone,
  Package,
} from "lucide-react";

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
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getStatusClass = (
    status: string
  ) => {
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

  const getWebsiteUrl = (
    website: string
  ) => {
    return website.startsWith("http")
      ? website
      : `https://${website}`;
  };

  return (
    <div className="w-full min-w-0">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <Link
            href="/admin"
            className="inline-flex text-xs font-medium text-blue-600 transition hover:text-blue-700 sm:text-sm dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Admin
          </Link>

          <h1 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl dark:text-white">
            Brochure Requests
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
            Manage all brochure download requests.
          </p>
        </div>

        {/* Total Requests */}

        <div className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:w-auto sm:min-w-[170px] sm:px-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total Requests
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {loading ? "..." : requests.length}
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div className="mb-5 break-words rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:px-5 sm:py-4 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center shadow-sm sm:p-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Loading brochure requests...
          </p>
        </div>
      ) : requests.length === 0 ? (
        /* ================================================= */
        /* EMPTY */
        /* ================================================= */

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center shadow-sm sm:p-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            <Download size={24} />
          </div>

          <h2 className="mt-5 text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
            No brochure requests
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Brochure requests will appear here when
            users submit the brochure form.
          </p>
        </div>
      ) : (
        <>
          {/* ================================================= */}
          {/* MOBILE CARDS */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {requests.map((request) => (
              <div
                key={request.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="p-4">
                  {/* Name + Status */}

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="break-words text-base font-semibold text-slate-900 dark:text-white">
                        {request.name}
                      </h2>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        {formatDate(
                          request.createdAt
                        )}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>

                  {/* Contact */}

                  <div className="mt-4 space-y-3">
                    <a
                      href={`mailto:${request.email}`}
                      className="flex min-w-0 items-start gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                      <Mail
                        size={15}
                        className="mt-0.5 shrink-0"
                      />

                      <span className="min-w-0 break-all">
                        {request.email}
                      </span>
                    </a>

                    <a
                      href={`tel:${request.phone}`}
                      className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                      <Phone
                        size={15}
                        className="shrink-0"
                      />

                      <span className="break-words">
                        {request.phone}
                      </span>
                    </a>
                  </div>

                  {/* Details */}

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Company */}

                    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950/60">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                        <Building2 size={14} />
                        Company
                      </div>

                      <p className="mt-1 break-words text-sm font-medium text-slate-700 dark:text-slate-300">
                        {request.company || "—"}
                      </p>
                    </div>

                    {/* Product */}

                    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950/60">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                        <Package size={14} />
                        Product
                      </div>

                      <p className="mt-1 break-words text-sm font-medium text-slate-700 dark:text-slate-300">
                        {request.product
                          ? request.product.title
                          : "General"}
                      </p>

                      {request.product && (
                        <p className="mt-1 break-all text-xs text-slate-400">
                          {request.product.slug}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Website */}

                  {request.website && (
                    <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                      <p className="mb-1 text-xs font-medium text-slate-400">
                        Website
                      </p>

                      <a
                        href={getWebsiteUrl(
                          request.website
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block break-all text-sm text-blue-600 transition hover:underline dark:text-blue-400"
                      >
                        {request.website}
                      </a>
                    </div>
                  )}
                </div>

                {/* Footer Date */}

                <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-400">
                  <CalendarDays size={14} />
                  Requested on{" "}
                  {formatDate(request.createdAt)}
                </div>
              </div>
            ))}
          </div>

          {/* ================================================= */}
          {/* TABLET / DESKTOP TABLE */}
          {/* ================================================= */}

          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block dark:border-slate-800 dark:bg-slate-900">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                  <tr>
                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-5">
                      Name
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-5">
                      Contact
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-5">
                      Company
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-5">
                      Product
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-5">
                      Status
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-5">
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

                      <td className="px-4 py-4 lg:px-5">
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {request.name}
                          </p>

                          {request.website && (
                            <a
                              href={getWebsiteUrl(
                                request.website
                              )}
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

                      <td className="px-4 py-4 lg:px-5">
                        <div className="max-w-[240px] space-y-1">
                          <a
                            href={`mailto:${request.email}`}
                            className="block break-all text-sm text-blue-600 hover:underline dark:text-blue-400"
                          >
                            {request.email}
                          </a>

                          <a
                            href={`tel:${request.phone}`}
                            className="block text-sm text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          >
                            {request.phone}
                          </a>
                        </div>
                      </td>

                      {/* Company */}

                      <td className="px-4 py-4 lg:px-5">
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {request.company || "—"}
                        </span>
                      </td>

                      {/* Product */}

                      <td className="px-4 py-4 lg:px-5">
                        {request.product ? (
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {
                                request.product
                                  .title
                              }
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {
                                request.product
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

                      <td className="px-4 py-4 lg:px-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </td>

                      {/* Date */}

                      <td className="px-4 py-4 lg:px-5">
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
        </>
      )}
    </div>
  );
}