"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

export function MediaUploadButton() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/media", { method: "POST", body: formData });

        setUploading(false);
        e.target.value = "";

        if (res.ok) {
            router.refresh();
        } else {
            const data = await res.json();
            alert(data.error || "Upload failed. Please try again.");
        }
    };

    return (
        <>
            <input ref={inputRef} type="file" onChange={handleFileSelect} className="hidden" accept="image/*,.pdf" />
            <button
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
            >
                <Upload size={16} />
                {uploading ? "Uploading..." : "Upload New File"}
            </button>
        </>
    );
}
