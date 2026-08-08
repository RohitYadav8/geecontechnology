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
        <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Media Library
                        </h1>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Manage all website images and media files.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        + Upload Media
                    </button>
                </div>

                {/* Filters */}
                <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">

                    <div className="flex flex-col gap-4 lg:flex-row">

                        {/* Search */}
                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search media..."
                            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />

                        {/* Type */}
                        <select
                            value={selectedType}
                            onChange={(e) =>
                                setSelectedType(e.target.value)
                            }
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
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
                                    className="h-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
                                />
                            )
                        )}
                    </div>
                ) : filteredMedia.length === 0 ? (
                    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">

                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
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
                                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                            >

                                {/* Image */}
                                <div className="relative h-48 bg-slate-100 dark:bg-slate-800">

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
                                <div className="p-4">

                                    <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                        {item.fileName}
                                    </h3>

                                    <div className="mt-2 flex items-center justify-between">

                                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
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