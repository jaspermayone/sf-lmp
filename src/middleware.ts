import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { corsMiddleware } from "@/lib/cors";

export async function middleware(request: NextRequest) {
  // Apply CORS middleware
  const corsResponse = corsMiddleware(request);
  if (corsResponse.status === 204) {
    return corsResponse;
  }

  // Check if the path is a public API route
  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  // If it's not a public path, verify authentication
  if (!isPublicPath) {
    const session = await auth();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Check admin routes
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      session.user.role !== "ADMIN"
    ) {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/portal/:path*"],
};
