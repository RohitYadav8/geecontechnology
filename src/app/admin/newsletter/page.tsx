import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  Mail,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

import { prisma } from "../../../../lib/prisma";
import { verifyAdminToken } from "../../../../lib/auth";

export default async function AdminNewsletterPage() {
  // =====================================================
  // ADMIN AUTHENTICATION
  // =====================================================

  const cookieStore = await cookies();

  const token =
    cookieStore.get("admin_session")?.value;

  const payload = token
    ? verifyAdminToken(token)
    : null;

  if (!payload) {
    redirect("/admin/login");
  }

  // =====================================================
  // GET NEWSLETTER SUBSCRIBERS
  // =====================================================

  const subscribers =
    await prisma.newsletterSubscriber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  // =====================================================
  // STATS
  // =====================================================

  const totalSubscribers =
    subscribers.length;

  const activeSubscribers =
    subscribers.filter(
      (subscriber) =>
        subscriber.isActive
    ).length;

  const inactiveSubscribers =
    subscribers.filter(
      (subscriber) =>
        !subscriber.isActive
    ).length;

  return (
    <div className="w-full">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Newsletter
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage newsletter subscribers
          from your website.
        </p>
      </div>

      {/* =================================================
          STATS
      ================================================= */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* TOTAL */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Subscribers
              </p>

              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                {totalSubscribers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <Users size={20} />
            </div>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Active Subscribers
              </p>

              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                {activeSubscribers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <UserCheck size={20} />
            </div>
          </div>
        </div>

        {/* INACTIVE */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Inactive Subscribers
              </p>

              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                {inactiveSubscribers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
              <UserX size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          SUBSCRIBERS TABLE
      ================================================= */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {/* TABLE HEADER */}

        <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <Mail size={17} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Subscribers
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              People subscribed through
              the website footer.
            </p>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:bg-white/[0.02]">
              <tr>
                <th className="px-6 py-3">
                  #
                </th>

                <th className="px-6 py-3">
                  Email
                </th>

                <th className="px-6 py-3">
                  Status
                </th>

                <th className="px-6 py-3">
                  Subscribed On
                </th>
              </tr>
            </thead>

            <tbody>
              {subscribers.length ===
              0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-14 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/[0.05]">
                      <Mail
                        size={20}
                      />
                    </div>

                    <p className="mt-3 font-medium text-slate-600 dark:text-slate-300">
                      No subscribers
                      yet.
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Newsletter
                      subscribers will
                      appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                subscribers.map(
                  (
                    subscriber,
                    index
                  ) => (
                    <tr
                      key={
                        subscriber.id
                      }
                      className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-white/[0.02]"
                    >
                      {/* NUMBER */}

                      <td className="px-6 py-4 text-slate-400">
                        {index + 1}
                      </td>

                      {/* EMAIL */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                            <Mail
                              size={
                                15
                              }
                            />
                          </div>

                          <span className="font-medium text-slate-900 dark:text-white">
                            {
                              subscriber.email
                            }
                          </span>
                        </div>
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">
                        {subscriber.isActive ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500 dark:bg-red-500/10 dark:text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                            Inactive
                          </span>
                        )}
                      </td>

                      {/* DATE */}

                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {subscriber.subscribedAt.toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month:
                              "short",
                            year: "numeric",
                          }
                        )}
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