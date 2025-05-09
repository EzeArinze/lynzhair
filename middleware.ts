import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { auth } from "./lib/better-auth/auth";
import { getSessionCookie } from "better-auth";

// Infer session type from better-auth
type Session = typeof auth.$Infer.Session;

const userProtectedPaths = [
  "/commerce/checkout",
  "/commerce/orders",
  "/commerce/success",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes
  if (pathname.startsWith("/admin")) {
    // 1. Check for session cookie first to avoid unnecessary API call
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    // 2. Fetch session only if cookie exists
    try {
      const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
          baseURL: request.nextUrl.origin,
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        }
      );

      if (!session || session.user.role !== "admin") {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    return NextResponse.next();
  }

  if (userProtectedPaths.some((path) => pathname.startsWith(path))) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/commerce/checkout",
    "/commerce/orders",
    "/commerce/success",
  ],
};
