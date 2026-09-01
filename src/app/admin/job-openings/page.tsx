import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Plus,
} from "lucide-react";

import { verifyAdminToken } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { DeleteJobOpeningButton } from "../../../../components/admin/delete-job-opening-button";

export default async function AdminJobOpeningsPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_session")?.value;
  const payload = token ? verifyAdminToken(token) : null;

  if (!payload) {
    redirect("/admin/login");
  }

  const openings = await prisma.jobOpening.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            Job Openings
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
            Manage your company job openings.
          </p>
        </div>

        <Link
          href="/admin/job-openings/new"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 sm:w-auto"
        >
          <Plus size={16} />
          Add Opening
        </Link>
      </div>

      {/* Empty state */}
      {openings.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center shadow-sm sm:px-6 dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <BriefcaseBusiness size={22} />
          </div>

          <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
            No job openings yet
          </h2>

          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Click &ldquo;Add Opening&rdquo; to create your first job opening.
          </p>
        </div>
      )}

      {/* Mobile cards */}
      {openings.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4 md:hidden">
          {openings.map((opening) => (
            <div
              key={opening.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="break-words text-base font-semibold text-slate-900 dark:text-white">
                    {opening.title}
                  </h2>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Building2 size={15} className="shrink-0" />
                      <span className="break-words">
                        {opening.department || "No department"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <MapPin size={15} className="shrink-0" />
                      <span className="break-words">
                        {opening.location || "No location"}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    opening.isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {opening.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-end gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                <Link
                  href={`/admin/job-openings/${opening.id}`}
                  className="text-sm font-medium text-violet-600 transition hover:text-violet-500 hover:underline dark:text-violet-400"
                >
                  Edit
                </Link>

                <DeleteJobOpeningButton id={opening.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop / Tablet table */}
      {openings.length > 0 && (
        <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block dark:border-slate-800 dark:bg-slate-900">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:bg-slate-950">
                <tr>
                  <th className="px-4 py-3 sm:px-5 lg:px-6">
                    Title
                  </th>

                  <th className="px-4 py-3 sm:px-5 lg:px-6">
                    Department
                  </th>

                  <th className="px-4 py-3 sm:px-5 lg:px-6">
                    Location
                  </th>

                  <th className="px-4 py-3 sm:px-5 lg:px-6">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right sm:px-5 lg:px-6">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {openings.map((opening) => (
                  <tr
                    key={opening.id}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-white/[0.02]"
                  >
                    <td className="max-w-[260px] px-4 py-4 font-medium text-slate-900 sm:px-5 lg:px-6 dark:text-white">
                      <span className="block break-words">
                        {opening.title}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-slate-500 sm:px-5 lg:px-6 dark:text-slate-400">
                      {opening.department || "—"}
                    </td>

                    <td className="px-4 py-4 text-slate-500 sm:px-5 lg:px-6 dark:text-slate-400">
                      {opening.location || "—"}
                    </td>

                    <td className="px-4 py-4 sm:px-5 lg:px-6">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          opening.isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {opening.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-4 sm:px-5 lg:px-6">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/job-openings/${opening.id}`}
                          className="font-medium text-violet-600 transition hover:text-violet-500 hover:underline dark:text-violet-400"
                        >
                          Edit
                        </Link>

                        <DeleteJobOpeningButton id={opening.id} />
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