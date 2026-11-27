import Link from "next/link";

import {
  Plus,
  Building2,
  BriefcaseBusiness,
  ArrowUpRight,
} from "lucide-react";

import { prisma } from "../../../../lib/prisma";

import { DeleteCaseStudyButton } from "../../../../components/admin/delete-case-study-button";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              Case Studies
            </h1>

            <p className="mt-2 text-sm text-indigo-50/90">
              Manage all case studies displayed on the website.
            </p>
          </div>

          <Link
            href="/admin/case-studies/new"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg shadow-violet-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-50 sm:w-auto"
          >
            <Plus size={16} />
            Add Case Study
          </Link>
        </div>
      </div>

      {/* Empty state */}
      {caseStudies.length === 0 && (
        <div className="mt-6 rounded-[24px] border border-dashed border-violet-200 bg-white px-4 py-14 text-center shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:px-6 dark:border-white/[0.1] dark:bg-[#0b1220]">
          <div className="brand-grad mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
            <BriefcaseBusiness size={22} />
          </div>

          <h2 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            No case studies found
          </h2>

          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Create your first case study to display it on the website.
          </p>
        </div>
      )}

      {/* Mobile cards */}
      {caseStudies.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4 md:hidden">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]"
            >
              <div className="p-4">
                {/* Title + status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="break-words text-base font-bold text-slate-900 dark:text-white">
                      {study.title}
                    </h2>

                    <p className="mt-1 break-all font-mono text-xs text-slate-400 dark:text-slate-500">
                      {study.slug}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${study.isActive ? "bg-emerald-50 text-emerald-600 ring-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-100 text-slate-500 ring-slate-500/10 dark:bg-white/[0.05] dark:text-slate-400"}`}
                  >
                    {study.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                      <Building2 size={15} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Client
                      </p>

                      <p className="mt-0.5 break-words text-sm text-slate-600 dark:text-slate-300">
                        {study.clientName || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                      <BriefcaseBusiness size={15} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Industry
                      </p>

                      <p className="mt-0.5 break-words text-sm text-slate-600 dark:text-slate-300">
                        {study.industry || "—"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Order
                    </p>

                    <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                      {study.order}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]">
                <Link
                  href={`/admin/case-studies/${study.id}`}
                  className="brand-grad inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 transition-transform hover:-translate-y-0.5"
                >
                  Edit
                </Link>

                <Link
                  href={`/case-studies/${study.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-violet-300"
                >
                  View
                  <ArrowUpRight size={13} />
                </Link>

                <DeleteCaseStudyButton
                  id={study.id}
                  title={study.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tablet / Desktop table */}
      {caseStudies.length > 0 && (
        <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] md:block dark:border-white/[0.07] dark:bg-[#0b1220]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-400">
                <tr>
                  <th className="px-4 py-4 sm:px-5 lg:px-6">
                    Title
                  </th>

                  <th className="px-4 py-4 sm:px-5 lg:px-6">
                    Client
                  </th>

                  <th className="px-4 py-4 sm:px-5 lg:px-6">
                    Industry
                  </th>

                  <th className="px-4 py-4 sm:px-5 lg:px-6">
                    Status
                  </th>

                  <th className="px-4 py-4 sm:px-5 lg:px-6">
                    Order
                  </th>

                  <th className="px-4 py-4 text-right sm:px-5 lg:px-6">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                {caseStudies.map((study) => (
                  <tr
                    key={study.id}
                    className="transition-colors hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                  >
                    {/* Title */}
                    <td className="max-w-[300px] px-4 py-4 sm:px-5 lg:px-6">
                      <div className="min-w-0">
                        <p className="break-words font-bold text-slate-900 dark:text-white">
                          {study.title}
                        </p>

                        <p className="mt-1 break-all font-mono text-xs text-slate-400 dark:text-slate-500">
                          {study.slug}
                        </p>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-4 py-4 text-slate-500 sm:px-5 lg:px-6 dark:text-slate-400">
                      {study.clientName || "—"}
                    </td>

                    {/* Industry */}
                    <td className="px-4 py-4 text-slate-500 sm:px-5 lg:px-6 dark:text-slate-400">
                      {study.industry || "—"}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 sm:px-5 lg:px-6">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${study.isActive ? "bg-emerald-50 text-emerald-600 ring-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-100 text-slate-500 ring-slate-500/10 dark:bg-white/[0.05] dark:text-slate-400"}`}
                      >
                        {study.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Order */}
                    <td className="px-4 py-4 text-slate-500 sm:px-5 lg:px-6 dark:text-slate-400">
                      {study.order}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 sm:px-5 lg:px-6">
                      <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                        <Link
                          href={`/admin/case-studies/${study.id}`}
                          className="brand-grad inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 transition-transform hover:-translate-y-0.5"
                        >
                          Edit
                        </Link>

                        <Link
                          href={`/case-studies/${study.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-violet-300"
                        >
                          View
                          <ArrowUpRight size={13} />
                        </Link>

                        <DeleteCaseStudyButton
                          id={study.id}
                          title={study.title}
                        />
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
  );
}