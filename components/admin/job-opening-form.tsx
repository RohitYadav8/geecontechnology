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
        <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Job Title *</label>
                <input
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange("title")}
                    placeholder="e.g. Senior React Developer"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
                    <input
                        type="text"
                        value={form.department}
                        onChange={handleChange("department")}
                        placeholder="e.g. Engineering"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                    <input
                        type="text"
                        value={form.location}
                        onChange={handleChange("location")}
                        placeholder="e.g. Mumbai / Remote"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Employment Type</label>
                <select
                    value={form.type}
                    onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                </select>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Description *</label>
                <textarea
                    required
                    rows={6}
                    value={form.description}
                    onChange={handleChange("description")}
                    className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
            </div>

            <div className="flex items-center gap-6">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Display order</label>
                    <input
                        type="number"
                        value={form.order}
                        onChange={(e) => setForm((prev) => ({ ...prev, order: Number(e.target.value) }))}
                        className="w-28 rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                </div>
                <label className="mt-6 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                        className="h-4 w-4"
                    />
                    Active (visible on Careers page)
                </label>
            </div>

            {error && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
                    {error}
                </p>
            )}

            <RippleButton type="submit" className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
                {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Opening"}
            </RippleButton>
        </form>
    );
}
