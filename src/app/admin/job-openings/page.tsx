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
      <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
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

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              Job Openings
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-50/90">
              Manage your company job openings.
            </p>
          </div>

          <Link
            href="/admin/job-openings/new"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg shadow-violet-950/20 transition hover:-translate-y-0.5 sm:w-auto"
          >
            <Plus size={16} />
            Add Opening
          </Link>
        </div>
      </div>

      {/* Empty state */}
      {openings.length === 0 && (
        <div className="mt-6 rounded-[24px] border border-dashed border-violet-200 bg-white px-4 py-12 text-center shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:px-6 dark:border-violet-400/20 dark:bg-[#0b1220]">
          <div className="brand-grad mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
            <BriefcaseBusiness size={22} />
          </div>

          <h2 className="mt-4 text-base font-extrabold tracking-[-0.01em] text-slate-900 dark:text-white">
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
              className="rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-white shadow-md shadow-violet-500/20">
                    <BriefcaseBusiness size={17} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="break-words text-base font-bold text-slate-900 dark:text-white">
                      {opening.title}
                    </h2>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Building2 size={15} className="shrink-0 text-violet-500" />
                        <span className="break-words">
                          {opening.department || "No department"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <MapPin size={15} className="shrink-0 text-violet-500" />
                        <span className="break-words">
                          {opening.location || "No location"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    opening.isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400"
                  }`}
                >
                  {opening.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-4 dark:border-white/[0.06]">
                <Link
                  href={`/admin/job-openings/${opening.id}`}
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
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
        <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] md:block dark:border-white/[0.07] dark:bg-[#0b1220]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-400">
                <tr>
                  <th className="px-4 py-4 sm:px-5 lg:px-6">
                    Title
                  </th>

                  <th className="px-4 py-4 sm:px-5 lg:px-6">
                    Department
                  </th>

                  <th className="px-4 py-4 sm:px-5 lg:px-6">
                    Location
                  </th>

                  <th className="px-4 py-4 sm:px-5 lg:px-6">
                    Status
                  </th>

                  <th className="px-4 py-4 text-right sm:px-5 lg:px-6">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                {openings.map((opening) => (
                  <tr
                    key={opening.id}
                    className="transition-colors hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                  >
                    <td className="max-w-[260px] px-4 py-4 font-bold text-slate-900 sm:px-5 lg:px-6 dark:text-white">
                      <div className="flex items-center gap-3">
                        <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-white shadow-md shadow-violet-500/20">
                          <BriefcaseBusiness size={16} />
                        </div>

                        <span className="block min-w-0 break-words">
                          {opening.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-500 sm:px-5 lg:px-6 dark:text-slate-400">
                      {opening.department || "—"}
                    </td>

                    <td className="px-4 py-4 text-slate-500 sm:px-5 lg:px-6 dark:text-slate-400">
                      {opening.location || "—"}
                    </td>

                    <td className="px-4 py-4 sm:px-5 lg:px-6">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          opening.isActive
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400"
                        }`}
                      >
                        {opening.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-4 sm:px-5 lg:px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/job-openings/${opening.id}`}
                          className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
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
