"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RippleButton } from "../ripple-button";

interface JobOpeningFormValues {
    id?: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    isActive: boolean;
    order: number;
}

const emptyForm: JobOpeningFormValues = {
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    isActive: true,
    order: 0,
};

export function JobOpeningForm({ initialValues }: { initialValues?: JobOpeningFormValues }) {
    const router = useRouter();
    const [form, setForm] = useState<JobOpeningFormValues>(initialValues ?? emptyForm);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const isEditing = Boolean(initialValues?.id);

    const handleChange = (field: keyof JobOpeningFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        const url = isEditing ? `/api/admin/job-openings/${initialValues!.id}` : "/api/admin/job-openings";
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

        router.push("/admin/job-openings");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-5 rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-8 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">Job Title *</label>
                <input
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange("title")}
                    placeholder="e.g. Senior React Developer"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">Department</label>
                    <input
                        type="text"
                        value={form.department}
                        onChange={handleChange("department")}
                        placeholder="e.g. Engineering"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">Location</label>
                    <input
                        type="text"
                        value={form.location}
                        onChange={handleChange("location")}
                        placeholder="e.g. Mumbai / Remote"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                    />
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">Employment Type</label>
                <select
                    value={form.type}
                    onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                </select>
            </div>

            <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">Description *</label>
                <textarea
                    required
                    rows={6}
                    value={form.description}
                    onChange={handleChange("description")}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                />
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">Display order</label>
                    <input
                        type="number"
                        value={form.order}
                        onChange={(e) => setForm((prev) => ({ ...prev, order: Number(e.target.value) }))}
                        className="w-28 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                    />
                </div>
                <label className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                        className="h-4 w-4 accent-violet-600"
                    />
                    Active (visible on Careers page)
                </label>
            </div>

            {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                    {error}
                </p>
            )}

            <RippleButton type="submit" className="brand-grad rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5">
                {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Opening"}
            </RippleButton>
        </form>
    );
}
