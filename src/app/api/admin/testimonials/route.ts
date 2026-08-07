import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: {
                order: "asc",
            },
        });

        return NextResponse.json(testimonials);
    } catch (error) {
        console.error("GET admin testimonials error:", error);

        return NextResponse.json(
            { error: "Failed to fetch testimonials" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            quote,
            name,
            isActive,
            order,
        } = body;

        if (!quote?.trim() || !name?.trim()) {
            return NextResponse.json(
                {
                    error: "Quote and name are required.",
                },
                { status: 400 }
            );
        }

        const testimonial = await prisma.testimonial.create({
            data: {
                quote: quote.trim(),
                name: name.trim(),
                isActive: isActive ?? true,
                order: Number(order) || 0,
            },
        });

        return NextResponse.json(testimonial, {
            status: 201,
        });
    } catch (error) {
        console.error("POST testimonial error:", error);

        return NextResponse.json(
            { error: "Failed to create testimonial" },
            { status: 500 }
        );
    }
}