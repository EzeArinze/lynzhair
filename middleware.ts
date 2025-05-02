import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { auth } from "./lib/better-auth/auth";
import { getSessionCookie } from "better-auth";

// Infer session type from better-auth
type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
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
      return NextResponse.redirect(new URL("/auth/sign-in", request.url)); // Not allowed
    }

    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  const userProtectedPaths = [
    "/commerce/checkout",
    "/commerce/orders",
    "/commerce/success",
  ];

  if (userProtectedPaths.some((path) => pathname.startsWith(path))) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to relevant routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/commerce/checkout",
    "/commerce/orders",
    "/commerce/success",
  ],
};
