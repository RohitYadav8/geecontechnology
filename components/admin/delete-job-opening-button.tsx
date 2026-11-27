"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteJobOpeningButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Delete this job opening? This can't be undone.")) return;
        setLoading(true);
        const res = await fetch(`/api/admin/job-openings/${id}`, { method: "DELETE" });
        setLoading(false);
        if (res.ok) router.refresh();
        else alert("Failed to delete. Please try again.");
    };

    return (
        <button onClick={handleDelete} disabled={loading} className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20">
            <Trash2 size={14} />
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}
