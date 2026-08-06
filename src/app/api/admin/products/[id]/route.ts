import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

// GET single product for admin edit page
export async function GET(
    _request: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const product = await prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("GET admin product error:", error);

        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}

// PUT update product
export async function PUT(
    request: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;
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
                id,
            },
        });

        if (!existingProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        // Check slug only if it belongs to another product
        const slugProduct = await prisma.product.findFirst({
            where: {
                slug,
                NOT: {
                    id,
                },
            },
        });

        if (slugProduct) {
            return NextResponse.json(
                {
                    error: "A product with this slug already exists",
                },
                { status: 409 }
            );
        }

        const product = await prisma.product.update({
            where: {
                id,
            },
            data: {
                title: title.trim(),
                slug: slug.trim(),
                bannerImage: bannerImage || null,
                shortDescription: shortDescription || null,
                description: description || null,
                features: features ?? null,
                benefits: benefits ?? null,
                sections: sections ?? null,
                faqs: faqs ?? null,
                brochureUrl: brochureUrl || null,
                isActive: isActive ?? true,
                order: Number(order) || 0,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("PUT admin product error:", error);

        return NextResponse.json(
            { error: "Failed to update product" },
            { status: 500 }
        );
    }
}

// DELETE product
export async function DELETE(
    _request: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const existingProduct = await prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!existingProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        await prisma.product.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("DELETE admin product error:", error);

        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: 500 }
        );
    }
}