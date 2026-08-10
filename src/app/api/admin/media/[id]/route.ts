import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { prisma } from "../../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../../lib/require-admin";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        const media = await prisma.media.findUnique({ where: { id } });
        if (!media) return NextResponse.json({ error: "Not found" }, { status: 404 });

        // Try to remove the actual file too — if it's already gone, don't fail the request.
        try {
            const filePath = path.join(process.cwd(), "public", media.url);
            await unlink(filePath);
        } catch {
            // file missing on disk, ignore
        }

        await prisma.media.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete media error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
