import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Download } from "lucide-react";
import { verifyAdminToken } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { DeleteApplicationButton } from "../../../../components/admin/delete-application-button";

export default async function AdminApplicationsPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_session")?.value;

  const payload = token ? verifyAdminToken(token) : null;

  if (!payload) {
    redirect("/admin/login");
  }

  const applications = await prisma.application.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Applications
      </h1>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Submissions from the Careers page &ldquo;Submit Your Details&rdquo;
        form.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-slate-100 text-xs uppercase text-slate-400 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Resume</th>
                <th className="px-6 py-3">Submitted</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    No applications yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-slate-50 last:border-0 dark:border-slate-800"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {app.firstName} {app.lastName}
                    </td>

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {app.email}
                    </td>

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {app.phone}
                    </td>

                    <td className="px-6 py-4">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-violet-600 hover:underline dark:text-violet-400"
                        >
                          <Download size={14} />
                          Download
                        </a>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {app.createdAt.toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <DeleteApplicationButton id={app.id} />
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