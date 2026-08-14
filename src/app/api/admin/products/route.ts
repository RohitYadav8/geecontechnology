import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

/**
 * GET
 * Admin ke liye saare products
 */
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                order: "asc",
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("GET products error:", error);

        return NextResponse.json(
            {
                error: "Failed to fetch products",
            },
            {
                status: 500,
            }
        );
    }
}

/**
 * POST
 * New product create
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            title,
            slug,
            bannerImage,
            shortDescription,
            description,
            features,
            benefits,
            sections,
            faqs,
            brochureUrl,
            isActive,
            order,
        } = body;

        // ----------------------------------------
        // Basic validation
        // ----------------------------------------

        if (
            typeof title !== "string" ||
            !title.trim()
        ) {
            return NextResponse.json(
                {
                    error: "Product title is required",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            typeof slug !== "string" ||
            !slug.trim()
        ) {
            return NextResponse.json(
                {
                    error: "Product slug is required",
                },
                {
                    status: 400,
                }
            );
        }

        const cleanTitle = title.trim();
        const cleanSlug = slug.trim().toLowerCase();

        // ----------------------------------------
        // Check duplicate slug
        // ----------------------------------------

        const existingProduct =
            await prisma.product.findUnique({
                where: {
                    slug: cleanSlug,
                },
            });

        if (existingProduct) {
            return NextResponse.json(
                {
                    error:
                        "A product with this slug already exists",
                },
                {
                    status: 409,
                }
            );
        }

        // ----------------------------------------
        // Create product
        // ----------------------------------------

        const product = await prisma.product.create({
            data: {
                title: cleanTitle,

                slug: cleanSlug,

                bannerImage:
                    typeof bannerImage === "string" &&
                    bannerImage.trim()
                        ? bannerImage.trim()
                        : null,

                shortDescription:
                    typeof shortDescription === "string" &&
                    shortDescription.trim()
                        ? shortDescription.trim()
                        : null,

                description:
                    typeof description === "string" &&
                    description.trim()
                        ? description.trim()
                        : null,

                /*
                 * JSON fields
                 *
                 * In future you can store:
                 *
                 * sections: [
                 *   {
                 *     type: "text",
                 *     title: "About CRM360",
                 *     content: "..."
                 *   },
                 *   {
                 *     type: "image",
                 *     image: "/crm.png"
                 *   },
                 *   {
                 *     type: "paragraph",
                 *     content: "..."
                 *   },
                 *   {
                 *     type: "button",
                 *     text: "Learn More",
                 *     url: "/contact"
                 *   },
                 *   {
                 *     type: "logo",
                 *     image: "/logo.png"
                 *   }
                 * ]
                 */

                features:
                    features !== undefined &&
                    features !== null
                        ? features
                        : null,

                benefits:
                    benefits !== undefined &&
                    benefits !== null
                        ? benefits
                        : null,

                sections:
                    sections !== undefined &&
                    sections !== null
                        ? sections
                        : null,

                faqs:
                    faqs !== undefined &&
                    faqs !== null
                        ? faqs
                        : null,

                brochureUrl:
                    typeof brochureUrl === "string" &&
                    brochureUrl.trim()
                        ? brochureUrl.trim()
                        : null,

                isActive:
                    typeof isActive === "boolean"
                        ? isActive
                        : true,

                order:
                    typeof order === "number"
                        ? order
                        : Number(order) || 0,
            },
        });

        return NextResponse.json(
            product,
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(
            "POST product error:",
            error
        );

        return NextResponse.json(
            {
                error: "Failed to create product",
            },
            {
                status: 500,
            }
        );
    }
}