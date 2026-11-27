/* =========================================================
   SITE MAP — single source for header menu and footer.
   Each page appears exactly once.
========================================================= */

export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  title: string;
  href?: string;
  links: NavLink[];
};

export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Clients", href: "/clientele-engagement" },
  { label: "Work", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
];

export const siteMap: NavGroup[] = [
  {
    title: "Services",
    href: "/services",
    links: [
      { label: "Website Development", href: "/website-development" },
      {
        label: "Customised Software",
        href: "/customised-software-development",
      },
      { label: "Cloud Services", href: "/cloud-services" },
      { label: "VPS & Dedicated Servers", href: "/vps-dedicated-servers" },
      { label: "Search Engine Optimisation", href: "/search-engine-optimization" },
      {
        label: "Social Media Marketing",
        href: "/social-media-marketing-services",
      },
      {
        label: "Support & Maintenance",
        href: "/software-support-maintenance",
      },
    ],
  },
  {
    title: "Solutions",
    href: "/products",
    links: [
      { label: "ERP", href: "/erp-solutions" },
      { label: "Mobile", href: "/mobile-solution" },
      { label: "Internet Technology", href: "/internet-technology" },
      { label: "Web Hosting", href: "/web-hosting" },
      { label: "HR & Resource Management", href: "/hr-management" },
      { label: "Corporate Branding", href: "/corporate-branding" },
      { label: "Corporate Training", href: "/corporate-training" },
      { label: "Software Products", href: "/software-products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "History", href: "/about/history" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      { label: "Core Values", href: "/about/core-values" },
      { label: "Core Practise", href: "/about/core-practise" },
      { label: "Strengths", href: "/about/strengths" },
      { label: "Benefits", href: "/about/benefits" },
      { label: "Why Us", href: "/about/why-us" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Clientele & Engagement", href: "/clientele-engagement" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Current Openings", href: "/careers/openings" },
      { label: "Candidate Screening", href: "/candidate-screening" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const contactInfo = {
  email: "info@geecontechnology.com",
  phone: "8655263606",
  phoneDisplay: "+91 86552 63606",
};
