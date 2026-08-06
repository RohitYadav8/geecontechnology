"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RippleButton } from "../../../components/ripple-button";

interface ServiceFormValues {
    id?: string;
    tag: string;
    title: string;
    description: string;
    image: string;
    href: string;
    order: number;
}

const emptyForm: ServiceFormValues = { tag: "", title: "", description: "", image: "", href: "", order: 0 };

export function ServiceForm({ initialValues }: { initialValues?: ServiceFormValues }) {
    const router = useRouter();
    const [form, setForm] = useState<ServiceFormValues>(initialValues ?? emptyForm);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const isEditing = Boolean(initialValues?.id);

    const handleChange =
        (field: keyof ServiceFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        const url = isEditing ? `/api/admin/services/${initialValues!.id}` : "/api/admin/services";
        const method = isEditing ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        setSaving(false);

        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Something went wrong.");
            return;
        }

        router.push("/admin/services");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Tag</label>
                <input
                    type="text"
                    value={form.tag}
                    onChange={handleChange("tag")}
                    placeholder="e.g. Cloud Services"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Title *</label>
                <input
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange("title")}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Description *
                </label>
                <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={handleChange("description")}
                    className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Image path *
                </label>
                <input
                    type="text"
                    required
                    value={form.image}
                    onChange={handleChange("image")}
                    placeholder="/service-grid.png"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
                <p className="mt-1 text-xs text-slate-400">
                    Path relative to /public. Upload/Media Library support can be added later.
                </p>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Link (href) *
                </label>
                <input
                    type="text"
                    required
                    value={form.href}
                    onChange={handleChange("href")}
                    placeholder="/cloud-services"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Display order
                </label>
                <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm((prev) => ({ ...prev, order: Number(e.target.value) }))}
                    className="w-32 rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
            </div>

            {error && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
                    {error}
                </p>
            )}

            <RippleButton
                type="submit"
                className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
            >
                {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Service"}
            </RippleButton>
        </form>
    );
}
