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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            Case Studies
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
            Manage all case studies displayed on the website.
          </p>
        </div>

        <Link
          href="/admin/case-studies/new"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 sm:w-auto"
        >
          <Plus size={16} />
          Add Case Study
        </Link>
      </div>

      {/* Empty state */}
      {caseStudies.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center shadow-sm sm:px-6 dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <BriefcaseBusiness size={22} />
          </div>

          <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
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
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="p-4">
                {/* Title + status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="break-words text-base font-semibold text-slate-900 dark:text-white">
                      {study.title}
                    </h2>

                    <p className="mt-1 break-all text-xs text-slate-400 dark:text-slate-500">
                      {study.slug}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                      study.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {study.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Building2
                      size={15}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Client
                      </p>

                      <p className="mt-0.5 break-words text-sm text-slate-600 dark:text-slate-300">
                        {study.clientName || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <BriefcaseBusiness
                      size={15}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Industry
                      </p>

                      <p className="mt-0.5 break-words text-sm text-slate-600 dark:text-slate-300">
                        {study.industry || "—"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                      Order
                    </p>

                    <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                      {study.order}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 px-4 py-3 dark:border-slate-800">
                <Link
                  href={`/admin/case-studies/${study.id}`}
                  className="text-sm font-medium text-violet-600 transition hover:text-violet-500 hover:underline dark:text-violet-400"
                >
                  Edit
                </Link>

                <Link
                  href={`/case-studies/${study.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-500 hover:underline dark:text-blue-400"
                >
                  View
                  <ArrowUpRight size={14} />
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
        <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block dark:border-slate-800 dark:bg-slate-900">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
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

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {caseStudies.map((study) => (
                  <tr
                    key={study.id}
                    className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                  >
                    {/* Title */}
                    <td className="max-w-[300px] px-4 py-4 sm:px-5 lg:px-6">
                      <div className="min-w-0">
                        <p className="break-words font-medium text-slate-900 dark:text-white">
                          {study.title}
                        </p>

                        <p className="mt-1 break-all text-xs text-slate-400 dark:text-slate-500">
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
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          study.isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }`}
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
                      <div className="flex items-center justify-end gap-3 whitespace-nowrap">
                        <Link
                          href={`/admin/case-studies/${study.id}`}
                          className="text-sm font-medium text-violet-600 transition hover:text-violet-500 hover:underline dark:text-violet-400"
                        >
                          Edit
                        </Link>

                        <Link
                          href={`/case-studies/${study.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-500 hover:underline dark:text-blue-400"
                        >
                          View
                          <ArrowUpRight size={14} />
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