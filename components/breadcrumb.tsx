import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <Link href="/" className="flex items-center gap-1 hover:text-[#1a2b4a] dark:hover:text-white">
        <Home size={13} /> Home
      </Link>
      <ChevronRight size={13} />
      <Link href="/services" className="hover:text-[#1a2b4a] dark:hover:text-white">
        Services
      </Link>
      <ChevronRight size={13} />
      <span className="font-medium text-slate-700 dark:text-slate-200">{current}</span>
    </nav>
  );
}