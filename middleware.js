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

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Check if the request is for a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});
