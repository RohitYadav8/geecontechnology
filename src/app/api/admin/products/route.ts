import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

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
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

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

        if (!title || !slug) {
            return NextResponse.json(
                { error: "Title and slug are required" },
                { status: 400 }
            );
        }

        const existingProduct = await prisma.product.findUnique({
            where: {
                slug,
            },
        });

        if (existingProduct) {
            return NextResponse.json(
                { error: "A product with this slug already exists" },
                { status: 409 }
            );
        }

        const product = await prisma.product.create({
            data: {
                title,
                slug,
                bannerImage: bannerImage || null,
                shortDescription: shortDescription || null,
                description: description || null,
                features: features || null,
                benefits: benefits || null,
                sections: sections || null,
                faqs: faqs || null,
                brochureUrl: brochureUrl || null,
                isActive: isActive ?? true,
                order: Number(order) || 0,
            },
        });

        return NextResponse.json(product, {
            status: 201,
        });
    } catch (error) {
        console.error("POST product error:", error);

        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}