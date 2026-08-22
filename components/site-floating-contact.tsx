"use client";

import { usePathname } from "next/navigation";

import { FloatingContactMenu } from "../components/floating-contact-menu";

export function SiteFloatingContact() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <FloatingContactMenu />;
}