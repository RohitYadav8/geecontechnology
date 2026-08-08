import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../lib/require-admin";

export async function GET(request: NextRequest) {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const applications = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(applications);
}
