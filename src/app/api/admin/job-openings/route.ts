import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../lib/require-admin";

export async function GET(request: NextRequest) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const openings = await prisma.jobOpening.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(openings);
}

export async function POST(request: NextRequest) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const { title, department, location, type, description, isActive, order } = body;

        if (!title || !description) {
            return NextResponse.json({ error: "title and description are required." }, { status: 400 });
        }

        const opening = await prisma.jobOpening.create({
            data: {
                title,
                department,
                location,
                type,
                description,
                isActive: isActive ?? true,
                order: order ?? 0,
            },
        });

        return NextResponse.json(opening, { status: 201 });
    } catch (error) {
        console.error("Create job opening error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
