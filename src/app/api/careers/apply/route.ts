import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "../../../../../lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const firstName = formData.get("firstName") as string | null;
        const lastName = formData.get("lastName") as string | null;
        const email = formData.get("email") as string | null;
        const phone = formData.get("phone") as string | null;
        const openingId = formData.get("openingId") as string | null;
        const resume = formData.get("resume") as File | null;

        if (!firstName || !lastName || !email || !phone) {
            return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
        }

        let resumeUrl: string | null = null;

        if (resume && resume.size > 0) {
            const bytes = await resume.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
            await mkdir(uploadsDir, { recursive: true });
            const safeName = `${Date.now()}-${resume.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
            await writeFile(path.join(uploadsDir, safeName), buffer);
            resumeUrl = `/uploads/resumes/${safeName}`;
        }

        const application = await prisma.application.create({
            data: { firstName, lastName, email, phone, resumeUrl, openingId: openingId || null },
        });

        return NextResponse.json({ success: true, id: application.id }, { status: 201 });
    } catch (error) {
        console.error("Career application error:", error);
        return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
