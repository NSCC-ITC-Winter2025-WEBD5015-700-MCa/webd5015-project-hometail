import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/settings",
  "/subscribe",
  "/admin",
  "/adoptdog",
  "/listdog",
  "/mylistings",
  "/inbox",
  "/match-results",
];

const adminRoutes = ["/admin"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;
  const session = req.auth;

  // Check if the request is for a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdminRoute && session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/error", req.url));
  }

  return NextResponse.next();
});
