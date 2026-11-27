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
        return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";

      case "contacted":
        return "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300";

      case "downloaded":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";

      case "closed":
        return "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300";

      default:
        return "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300";
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

      <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 pb-20 pt-7 text-white sm:px-8 sm:pb-24 sm:pt-8">
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

        <div className="relative min-w-0">
          <Link
            href="/admin"
            className="inline-flex rounded-full border border-white/30 bg-white/[0.14] px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-xl transition hover:bg-white/25"
          >
            ← Back to Admin
          </Link>

          <h1 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
            Brochure Requests
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-50/90">
            Manage all brochure download requests.
          </p>
        </div>
      </div>

      {/* Total Requests */}

      <div className="relative z-10 -mt-12 mb-6 grid gap-4 px-3 sm:-mt-14 sm:grid-cols-2 sm:px-5 lg:grid-cols-3">
        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Total Requests
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {loading ? "..." : requests.length}
              </p>
            </div>

            <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <Download size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div className="mb-5 break-words rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 sm:px-5 sm:py-4 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {loading ? (
        <div className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-10 text-center shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-12 dark:border-white/[0.07] dark:bg-[#0b1220]">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600 dark:border-white/[0.08] dark:border-t-violet-400" />

          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading brochure requests...
          </p>
        </div>
      ) : requests.length === 0 ? (
        /* ================================================= */
        /* EMPTY */
        /* ================================================= */

        <div className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-10 text-center shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-12 dark:border-white/[0.07] dark:bg-[#0b1220]">
          <div className="brand-grad mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
            <Download size={24} />
          </div>

          <h2 className="mt-5 text-base font-extrabold tracking-[-0.01em] text-slate-900 sm:text-lg dark:text-white">
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
                className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]"
              >
                <div className="p-4">
                  {/* Name + Status */}

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="break-words text-base font-bold text-slate-900 dark:text-white">
                        {request.name}
                      </h2>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        {formatDate(
                          request.createdAt
                        )}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${getStatusClass(
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
                      className="flex min-w-0 items-start gap-2 text-sm font-medium text-violet-600 hover:underline dark:text-violet-300"
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
                      className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-violet-600 dark:text-slate-300 dark:hover:text-white"
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

                    <div className="rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        <Building2 size={14} className="text-violet-500" />
                        Company
                      </div>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {request.company || "—"}
                      </p>
                    </div>

                    {/* Product */}

                    <div className="rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        <Package size={14} className="text-violet-500" />
                        Product
                      </div>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-700 dark:text-slate-300">
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
                    <div className="mt-4 border-t border-slate-100 pt-4 dark:border-white/[0.06]">
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Website
                      </p>

                      <a
                        href={getWebsiteUrl(
                          request.website
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block break-all text-sm font-medium text-violet-600 transition hover:underline dark:text-violet-300"
                      >
                        {request.website}
                      </a>
                    </div>
                  )}
                </div>

                {/* Footer Date */}

                <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3 text-xs font-medium text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-400">
                  <CalendarDays size={14} className="text-violet-500" />
                  Requested on{" "}
                  {formatDate(request.createdAt)}
                </div>
              </div>
            ))}
          </div>

          {/* ================================================= */}
          {/* TABLET / DESKTOP TABLE */}
          {/* ================================================= */}

          <div className="hidden overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] md:block dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-4 lg:px-5">
                      Name
                    </th>

                    <th className="px-4 py-4 lg:px-5">
                      Contact
                    </th>

                    <th className="px-4 py-4 lg:px-5">
                      Company
                    </th>

                    <th className="px-4 py-4 lg:px-5">
                      Product
                    </th>

                    <th className="px-4 py-4 lg:px-5">
                      Status
                    </th>

                    <th className="px-4 py-4 lg:px-5">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="transition hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                    >
                      {/* Name */}

                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-white shadow-md shadow-violet-500/20">
                            <Download size={16} />
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 dark:text-white">
                              {request.name}
                            </p>

                            {request.website && (
                              <a
                                href={getWebsiteUrl(
                                  request.website
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 block max-w-[180px] truncate text-xs font-medium text-violet-600 hover:underline dark:text-violet-300"
                              >
                                {request.website}
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Contact */}

                      <td className="px-4 py-4 lg:px-5">
                        <div className="max-w-[240px] space-y-1">
                          <a
                            href={`mailto:${request.email}`}
                            className="block break-all text-sm font-medium text-violet-600 hover:underline dark:text-violet-300"
                          >
                            {request.email}
                          </a>

                          <a
                            href={`tel:${request.phone}`}
                            className="block text-sm text-slate-500 transition hover:text-violet-600 dark:text-slate-400 dark:hover:text-slate-200"
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
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
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
                          <span className="inline-flex rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                            General
                          </span>
                        )}
                      </td>

                      {/* Status */}

                      <td className="px-4 py-4 lg:px-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold capitalize ${getStatusClass(
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
