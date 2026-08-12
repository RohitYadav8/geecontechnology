import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { verifyAdminToken } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

/**
 * Authenticate admin from admin_session cookie
 */
async function getAuthenticatedAdmin() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("admin_session")?.value;

    console.log("=================================");
    console.log("ADMIN SESSION:", token ? "FOUND" : "NOT FOUND");

    if (!token) {
      console.log("❌ No admin_session cookie");
      return null;
    }

    const payload = verifyAdminToken(token);

    console.log("JWT PAYLOAD:", payload);

    if (!payload) {
      console.log("❌ Invalid JWT");
      return null;
    }

    const admin = await prisma.adminUser.findUnique({
      where: {
        id: payload.adminId,
      },
    });

    console.log(
      "ADMIN:",
      admin
        ? {
            id: admin.id,
            email: admin.email,
            role: admin.role,
            isActive: admin.isActive,
          }
        : "NOT FOUND"
    );

    if (!admin || !admin.isActive) {
      console.log("❌ Admin not found or inactive");
      return null;
    }

    console.log("✅ ADMIN AUTHENTICATED");
    console.log("=================================");

    return admin;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

/**
 * GET /api/admin/users
 */
export async function GET() {
  try {
    console.log("GET /api/admin/users");

    const admin = await getAuthenticatedAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const users = await prisma.adminUser.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        users,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET /api/admin/users error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST /api/admin/users
 */
export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/admin/users");

    const admin = await getAuthenticatedAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const role =
      typeof body.role === "string"
        ? body.role
        : "ADMIN";

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          error: "Password must be at least 6 characters",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.adminUser.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "A user with this email already exists",
        },
        {
          status: 409,
        }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.adminUser.create({
      data: {
        name: name || null,
        email,
        passwordHash,
        role,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/admin/users error:", error);

    return NextResponse.json(
      {
        error: "Failed to create user",
      },
      {
        status: 500,
      }
    );
  }
}