export interface Product {
    id: string;
    name: string;
    tagline: string;
    quotes: string[];
    gradient: string;
    logoText: string;
    logo?: string;
    href: string;
    variant?: "info";
    socials?: boolean;
}

export const products: Product[] = [
    {
        id: "global-hr",
        name: "Global HR",
        tagline: "Complete HR Solution",
        quotes: [
            "Make HR Process Quick, Easy and Simple.",
            "HR software for companies where people matter.",
        ],
        gradient: "from-orange-500 to-red-400",
        logoText: "HR",
        logo: "/global-hr.png",
        href: "/products/global-hr",
    },
    {
        id: "facewebinar",
        name: "Facewebinar",
        tagline: "Video Conferencing Tool",
        quotes: [
            "Online meetings made easy with simplified video conferencing.",
            "Transform your interactions into effective collaboration with live Facewebinar video.",
        ],
        gradient: "from-slate-400 to-slate-200",
        logoText: "FW",
        logo: "/facewebinar-1.png",
        href: "/products/facewebinar",
    },
    {
        id: "gift-aid-claims",
        name: "Gift Aid Claims",
        tagline: "Online Gift Aid Submission",
        quotes: [
            "Manage your Gift Aid online.",
            "Easy to use Gift Aid solutions and supporting services for Charities.",
        ],
        gradient: "from-blue-600 to-blue-400",
        logoText: "GA",
        logo: "/giftaid-1.png",
        href: "/products/gift-aid-claims",
    },
    {
        id: "invoice-made-simple",
        name: "Invoice Made Simple",
        tagline: "Invoicing Solution",
        quotes: [
            "Managing your Invoice Online.",
            "Simple and Powerful online invoicing for your Business.",
        ],
        gradient: "from-blue-700 to-indigo-500",
        logoText: "IS",
        logo: "/invoice.png",
        href: "/products/invoice-made-simple",
    },
    {
        id: "crm-360",
        name: "CRM 360",
        tagline: "Customer Relationship Management",
        quotes: [
            "With its enormous flexibility, its functions and modules, CRM 360 is especially suitable for the use in critical environments of your enterprise.",
        ],
        gradient: "from-green-600 to-emerald-400",
        logoText: "360",
        logo: "/crm-1.png",
        href: "/products/crm-360",
    },
    {
        id: "bulk-sms-solution",
        name: "Bulk SMS Solution",
        tagline: "\"Take a tour of business SMS world!\"",
        quotes: [
            "BusinessSMS is one among the leaders in providing effective, efficient and responsive bulk messaging solutions including two-way SMS integration for wireless communication.",
        ],
        gradient: "from-indigo-700 to-purple-500",
        logoText: "SMS",
        logo: "/sms-1.png",
        href: "/products/bulk-sms-solution",
        variant: "info",
        socials: true,
    },
    {
        id: "my-projects",
        name: "My Projects",
        tagline: "Project Management Tool",
        quotes: [
            "Managing projects isn't easy, which is why you need the best technology to manage your projects against budgets, schedule & resources in real time.",
        ],
        gradient: "from-amber-800 to-orange-600",
        logoText: "MP",
        logo: "/myprojects-1.png",
        href: "/products/my-projects",
    },
    {
        id: "cms-avatar",
        name: "CMS Avatar",
        tagline: "Build CMS Website",
        quotes: [
            "Fast, lightweight core capable of powering multiple sites and handle millions of hits per day. Control where images and files are stored and who has access to given folders.",
        ],
        gradient: "from-amber-900 to-red-700",
        logoText: "CMS",
        logo: "/cms-1.png",
        href: "/products/cms-avatar",
    },
    {
        id: "Online Directory",
        name: "Online Directory",
        tagline: "Business Listing & Directory Solutions",
        quotes: [
            "We are India's online portal providing an opportunity to have real-time access to relevant information regarding various industries."
        ],
        gradient: "from-orange-600 to-amber-500",
        logoText: "LP",
        logo:"/onlinedirectory.png",
        href: "/products/listing-based-portals",
        variant: "info",
        socials: true,
    },
    {
        id: "syncmydocs",
        name: "SyncMyDocs",
        tagline: "Docs Anytime Anywhere",
        quotes: [
            "SyncMyDocs provides the ability to utilize cloud technologies while retaining that precious right we call privacy.",
        ],
        gradient: "from-sky-500 to-blue-300",
        logoText: "SD",
        logo: "/syncmydoc.png",
        href: "/products/syncmydocs",
    },
    {
        id: "data360",
        name: "Data360",
        tagline: "Reporting and Analysis Tool",
        quotes: [
            "DATA360 is a robust business intelligence platform. It is a comprehensive business intelligence platform which comes with an inbuilt ETL tool, reporting tool and analytics.",
        ],
        gradient: "from-teal-600 to-cyan-400",
        logoText: "D360",
        logo: "/data-360.jpg",
        href: "/products/data360",
    },
];