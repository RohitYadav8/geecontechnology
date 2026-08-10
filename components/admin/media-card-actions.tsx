"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Trash2, Check } from "lucide-react";

export function MediaCardActions({ id, url }: { id: string; url: string }) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };

    const handleDelete = async () => {
        if (!confirm("Delete this file? This can't be undone.")) return;
        setDeleting(true);
        const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
        setDeleting(false);
        if (res.ok) router.refresh();
        else alert("Failed to delete. Please try again.");
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-white"
            >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy URL"}
            </button>
            <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-red-600 hover:bg-white disabled:opacity-50"
            >
                <Trash2 size={12} />
                {deleting ? "..." : "Delete"}
            </button>
        </div>
    );
}
