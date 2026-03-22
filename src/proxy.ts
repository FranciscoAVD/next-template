import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { isPathInRoutes } from "@/lib/utils";

const protectedRoutes = ["/dashboard/*"];

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const path = request.nextUrl.pathname;
  const isProtected = isPathInRoutes(path, protectedRoutes);

  if (!sessionCookie && isProtected) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/*"],
};
