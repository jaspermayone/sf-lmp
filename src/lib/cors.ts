import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://yourdomain.com",
  // Add your app domains here
];

// List of public API routes that don't require authentication
const publicPaths = [
  // '/api/v1/licenses/verify',
  "/api/v1/webhooks/stripe",
];

export function corsMiddleware(request: NextRequest) {
  // Get the origin from the request headers
  const origin = request.headers.get("origin") || "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Check if it's an OPTIONS request
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // Handle the actual request
  const response = NextResponse.next();

  // Add CORS headers to the response
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  return response;
}
