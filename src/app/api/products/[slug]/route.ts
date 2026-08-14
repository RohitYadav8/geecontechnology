import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

type RouteContext = {
    params: Promise<{
        slug: string;
    }>;
};

export async function GET(
    _request: Request,
    { params }: RouteContext
) {
    try {
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json(
                {
                    error: "Product slug is required",
                },
                {
                    status: 400,
                }
            );
        }

        const product = await prisma.product.findUnique({
            where: {
                slug,
            },
        });

        if (!product) {
            return NextResponse.json(
                {
                    error: "Product not found",
                },
                {
                    status: 404,
                }
            );
        }

        // Inactive product public website par nahi dikhana
        if (!product.isActive) {
            return NextResponse.json(
                {
                    error: "Product not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("GET public product error:", error);

        return NextResponse.json(
            {
                error: "Failed to fetch product",
            },
            {
                status: 500,
            }
        );
    }
}