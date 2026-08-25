import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Download,
  FileText,
} from "lucide-react";

import { verifyAdminToken } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { supabaseAdmin } from "../../../../lib/supabase-admin";

import { DeleteApplicationButton } from "../../../../components/admin/delete-application-button";

const SIGNED_URL_EXPIRY = 60 * 5; // 5 minutes

function isExternalUrl(value: string) {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://")
  );
}

function isLegacyLocalResume(value: string) {
  return value.startsWith(
    "/uploads/resumes/"
  );
}

export default async function AdminApplicationsPage() {
  /* =====================================================
     ADMIN AUTH
  ===================================================== */

  const cookieStore = await cookies();

  const token =
    cookieStore.get(
      "admin_session"
    )?.value;

  const payload = token
    ? verifyAdminToken(token)
    : null;

  if (!payload) {
    redirect("/admin/login");
  }

  /* =====================================================
     FETCH APPLICATIONS
  ===================================================== */

  const applications =
    await prisma.application.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  /* =====================================================
     SUPABASE BUCKET
  ===================================================== */

  const bucketName =
    process.env
      .SUPABASE_RESUME_BUCKET ||
    "resume";

  /* =====================================================
     CREATE SECURE RESUME URLS

     New resumes:
     careers/xxx.pdf
        ↓
     temporary signed URL

     Old local resumes:
     /uploads/resumes/xxx.pdf
        ↓
     keep existing path
  ===================================================== */

  const applicationsWithResume =
    await Promise.all(
      applications.map(
        async (application) => {
          let secureResumeUrl:
            | string
            | null = null;

          if (
            application.resumeUrl
          ) {
            /*
             * Already complete URL.
             */
            if (
              isExternalUrl(
                application.resumeUrl
              )
            ) {
              secureResumeUrl =
                application.resumeUrl;
            }

            /*
             * Old local resume.
             */
            else if (
              isLegacyLocalResume(
                application.resumeUrl
              )
            ) {
              secureResumeUrl =
                application.resumeUrl;
            }

            /*
             * New Supabase private
             * storage path.
             */
            else {
              const {
                data,
                error,
              } =
                await supabaseAdmin.storage
                  .from(bucketName)
                  .createSignedUrl(
                    application.resumeUrl,
                    SIGNED_URL_EXPIRY
                  );

              if (error) {
                console.error(
                  `Failed to create resume signed URL for application ${application.id}:`,
                  error
                );
              }

              secureResumeUrl =
                data?.signedUrl ||
                null;
            }
          }

          return {
            ...application,
            secureResumeUrl,
          };
        }
      )
    );

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="w-full">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Applications
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Submissions from the Careers
          page &ldquo;Submit Your
          Details&rdquo; form.
        </p>
      </div>

      {/* TABLE */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:bg-slate-950/40">
              <tr>
                <th className="px-6 py-4">
                  Name
                </th>

                <th className="px-6 py-4">
                  Email
                </th>

                <th className="px-6 py-4">
                  Phone
                </th>

                <th className="px-6 py-4">
                  Resume
                </th>

                <th className="px-6 py-4">
                  Submitted
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {applicationsWithResume.length ===
              0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    No applications yet.
                  </td>
                </tr>
              ) : (
                applicationsWithResume.map(
                  (app) => (
                    <tr
                      key={app.id}
                      className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/60 dark:border-slate-800 dark:hover:bg-slate-800/30"
                    >
                      {/* NAME */}

                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-white">
                          {
                            app.firstName
                          }{" "}
                          {
                            app.lastName
                          }
                        </div>
                      </td>

                      {/* EMAIL */}

                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {app.email}
                      </td>

                      {/* PHONE */}

                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {app.phone}
                      </td>

                      {/* RESUME */}

                      <td className="px-6 py-4">
                        {app.secureResumeUrl ? (
                          <a
                            href={
                              app.secureResumeUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                          >
                            <FileText
                              size={
                                15
                              }
                            />

                            <span>
                              View
                              Resume
                            </span>

                            <Download
                              size={
                                13
                              }
                              className="transition-transform group-hover:translate-y-0.5"
                            />
                          </a>
                        ) : app.resumeUrl ? (
                          <span className="text-xs text-red-500">
                            Resume
                            unavailable
                          </span>
                        ) : (
                          <span className="text-slate-400">
                            —
                          </span>
                        )}
                      </td>

                      {/* CREATED */}

                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {app.createdAt.toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4 text-right">
                        <DeleteApplicationButton
                          id={app.id}
                        />
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}