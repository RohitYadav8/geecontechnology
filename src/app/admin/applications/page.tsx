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
    <div className="w-full min-w-0">
      {/* HEADER */}

      <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 pb-20 pt-7 text-white sm:px-8 sm:pb-24 sm:pt-8">
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

        <div className="relative min-w-0">
          <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
            Applications
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-50/90">
            Submissions from the Careers
            page &ldquo;Submit Your
            Details&rdquo; form.
          </p>
        </div>
      </div>

      {/* TABLE */}

      <div className="relative z-10 -mt-12 px-3 sm:-mt-14 sm:px-5">
        <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-400">
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

              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                {applicationsWithResume.length ===
                0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-14 text-center font-medium text-slate-400"
                    >
                      No applications yet.
                    </td>
                  </tr>
                ) : (
                  applicationsWithResume.map(
                    (app) => (
                      <tr
                        key={app.id}
                        className="transition-colors hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                      >
                        {/* NAME */}

                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 dark:text-white">
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
                              className="group inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/20"
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
                            <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 dark:bg-red-500/10 dark:text-red-400">
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

                        <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
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
                          <div className="flex justify-end">
                            <DeleteApplicationButton
                              id={app.id}
                            />
                          </div>
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
    </div>
  );
}
