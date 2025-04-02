import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/settings",
  "/subscribe",
  "/admin",
  "/adoptdog",
  "/listdog",
];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Check if the request is for a protected route or any subpath of /dashboard
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});
