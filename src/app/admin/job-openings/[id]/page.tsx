import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { verifyAdminToken } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";
import { AdminSidebar } from "../../../../../components/admin/admin-sidebar";
import { AdminTopbar } from "../../../../../components/admin/admin-topbar";
import { JobOpeningForm } from "../../../../../components/admin/job-opening-form";

export default async function EditJobOpeningPage({ params }: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const payload = token ? verifyAdminToken(token) : null;
    if (!payload) redirect("/admin/login");

    const { id } = await params;
    const opening = await prisma.jobOpening.findUnique({ where: { id } });
    if (!opening) notFound();

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <div className="flex flex-1 flex-col">
                <AdminTopbar adminName={payload.email} />
                <main className="flex-1 overflow-y-auto p-8">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Edit Job Opening</h1>
                    <div className="mt-6">
                        <JobOpeningForm
                            initialValues={{
                                id: opening.id,
                                title: opening.title,
                                department: opening.department ?? "",
                                location: opening.location ?? "",
                                type: opening.type ?? "Full-time",
                                description: opening.description,
                                isActive: opening.isActive,
                                order: opening.order,
                            }}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
