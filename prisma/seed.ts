import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    port: Number(process.env.DATABASE_PORT || 4000),

    connectionLimit: 1,
    connectTimeout: 30000,
    acquireTimeout: 30000,

    ssl: true,
});

const prisma = new PrismaClient({
    adapter,
});

// ======================================
// PRODUCTS
// ======================================

const products = [
    {
        title: "Global HR",
        slug: "global-hr",
        bannerImage: "/global-hr-1.png",
        shortDescription: "Complete HR Solution",
        description:
            "GlobalHR Management System offers a wealth of modules to suit the needs of your business.",
        order: 1,
    },
    {
        title: "Facewebinar",
        slug: "facewebinar",
        bannerImage: "/facewebinar-1.png",
        shortDescription: "Video Conferencing Tool",
        description:
            "Online meetings made easy with simplified video conferencing.",
        order: 2,
    },
    {
        title: "Gift Aid Claims",
        slug: "gift-aid-claims",
        bannerImage: "/giftaid-1.png",
        shortDescription: "Online Gift Aid Submission",
        description:
            "Manage your Gift Aid online with easy-to-use Gift Aid solutions.",
        order: 3,
    },
    {
        title: "Invoice Made Simple",
        slug: "invoice-made-simple",
        bannerImage: "/invoice.png",
        shortDescription: "Invoicing Solution",
        description:
            "Simple and powerful online invoicing for your business.",
        order: 4,
    },
    {
        title: "CRM 360",
        slug: "crm-360",
        bannerImage: "/crm-1.png",
        shortDescription: "Customer Relationship Management",
        description:
            "CRM 360 provides flexible functions and modules for critical enterprise environments.",
        order: 5,
    },
    {
        title: "Bulk SMS Solution",
        slug: "bulk-sms-solution",
        bannerImage: "/sms-1.png",
        shortDescription: "Take a tour of business SMS world!",
        description:
            "BusinessSMS provides effective, efficient and responsive bulk messaging solutions including two-way SMS integration.",
        order: 6,
    },
    {
        title: "My Projects",
        slug: "my-projects",
        bannerImage: "/myprojects-1.png",
        shortDescription: "Project Management Tool",
        description:
            "Manage projects against budgets, schedules and resources in real time.",
        order: 7,
    },
    {
        title: "CMS Avatar",
        slug: "cms-avatar",
        bannerImage: "/cms-1.png",
        shortDescription: "Build CMS Website",
        description:
            "A fast and lightweight CMS capable of powering multiple websites.",
        order: 8,
    },
    {
        title: "Online Directory",
        slug: "listing-based-portals",
        bannerImage: "/onlinedirectory.png",
        shortDescription: "Business Listing & Directory Solutions",
        description:
            "Online portal providing real-time access to relevant information regarding various industries.",
        order: 9,
    },
    {
        title: "SyncMyDocs",
        slug: "syncmydocs",
        bannerImage: "/syncmydoc.png",
        shortDescription: "Docs Anytime Anywhere",
        description:
            "SyncMyDocs provides the ability to utilize cloud technologies while retaining privacy.",
        order: 10,
    },
    {
        title: "Data360",
        slug: "data360",
        bannerImage: "/data-360.jpg",
        shortDescription: "Reporting and Analysis Tool",
        description:
            "DATA360 is a comprehensive business intelligence platform with ETL, reporting and analytics tools.",
        order: 11,
    },
];

// ======================================
// MAIN SEED
// ======================================

async function main() {
    console.log("=================================");
    console.log("Starting Prisma seed...");
    console.log("=================================");

    // ==================================
    // ADMIN
    // ==================================

    const passwordHash = await bcrypt.hash(
        "Admin@123",
        10
    );

    const admin = await prisma.adminUser.upsert({
        where: {
            email: "admin@geecontechnology.com",
        },

        update: {
            passwordHash,
            name: "Admin",
            role: "SUPER_ADMIN",
            isActive: true,
        },

        create: {
            email: "admin@geecontechnology.com",
            passwordHash,
            name: "Admin",
            role: "SUPER_ADMIN",
            isActive: true,
        },
    });

    console.log("✅ Admin created/updated");
    console.log("   Email:", admin.email);
    console.log("   Role:", admin.role);
    console.log(
        "   Status:",
        admin.isActive ? "Active" : "Inactive"
    );

    // ==================================
    // PRODUCTS
    // ==================================

    console.log("");
    console.log("Adding products...");

    for (const product of products) {
        const result = await prisma.product.upsert({
            where: {
                slug: product.slug,
            },

            update: {
                title: product.title,
                bannerImage: product.bannerImage,
                shortDescription: product.shortDescription,
                description: product.description,
                isActive: true,
                order: product.order,
            },

            create: {
                title: product.title,
                slug: product.slug,
                bannerImage: product.bannerImage,
                shortDescription: product.shortDescription,
                description: product.description,
                isActive: true,
                order: product.order,
            },
        });

        console.log(
            `✅ Product: ${result.title} (${result.slug})`
        );
    }

    console.log("");
    console.log("=================================");
    console.log("🎉 Seed completed successfully!");
    console.log("=================================");
}

// ======================================
// RUN
// ======================================

main()
    .catch((error) => {
        console.error("");
        console.error("❌ Seed error:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });