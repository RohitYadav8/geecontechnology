export type ClientCategory =
    | "Technology"
    | "Healthcare"
    | "Education"
    | "Logistics"
    | "Manufacturing"
    | "Finance";

export interface Client {
    id: string;
    name: string;
    /** Path relative to /public. Put your logo files in /public/clients/ and update these. */
    logo: string;
    category: ClientCategory;
    /** Shown in the larger "Featured Clients" section at the top of the grid. */
    featured?: boolean;
}

// DUMMY DATA — replace name, logo path, and category for each real client.
// Keep the same shape (id/name/logo/category/featured) and everything downstream just works.
export const clients: Client[] = [
    { id: "client-01", name: "Client One", logo: "/wsd.png", category: "Technology", featured: true },
    { id: "client-02", name: "Client Two", logo: "/cisco-logo.png", category: "Finance", featured: true },
    { id: "client-03", name: "Client Three", logo: "/oracle-gold.png", category: "Healthcare", featured: true },
    { id: "client-04", name: "Client Four", logo: "/toc.png", category: "Manufacturing", featured: true },
    { id: "client-05", name: "Client Five", logo: "/sirmaxo-logo.png", category: "Technology" },
    { id: "client-06", name: "Client Six", logo: "/sacorinadalip.png", category: "Education" },
    { id: "client-07", name: "Client Seven", logo: "/poundsoft.png", category: "Logistics" },
    { id: "client-08", name: "Client Eight", logo: "/findusonweb.png", category: "Healthcare" },
    { id: "client-09", name: "Client Nine", logo: "/compassion.png", category: "Finance" },
    { id: "client-10", name: "Client Ten", logo: "/algoma.png", category: "Technology" },
    { id: "client-11", name: "Client Eleven", logo: "/bjm.png", category: "Manufacturing" },
    { id: "client-12", name: "Client Twelve", logo: "/blackbaud.png", category: "Education" },
    { id: "client-13", name: "Client Thirteen", logo: "/clients.png", category: "Logistics" },
    { id: "client-14", name: "Client Fourteen", logo: "/drs.png", category: "Healthcare" },
    { id: "client-15", name: "Client Fifteen", logo: "/amazing.png", category: "Technology" },
    { id: "client-16", name: "Client Sixteen", logo: "/search-engine.png", category: "Finance" },
    { id: "client-17", name: "Client Seventeen", logo: "/architects.png", category: "Manufacturing" },
    { id: "client-18", name: "Client Eighteen", logo: "/do-international.png", category: "Education" },
   
];

// DUMMY STATS — replace value with your real numbers.
export const clientStats = [
    { label: "Clients", value: 120, suffix: "+" },
    { label: "Countries", value: 15, suffix: "+" },
    { label: "Projects", value: 500, suffix: "+" },
    { label: "Years of Trust", value: 10, suffix: "+" },
];
