"use client";

import { useEffect, useState } from "react";
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
  Send,
  Newspaper,
  UserCheck,
  UserSearch,
  Star,
  Building2,
  BarChart3,
  Image as ImageIcon,
  Users,
  ChevronDown,
  X,
} from "lucide-react";

type AdminSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

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
    label: "Newsletter",
    href: "/admin/newsletter",
    icon: Send,
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

export function AdminSidebar({
  isOpen = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [blogOpen, setBlogOpen] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin/blog-posts")) {
      setBlogOpen(true);
    }

    onClose?.();
  }, [pathname]);

  const isItemActive = (
    href: string,
    hasChildren = false
  ) => {
    if (!pathname) return false;

    if (hasChildren) {
      return (
        pathname === href ||
        pathname.startsWith(`${href}/`)
      );
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-dvh w-64 shrink-0 flex-col
          overflow-hidden
          border-r border-slate-200
          bg-white
          shadow-xl
          transition-transform duration-300 ease-in-out

          dark:border-slate-800
          dark:bg-[#0a0e1a]

          lg:z-40
          lg:translate-x-0
          lg:shadow-none

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-800">
          <Link
            href="/admin/dashboard"
            className="group flex min-w-0 items-center gap-2.5"
          >
            <Image
              src="/logo-icon-1.png"
              alt="Geecon Technology"
              width={44}
              height={40}
              priority
              className="h-10 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <div className="min-w-0 leading-tight">
              <div className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                GEECON
              </div>

              <div className="whitespace-nowrap text-[7px] font-medium tracking-[0.08em] text-slate-400 dark:text-slate-500">
                SIMPLE SOLUTIONS ENGINEERED FOR EXTREME
              </div>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = isItemActive(
                item.href,
                Boolean(item.children)
              );

              if (item.children) {
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setBlogOpen(
                          (value) => !value
                        )
                      }
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-violet-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon
                          size={17}
                          className="shrink-0"
                        />

                        <span>
                          {item.label}
                        </span>
                      </span>

                      <ChevronDown
                        size={14}
                        className={`shrink-0 transition-transform duration-200 ${
                          blogOpen
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {blogOpen && (
                      <div className="ml-7 mt-1 flex flex-col gap-1 border-l border-slate-200 pl-2 dark:border-slate-700">
                        {item.children.map(
                          (child) => {
                            const childActive =
                              pathname ===
                              child.href;

                            return (
                              <Link
                                key={
                                  child.href
                                }
                                href={
                                  child.href
                                }
                                className={`rounded-md px-3 py-2 text-sm transition-all ${
                                  childActive
                                    ? "bg-violet-50 font-medium text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-white/5 dark:hover:text-white"
                                }`}
                              >
                                {
                                  child.label
                                }
                              </Link>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  <item.icon
                    size={17}
                    className="shrink-0"
                  />

                  <span>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 px-4 py-3 dark:border-slate-800">
          <p className="text-center text-[10px] text-slate-400 dark:text-slate-600">
            Geecon Technology
          </p>
        </div>
      </aside>
    </>
  );
}