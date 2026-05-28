import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as { role?: string })?.role ?? "MEMBER";

  // Protected dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Admin routes require ADMIN+
    if (pathname.startsWith("/dashboard/admin")) {
      const roleHierarchy: Record<string, number> = {
        MEMBER: 0, DROPPER: 1, ADMIN: 2, COFOUNDER: 3, FOUNDER: 4,
      };
      if ((roleHierarchy[userRole] ?? 0) < 2) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // Product management routes require DROPPER+
    if (pathname.startsWith("/dashboard/products")) {
      const roleHierarchy: Record<string, number> = {
        MEMBER: 0, DROPPER: 1, ADMIN: 2, COFOUNDER: 3, FOUNDER: 4,
      };
      if ((roleHierarchy[userRole] ?? 0) < 1) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  // Redirect logged-in users away from auth pages
  if ((pathname === "/login" || pathname === "/signup") && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
