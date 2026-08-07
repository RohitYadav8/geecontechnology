import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function PUT(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const testimonialId = Number(id);

        if (!Number.isInteger(testimonialId)) {
            return NextResponse.json(
                { error: "Invalid testimonial ID" },
                { status: 400 }
            );
        }

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

        const testimonial =
            await prisma.testimonial.update({
                where: {
                    id: testimonialId,
                },
                data: {
                    quote: quote.trim(),
                    name: name.trim(),
                    isActive: isActive ?? true,
                    order: Number(order) || 0,
                },
            });

        return NextResponse.json(testimonial);
    } catch (error) {
        console.error("PUT testimonial error:", error);

        return NextResponse.json(
            { error: "Failed to update testimonial" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const testimonialId = Number(id);

        if (!Number.isInteger(testimonialId)) {
            return NextResponse.json(
                { error: "Invalid testimonial ID" },
                { status: 400 }
            );
        }

        await prisma.testimonial.delete({
            where: {
                id: testimonialId,
            },
        });

        return NextResponse.json({
            message: "Testimonial deleted successfully",
        });
    } catch (error) {
        console.error("DELETE testimonial error:", error);

        return NextResponse.json(
            { error: "Failed to delete testimonial" },
            { status: 500 }
        );
    }
}