"use client";

import { useState } from "react";
import Image from "next/image";
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
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Briefcase,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Brochure Requests",
    href: "/admin/brochure-requests",
    icon: FileText,
  },
  {
    label: "Product Solution",
    href: "/admin/product-solution",
    icon: Boxes,
  },
  {
    label: "Contact Form",
    href: "/admin/contact-form",
    icon: Mail,
  },
  {
    label: "Blog Posts",
    href: "/admin/blog-posts",
    icon: Newspaper,
    children: [
      {
        label: "All Posts",
        href: "/admin/blog-posts",
      },
      {
        label: "New Post",
        href: "/admin/blog-posts/new",
      },
    ],
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: UserCheck,
  },
  {
    label: "Job Openings",
    href: "/admin/job-openings",
    icon: Briefcase,
  },
  {
    label: "Candidate Screening",
    href: "/admin/candidate-screening",
    icon: UserSearch,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: Star,
  },
  {
    label: "Clients",
    href: "/admin/clients",
    icon: Building2,
  },
  {
    label: "Case Studies",
    href: "/admin/case-studies",
    icon: BarChart3,
  },
  {
    label: "Media Library",
    href: "/admin/media-library",
    icon: ImageIcon,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const [blogOpen, setBlogOpen] = useState(
    pathname?.startsWith("/admin/blog-posts") ?? false
  );

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-white/5 bg-[#0a0e1a] px-3 py-4">
      {/* Brand / Logo */}
      <Link
        href="/admin/dashboard"
        className="flex items-center gap-3 px-3 py-2"
      >
        <div className="relative h-10 w-full">
          <Image
            src="/logo-icon-1.png"
            alt="Geecon Technology"
            fill
            priority
            sizes="220px"
            className="object-contain object-left"
          />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-1">
        {navItems.map((item) => {
          // Dashboard should be active only on exact dashboard URL
          const isActive =
            item.href === "/admin/dashboard"
              ? pathname === "/admin/dashboard"
              : pathname === item.href ||
                pathname?.startsWith(`${item.href}/`);

          {/* Blog Posts */}
          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => setBlogOpen((value) => !value)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-violet-600 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={17} />
                    <span>{item.label}</span>
                  </span>

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      blogOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {blogOpen && (
                  <div className="ml-8 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                            childActive
                              ? "bg-white/10 text-white"
                              : "text-slate-500 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          {/* Normal Navigation Item */}
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={17} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}