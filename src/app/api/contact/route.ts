import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// =========================
// GET - FETCH CONTACTS
// =========================

export async function GET() {
  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("Fetch contacts error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch contact messages.",
      },
      { status: 500 }
    );
  }
}

// =========================
// POST - CREATE CONTACT
// =========================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      address,
      source,
      requirements,
    } = body;

    if (!name || !email || !phone || !address) {
      return NextResponse.json(
        {
          error: "Name, email, phone and address are required.",
        },
        { status: 400 }
      );
    }

    const contact = await prisma.contactSubmission.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        phone: String(phone).trim(),
        address: String(address).trim(),
        source: source
          ? String(source).trim()
          : null,
        requirements: requirements
          ? String(requirements).trim()
          : null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully.",
        id: contact.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}

// =========================
// PATCH - UPDATE STATUS
// =========================

export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Contact ID is required.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const status = String(body.status || "").toLowerCase();

    if (!["new", "read"].includes(status)) {
      return NextResponse.json(
        {
          error: "Invalid status.",
        },
        { status: 400 }
      );
    }

    const existingContact =
      await prisma.contactSubmission.findUnique({
        where: {
          id,
        },
      });

    if (!existingContact) {
      return NextResponse.json(
        {
          error: "Contact message not found.",
        },
        { status: 404 }
      );
    }

    const contact =
      await prisma.contactSubmission.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message: "Contact status updated successfully.",
        contact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update contact status error:", error);

    return NextResponse.json(
      {
        error: "Failed to update contact status.",
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE - DELETE CONTACT
// =========================

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Contact ID is required.",
        },
        { status: 400 }
      );
    }

    const existingContact =
      await prisma.contactSubmission.findUnique({
        where: {
          id,
        },
      });

    if (!existingContact) {
      return NextResponse.json(
        {
          error: "Contact message not found.",
        },
        { status: 404 }
      );
    }

    await prisma.contactSubmission.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact message deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete contact error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete contact message.",
      },
      { status: 500 }
    );
  }
}