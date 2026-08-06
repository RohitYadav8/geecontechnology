import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { verifyAdminToken } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";
import { AdminSidebar } from "../../sidebar";
import { AdminTopbar } from "../../topbar";
import { ServiceForm } from "../../service-form";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const payload = token ? verifyAdminToken(token) : null;
    if (!payload) redirect("/admin/login");

    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) notFound();

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <div className="flex flex-1 flex-col">
                <AdminTopbar adminName={payload.email} />
                <main className="flex-1 overflow-y-auto p-8">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Edit Service</h1>
                    <div className="mt-6">
                        <ServiceForm
                            initialValues={{
                                id: service.id,
                                tag: service.tag ?? "",
                                title: service.title,
                                description: service.description,
                                image: service.image,
                                href: service.href,
                                order: service.order,
                            }}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
