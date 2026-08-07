import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            name,
            phone,
            email,
            company,
            website,
            productId,
        } = body;

        if (!name?.trim() || !phone?.trim() || !email?.trim()) {
            return NextResponse.json(
                {
                    error: "Name, phone and email are required.",
                },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return NextResponse.json(
                {
                    error: "Please enter a valid email address.",
                },
                { status: 400 }
            );
        }

        if (productId) {
            const product = await prisma.product.findUnique({
                where: {
                    id: productId,
                },
            });

            if (!product) {
                return NextResponse.json(
                    {
                        error: "Product not found.",
                    },
                    { status: 404 }
                );
            }
        }

        const brochureRequest =
            await prisma.brochureRequest.create({
                data: {
                    name: name.trim(),
                    phone: phone.trim(),
                    email: email.trim().toLowerCase(),
                    company: company?.trim() || null,
                    website: website?.trim() || null,
                    productId: productId || null,
                },
            });

        return NextResponse.json(
            {
                message: "Brochure request submitted successfully.",
                requestId: brochureRequest.id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(
            "POST brochure request error:",
            error
        );

        return NextResponse.json(
            {
                error: "Failed to submit brochure request.",
            },
            { status: 500 }
        );
    }
}