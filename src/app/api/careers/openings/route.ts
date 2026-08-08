import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
    const openings = await prisma.jobOpening.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });
    return NextResponse.json(openings);
}
