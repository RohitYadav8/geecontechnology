
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in .env");
}

export interface AdminTokenPayload {
    adminId: string;
    email: string;
}

/** Creates a signed JWT for a logged-in admin. Expires in 7 days. */
export function signAdminToken(payload: AdminTokenPayload): string {
    return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "7d" });
}

/** Verifies a token and returns its payload, or null if invalid/expired. */
export function verifyAdminToken(token: string): AdminTokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET as string) as AdminTokenPayload;
    } catch {
        return null;
    }
}
