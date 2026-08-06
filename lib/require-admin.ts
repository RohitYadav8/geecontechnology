import type { NextRequest } from "next/server";
import { verifyAdminToken } from "./auth";

/** Returns the admin payload if the request has a valid session cookie, else null. */
export function getAdminFromRequest(request: NextRequest) {
    const token = request.cookies.get("admin_session")?.value;
    if (!token) return null;
    return verifyAdminToken(token);
}
