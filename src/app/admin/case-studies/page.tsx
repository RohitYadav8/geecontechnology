import Link from "next/link";
import { Plus } from "lucide-react";

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
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Case Studies
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage all case studies displayed on the website.
          </p>
        </div>

        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <Plus size={16} />
          Add Case Study
        </Link>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-950">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Industry</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {caseStudies.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    No case studies found.
                  </td>
                </tr>
              ) : (
                caseStudies.map((study) => (
                  <tr
                    key={study.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    {/* Title */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {study.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {study.slug}
                        </p>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {study.clientName || "—"}
                    </td>

                    {/* Industry */}
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {study.industry || "—"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {study.isActive ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Order */}
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {study.order}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/case-studies/${study.id}`}
                          className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
                        >
                          Edit
                        </Link>

                        <Link
                          href={`/case-studies/${study.slug}`}
                          target="_blank"
                          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                          View
                        </Link>

                        <DeleteCaseStudyButton
                          id={study.id}
                          title={study.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}