import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

import { verifyAdminToken } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { DeleteServiceButton } from "../delete-service-button";

export default async function AdminServicesPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_session")?.value;

  const payload = token ? verifyAdminToken(token) : null;

  if (!payload) {
    redirect("/admin/login");
  }

  const services = await prisma.service.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
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
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
        >
          <Plus size={16} />
          Add Service
        </Link>
      </div>

      {/* Services Table */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-slate-100 text-xs uppercase text-slate-400 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3">Title</th>

                <th className="px-6 py-3">Tag</th>

                <th className="px-6 py-3">Href</th>

                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    No services yet — click &ldquo;Add Service&rdquo; to
                    create one.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-slate-50 last:border-0 dark:border-slate-800"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {service.title}
                    </td>

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {service.tag}
                    </td>

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {service.href}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/services/${service.id}`}
                          className="text-violet-600 hover:underline dark:text-violet-400"
                        >
                          Edit
                        </Link>

                        <DeleteServiceButton id={service.id} />
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