import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "../../../../../lib/auth";
import { AdminSidebar } from "../../sidebar";
import { AdminTopbar } from "../../topbar";
import { JobOpeningForm } from "../../../../../components/admin/job-opening-form";

export default async function NewJobOpeningPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const payload = token ? verifyAdminToken(token) : null;
    if (!payload) redirect("/admin/login");

    return (
        <div className="flex w-full min-w-0">
            <AdminSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <AdminTopbar adminName={payload.email} />
                <main className="min-w-0 flex-1 pt-4 sm:pt-5">
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
                        <h1 className="relative text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">Add Job Opening</h1>
                    </div>
                    <div className="relative z-10 -mt-12 px-3 sm:-mt-14 sm:px-5">
                        <JobOpeningForm />
                    </div>
                </main>
            </div>
        </div>
    );
}
