import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

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
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                        Job Openings
                    </h1>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Manage your company job openings.
                    </p>
                </div>

                <Link
                    href="/admin/job-openings/new"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                    <Plus size={16} />
                    Add Opening
                </Link>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left text-sm">
                        <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-400 dark:border-slate-800 dark:bg-slate-950">
                            <tr>
                                <th className="px-6 py-3">
                                    Title
                                </th>

                                <th className="px-6 py-3">
                                    Department
                                </th>

                                <th className="px-6 py-3">
                                    Location
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
                            {openings.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-10 text-center text-slate-400"
                                    >
                                        No job openings yet — click
                                        &ldquo;Add Opening&rdquo; to create
                                        one.
                                    </td>
                                </tr>
                            )}

                            {openings.map((opening) => (
                                <tr
                                    key={opening.id}
                                    className="border-b border-slate-50 last:border-0 dark:border-slate-800"
                                >
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                        {opening.title}
                                    </td>

                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                        {opening.department || "—"}
                                    </td>

                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                        {opening.location || "—"}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                opening.isActive
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                            }`}
                                        >
                                            {opening.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-3">
                                            <Link
                                                href={`/admin/job-openings/${opening.id}`}
                                                className="text-violet-600 hover:underline dark:text-violet-400"
                                            >
                                                Edit
                                            </Link>

                                            <DeleteJobOpeningButton
                                                id={opening.id}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}