"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";

type BrochureFormProps = {
    productId?: string;
};

export function BrochureForm({
    productId,
}: BrochureFormProps) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        company: "",
        website: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange =
        (field: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setLoading(true);
            setSuccess("");
            setError("");

            const response = await fetch(
                "/api/brochure-requests",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...form,
                        productId: productId || null,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.error ||
                        "Failed to submit brochure request."
                );
            }

            setSuccess(
                "Request submitted successfully. We will contact you shortly."
            );

            setForm({
                name: "",
                phone: "",
                email: "",
                company: "",
                website: "",
            });
        } catch (err) {
            console.error(
                "Brochure request error:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2b4a] to-blue-600 p-6 text-white shadow-xl shadow-blue-900/20 dark:shadow-black/40"
        >
            <h3 className="text-lg font-semibold">
                Download Brochure
            </h3>

            <p className="mt-2 text-sm text-blue-100">
                Fill in your details below to download brochure.
            </p>

            {success && (
                <div className="mt-4 rounded-md bg-green-500/20 px-3 py-2 text-xs text-green-100">
                    {success}
                </div>
            )}

            {error && (
                <div className="mt-4 rounded-md bg-red-500/20 px-3 py-2 text-xs text-red-100">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="mt-5 space-y-3"
            >
                <div>
                    <label className="mb-1 block text-xs font-medium text-blue-100">
                        *Name:
                    </label>

                    <input
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange("name")}
                        className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-blue-200/60 focus:border-white/50"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-blue-100">
                        *Phone:
                    </label>

                    <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange("phone")}
                        className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-blue-200/60 focus:border-white/50"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-blue-100">
                        *Email:
                    </label>

                    <input
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange("email")}
                        className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-blue-200/60 focus:border-white/50"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-blue-100">
                        Company Name:
                    </label>

                    <input
                        type="text"
                        value={form.company}
                        onChange={handleChange("company")}
                        className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-blue-200/60 focus:border-white/50"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-blue-100">
                        Company Website:
                    </label>

                    <input
                        type="text"
                        value={form.website}
                        onChange={handleChange("website")}
                        className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-blue-200/60"
                    />
                </div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-white py-2.5 text-sm font-semibold text-[#1a2b4a] transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Download size={15} />

                    {loading
                        ? "SUBMITTING..."
                        : "DOWNLOAD"}
                </motion.button>
            </form>
        </motion.div>
    );
}