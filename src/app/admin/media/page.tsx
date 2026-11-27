"use client";

import { useEffect, useState } from "react";

type Media = {
    id: string;
    fileName: string;
    url: string;
    type: string;
    folder: string | null;
    altText: string | null;
    relatedId: string | null;
    createdAt: string;
};

const mediaTypes = [
    "ALL",
    "PRODUCT",
    "SERVICE",
    "BLOG",
    "BANNER",
    "CLIENT",
    "TEAM",
    "PROJECT",
    "PAGE",
    "COMMON",
    "OTHER",
];

export default function MediaLibraryPage() {
    const [media, setMedia] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("ALL");

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/admin/media");

            if (!response.ok) {
                throw new Error("Failed to fetch media");
            }

            const data = await response.json();

            setMedia(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setError("Failed to load media");
        } finally {
            setLoading(false);
        }
    };

    const filteredMedia = media.filter((item) => {
        const matchesSearch = item.fileName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesType =
            selectedType === "ALL" ||
            item.type === selectedType;

        return matchesSearch && matchesType;
    });

    return (
        <div className="w-full min-w-0">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
                    <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.07]" />
                <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                        <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                            Media Library
                        </h1>

                        <p className="mt-1 text-sm text-indigo-50/90">
                            Manage all website images and media files.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg shadow-violet-900/20 transition hover:-translate-y-0.5"
                    >
                        + Upload Media
                    </button>
                </div>
                </div>

                {/* Filters */}
                <div className="mt-6 p-4 sm:p-5 rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">

                    <div className="flex flex-col gap-4 lg:flex-row">

                        {/* Search */}
                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search media..."
                            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.06]"
                        />

                        {/* Type */}
                        <select
                            value={selectedType}
                            onChange={(e) =>
                                setSelectedType(e.target.value)
                            }
                            className="lg:w-56 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.06]"
                        >
                            {mediaTypes.map((type) => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type === "ALL"
                                        ? "All Media"
                                        : type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="h-64 animate-pulse rounded-[24px] bg-slate-200/80 dark:bg-white/[0.05]"
                                />
                            )
                        )}
                    </div>
                ) : filteredMedia.length === 0 ? (
                    <div className="mt-8 p-12 text-center rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                        <div className="brand-grad mx-auto mb-4 h-14 w-14 rounded-[16px] shadow-lg shadow-violet-500/25" />

                        <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white">
                            No media found
                        </h2>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Upload images to start building your media library.
                        </p>

                    </div>
                ) : (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                        {filteredMedia.map((item) => (
                            <div
                                key={item.id}
                                className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-2.5 shadow-[0_20px_50px_-40px_rgba(15,23,42,.45)] transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25"
                            >

                                {/* Image */}
                                <div className="relative h-48 overflow-hidden rounded-[18px] bg-slate-50 dark:bg-white/[0.04]">

                                    <img
                                        src={item.url}
                                        alt={
                                            item.altText ||
                                            item.fileName
                                        }
                                        className="h-full w-full object-contain p-3"
                                    />

                                </div>

                                {/* Info */}
                                <div className="px-2 pb-2 pt-3.5">

                                    <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                        {item.fileName}
                                    </h3>

                                    <div className="mt-2 flex items-center justify-between">

                                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                                            {item.type}
                                        </span>

                                        {item.folder && (
                                            <span className="max-w-[130px] truncate text-xs text-slate-400">
                                                {item.folder}
                                            </span>
                                        )}

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}