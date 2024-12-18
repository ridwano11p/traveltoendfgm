import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of paths that require authentication
const protectedPaths = [
  "/create",
  "/edit",
];

// List of public paths that don't require authentication
const publicPaths = [
  "/login",
  "/",
  "/about",
  "/impact-stories",
  "/documentaries",
  "/research",
  "/gallery",
  "/contact",
  "/search-page",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path)
  );

  // Get the authentication token from the session
  const authSession = request.cookies.get("auth-session");

  // If the path is protected and there's no session, redirect to login
  if (isProtectedPath && !authSession) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    return response;
  }

  // If user is authenticated and tries to access login page, redirect to home
  if (authSession && pathname === "/login") {
    const response = NextResponse.redirect(new URL("/", request.url));
    return response;
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};