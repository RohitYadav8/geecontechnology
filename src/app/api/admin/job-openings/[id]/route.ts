import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../../lib/require-admin";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const opening = await prisma.jobOpening.findUnique({ where: { id } });
    if (!opening) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(opening);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        const body = await request.json();
        const { title, department, location, type, description, isActive, order } = body;

        const opening = await prisma.jobOpening.update({
            where: { id },
            data: { title, department, location, type, description, isActive, order },
        });

        return NextResponse.json(opening);
    } catch (error) {
        console.error("Update job opening error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await prisma.jobOpening.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete job opening error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
