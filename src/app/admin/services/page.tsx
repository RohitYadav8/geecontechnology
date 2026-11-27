import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  Plus,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Layers,
} from "lucide-react";

import { verifyAdminToken } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

import { DeleteServiceButton } from "../delete-service-button";

export default async function AdminServicesPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("admin_session")?.value;

  const payload = token
    ? verifyAdminToken(token)
    : null;

  if (!payload) {
    redirect("/admin/login");
  }

  const services =
    await prisma.service.findMany({
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
              Services
            </h1>

            <p className="mt-1.5 text-sm text-indigo-50/90">
              Manage all your services from here.
            </p>
          </div>

          <Link
            href="/admin/services/new"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Plus size={16} />
            Add Service
          </Link>
        </div>
      </div>

      {/* Stats */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Total Services
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {services.length}
              </p>
            </div>

            <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <Layers size={19} />
            </div>
          </div>
        </div>

        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-emerald-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Active Services
              </p>

              <p className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-600 sm:text-4xl dark:text-emerald-400">
                {
                  services.filter(
                    (service) => service.isActive
                  ).length
                }
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <CheckCircle2 size={19} />
            </div>
          </div>
        </div>

        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 sm:col-span-2 xl:col-span-1 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-red-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Inactive Services
              </p>

              <p className="mt-3 text-3xl font-extrabold tracking-tight text-red-500 sm:text-4xl dark:text-red-400">
                {
                  services.filter(
                    (service) => !service.isActive
                  ).length
                }
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-rose-500 to-red-400 text-white shadow-lg shadow-red-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <XCircle size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}

      <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-400">
              <tr>
                <th className="px-6 py-4">
                  Title
                </th>

                <th className="px-6 py-4">
                  Slug
                </th>

                <th className="px-6 py-4">
                  Tag
                </th>

                <th className="px-6 py-4">
                  Href
                </th>

                <th className="px-6 py-4">
                  Order
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {services.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-14 text-center text-slate-400"
                  >
                    No services yet — click
                    &ldquo;Add Service&rdquo; to create one.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr
                    key={service.id}
                    className="transition-colors hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                  >
                    {/* Title */}

                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </div>

                      {service.description && (
                        <p className="mt-1 max-w-[280px] truncate text-xs text-slate-400">
                          {service.description}
                        </p>
                      )}
                    </td>

                    {/* Slug */}

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-violet-50 px-2 py-1 font-mono text-xs text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                        {service.slug}
                      </span>
                    </td>

                    {/* Tag */}

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {service.tag || "—"}
                    </td>

                    {/* Href */}

                    <td className="px-6 py-4">
                      <Link
                        href={service.href}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 font-medium text-violet-600 transition hover:text-violet-800 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
                      >
                        {service.href}

                        <ExternalLink size={13} />
                      </Link>
                    </td>

                    {/* Order */}

                    <td className="px-6 py-4">
                      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-bold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                        {service.order}
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      {service.isActive ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 ring-1 ring-emerald-200/70 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                          <CheckCircle2 size={13} />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-500 ring-1 ring-red-200/70 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20">
                          <XCircle size={13} />
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/services/${service.id}`}
                          className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300"
                        >
                          Edit
                        </Link>

                        <DeleteServiceButton
                          id={service.id}
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