import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in .env");
}

export interface AdminTokenPayload {
  adminId: string;
  email: string;
  role: string;
}

/**
 * Creates a signed JWT for a logged-in admin.
 * Expires in 7 days.
 */
export function signAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

/**
 * Verifies a token and returns its payload,
 * or null if invalid/expired.
 */
export function verifyAdminToken(
  token: string
): AdminTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("adminId" in decoded) ||
      !("email" in decoded) ||
      !("role" in decoded)
    ) {
      return null;
    }

    return {
      adminId: String(decoded.adminId),
      email: String(decoded.email),
      role: String(decoded.role),
    };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}