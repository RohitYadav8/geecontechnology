import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
    try {
        const requests = await prisma.brochureRequest.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                product: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
        });

        return NextResponse.json(requests);
    } catch (error) {
        console.error("GET brochure requests error:", error);

        return NextResponse.json(
            {
                error: "Failed to fetch brochure requests.",
            },
            { status: 500 }
        );
    }
}