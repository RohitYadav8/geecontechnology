"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Package,
    FileText,
    Boxes,
    Mail,
    Newspaper,
    UserCheck,
    UserSearch,
    Star,
    Building2,
    BarChart3,
    Image as ImageIcon,
    Users,
    ChevronDown,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Services", href: "/admin/services", icon: Briefcase },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Brochure Requests", href: "/admin/brochure-requests", icon: FileText },
    { label: "Product Solution", href: "/admin/product-solution", icon: Boxes },
    { label: "Contact Form", href: "/admin/contact-form", icon: Mail },
    {
        label: "Blog Posts",
        href: "/admin/blog-posts",
        icon: Newspaper,
        children: [
            { label: "All Posts", href: "/admin/blog-posts" },
            { label: "New Post", href: "/admin/blog-posts/new" },
        ],
    },
    { label: "Applications", href: "/admin/applications", icon: UserCheck },
    { label: "Candidate Screening", href: "/admin/candidate-screening", icon: UserSearch },
    { label: "Testimonials", href: "/admin/testimonials", icon: Star },
    { label: "Clients", href: "/admin/clients", icon: Building2 },
    { label: "Case Studies", href: "/admin/case-studies", icon: BarChart3 },
    { label: "Media Library", href: "/admin/media-library", icon: ImageIcon },
    { label: "Users", href: "/admin/users", icon: Users },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [blogOpen, setBlogOpen] = useState(false);

    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-white/5 bg-[#0a0e1a] px-3 py-4">
            {/* Brand */}
            <Link href="/admin/dashboard" className="flex items-center gap-2.5 px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white">
                    G
                </div>
                <span className="text-base font-bold text-white">Geecon Technology</span>
            </Link>

            <nav className="mt-6 flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

                    if (item.children) {
                        return (
                            <div key={item.label}>
                                <button
                                    onClick={() => setBlogOpen((v) => !v)}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-violet-600 text-white"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <item.icon size={17} />
                                        {item.label}
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform ${blogOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {blogOpen && (
                                    <div className="ml-8 mt-1 flex flex-col gap-1">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                                                    pathname === child.href
                                                        ? "text-white"
                                                        : "text-slate-500 hover:text-white"
                                                }`}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                isActive ? "bg-violet-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <item.icon size={17} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
