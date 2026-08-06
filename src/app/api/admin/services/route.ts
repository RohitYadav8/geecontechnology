import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../lib/require-admin";

export async function GET(request: NextRequest) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const { tag, title, description, image, href, order } = body;

        if (!title || !description || !image || !href) {
            return NextResponse.json({ error: "title, description, image, and href are required." }, { status: 400 });
        }

        const service = await prisma.service.create({
            data: { tag, title, description, image, href, order: order ?? 0 },
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error("Create service error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
