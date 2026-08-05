import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../../lib/prisma";
import { signAdminToken } from "../../../../../lib/auth";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        const admin = await prisma.adminUser.findUnique({ where: { email } });

        // Same generic error whether the email doesn't exist or the password is wrong —
        // never reveal which one it was, that helps attackers enumerate valid emails.
        if (!admin) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        const passwordMatches = await bcrypt.compare(password, admin.passwordHash);
        if (!passwordMatches) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        const token = signAdminToken({ adminId: admin.id, email: admin.email });

        const response = NextResponse.json({ success: true, name: admin.name });
        response.cookies.set("admin_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days, matches token expiry
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Admin login error:", error);
        return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
