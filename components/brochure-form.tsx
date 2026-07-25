"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";

export function BrochureForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", website: "" });

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2b4a] to-blue-600 p-6 text-white shadow-xl shadow-blue-900/20 dark:shadow-black/40"
    >
      <p className="text-center text-sm font-medium leading-relaxed text-blue-50">
        Fill in your details below to download brochure.
      </p>

      <form onSubmit={(e) => e.preventDefault()} className="mt-5 space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-blue-100">*Name:</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={handleChange("name")}
            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-blue-200/60 focus:border-white/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-blue-100">*Phone:</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={handleChange("phone")}
            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-blue-200/60 focus:border-white/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-blue-100">*Email:</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange("email")}
            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-blue-200/60 focus:border-white/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-blue-100">Company Name:</label>
          <input
            type="text"
            value={form.company}
            onChange={handleChange("company")}
            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-blue-200/60 focus:border-white/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-blue-100">Company Website:</label>
          <input
            type="text"
            value={form.website}
            onChange={handleChange("website")}
            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-blue-200/60 focus:border-white/50 focus:outline-none"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-white py-2.5 text-sm font-semibold text-[#1a2b4a] transition-colors hover:bg-blue-50"
        >
          <Download size={15} />
          DOWNLOAD
        </motion.button>
      </form>
    </motion.div>
  );
}