"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteApplicationButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Delete this application? This can't be undone.")) return;
        setLoading(true);
        const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
        setLoading(false);
        if (res.ok) router.refresh();
        else alert("Failed to delete. Please try again.");
    };

    return (
        <button onClick={handleDelete} disabled={loading} className="flex items-center gap-1 text-red-500 hover:underline disabled:opacity-50">
            <Trash2 size={14} />
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}
