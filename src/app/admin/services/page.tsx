import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  Plus,
  ExternalLink,
  CheckCircle2,
  XCircle,
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
    <div className="w-full">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Services
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage all your services from here.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
        >
          <Plus size={16} />
          Add Service
        </Link>
      </div>

      {/* Stats */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Services
          </p>

          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
            {services.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Active Services
          </p>

          <p className="mt-2 text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
            {
              services.filter(
                (service) => service.isActive
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Inactive Services
          </p>

          <p className="mt-2 text-3xl font-semibold text-red-500 dark:text-red-400">
            {
              services.filter(
                (service) => !service.isActive
              ).length
            }
          </p>
        </div>
      </div>

      {/* Services Table */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:bg-white/[0.02]">
              <tr>
                <th className="px-6 py-3">
                  Title
                </th>

                <th className="px-6 py-3">
                  Slug
                </th>

                <th className="px-6 py-3">
                  Tag
                </th>

                <th className="px-6 py-3">
                  Href
                </th>

                <th className="px-6 py-3">
                  Order
                </th>

                <th className="px-6 py-3">
                  Status
                </th>

                <th className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    No services yet — click
                    &ldquo;Add Service&rdquo; to create one.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-white/[0.02]"
                  >
                    {/* Title */}

                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">
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
                      <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
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
                        className="inline-flex items-center gap-1.5 text-violet-600 hover:underline dark:text-violet-400"
                      >
                        {service.href}

                        <ExternalLink size={13} />
                      </Link>
                    </td>

                    {/* Order */}

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {service.order}
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      {service.isActive ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <CheckCircle2 size={13} />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500 dark:bg-red-500/10 dark:text-red-400">
                          <XCircle size={13} />
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/services/${service.id}`}
                          className="text-violet-600 hover:underline dark:text-violet-400"
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