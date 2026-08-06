import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../../lib/require-admin";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(service);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        const body = await request.json();
        const { tag, title, description, image, href, order } = body;

        const service = await prisma.service.update({
            where: { id },
            data: { tag, title, description, image, href, order },
        });

        return NextResponse.json(service);
    } catch (error) {
        console.error("Update service error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await prisma.service.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete service error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
