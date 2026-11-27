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
    <div className="w-full min-w-0">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

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
            Newsletter
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-50/90">
            Manage newsletter subscribers
            from your website.
          </p>
        </div>
      </div>

      {/* =================================================
          STATS
      ================================================= */}

      <div className="relative z-10 -mt-12 grid gap-4 px-3 sm:-mt-14 sm:grid-cols-2 sm:px-5 xl:grid-cols-3">
        {/* TOTAL */}

        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Total Subscribers
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {totalSubscribers}
              </p>
            </div>

            <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <Users size={19} />
            </div>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Active Subscribers
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {activeSubscribers}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <UserCheck size={19} />
            </div>
          </div>
        </div>

        {/* INACTIVE */}

        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Inactive Subscribers
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {inactiveSubscribers}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-rose-400 to-red-500 text-white shadow-lg shadow-red-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <UserX size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          SUBSCRIBERS TABLE
      ================================================= */}

      <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
        {/* TABLE HEADER */}

        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 dark:border-white/[0.06]">
          <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-white shadow-lg shadow-violet-500/25">
            <Mail size={17} />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white">
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
            <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-400">
              <tr>
                <th className="px-6 py-4">
                  #
                </th>

                <th className="px-6 py-4">
                  Email
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Subscribed On
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {subscribers.length ===
              0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-14 text-center"
                  >
                    <div className="brand-grad mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
                      <Mail
                        size={20}
                      />
                    </div>

                    <p className="mt-4 font-extrabold text-slate-900 dark:text-white">
                      No subscribers
                      yet.
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
                      className="transition-colors hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                    >
                      {/* NUMBER */}

                      <td className="px-6 py-4 font-semibold tabular-nums text-slate-400">
                        {index + 1}
                      </td>

                      {/* EMAIL */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-white shadow-md shadow-violet-500/20">
                            <Mail
                              size={
                                15
                              }
                            />
                          </div>

                          <span className="font-bold text-slate-900 dark:text-white">
                            {
                              subscriber.email
                            }
                          </span>
                        </div>
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">
                        {subscriber.isActive ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 dark:bg-red-500/10 dark:text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                            Inactive
                          </span>
                        )}
                      </td>

                      {/* DATE */}

                      <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
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
