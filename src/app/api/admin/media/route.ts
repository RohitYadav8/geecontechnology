import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { prisma } from "../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../lib/require-admin";

function getFileType(mimeType: string): string {
    if (mimeType.startsWith("image/")) return "IMAGE";

    if (mimeType === "application/pdf") {
        return "DOCUMENT";
    }

    return "OTHER";
}

export async function GET(request: NextRequest) {
    const admin = getAdminFromRequest(request);

    if (!admin) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");

        const media = await prisma.media.findMany({
            where: type ? { type } : undefined,
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(media);
    } catch (error) {
        console.error("GET media error:", error);

        return NextResponse.json(
            {
                error: "Failed to fetch media.",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const admin = getAdminFromRequest(request);

    if (!admin) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const formData = await request.formData();

        const file = formData.get("file") as File | null;
        const folderValue = formData.get("folder");
        const altTextValue = formData.get("altText");

        const folder =
            typeof folderValue === "string"
                ? folderValue.trim()
                : null;

        const altText =
            typeof altTextValue === "string"
                ? altTextValue.trim()
                : null;

        if (!file || file.size === 0) {
            return NextResponse.json(
                {
                    error: "No file provided.",
                },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(
            process.cwd(),
            "public",
            "uploads",
            "media"
        );

        await mkdir(uploadsDir, {
            recursive: true,
        });

        const originalName = file.name;

        const safeName = `${Date.now()}-${originalName.replace(
            /[^a-zA-Z0-9._-]/g,
            "_"
        )}`;

        const filePath = path.join(
            uploadsDir,
            safeName
        );

        await writeFile(filePath, buffer);

        const media = await prisma.media.create({
            data: {
                id: randomUUID(),
                fileName: originalName,
                url: `/uploads/media/${safeName}`,
                type: getFileType(file.type),
                folder: folder || null,
                altText: altText || null,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(media, {
            status: 201,
        });
    } catch (error) {
        console.error("Media upload error:", error);

        return NextResponse.json(
            {
                error: "Something went wrong during upload.",
            },
            { status: 500 }
        );
    }
}