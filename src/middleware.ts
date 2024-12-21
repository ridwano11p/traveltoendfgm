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

export async function middleware(request: NextRequest) {
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
  if (isProtectedPath && !authSession?.value) {
    // Store the original URL to redirect back after login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("redirect-url", pathname);
    return response;
  }

  // If user is authenticated and tries to access login page, redirect to home
  // or to the stored redirect URL if it exists
  if (authSession?.value && pathname === "/login") {
    const redirectUrl = request.cookies.get("redirect-url");
    const response = NextResponse.redirect(
      new URL(redirectUrl?.value || "/", request.url)
    );
    // Clear the redirect URL cookie
    response.cookies.delete("redirect-url");
    return response;
  }

  // For all other cases, allow the request to continue
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};