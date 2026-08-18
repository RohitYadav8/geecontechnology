import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CaseStudyForm } from "../../../../../components/admin/case-study-form";

export default function NewCaseStudyPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <Link
          href="/admin/case-studies"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600 dark:text-slate-400"
        >
          <ArrowLeft size={16} />
          Back to Case Studies
        </Link>

        <h1 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
          Add Case Study
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Create a new case study for the website.
        </p>
      </div>

      <CaseStudyForm />
    </div>
  );
}