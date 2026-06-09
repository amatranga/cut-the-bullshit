import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_ERRORS } from "@/app/lib/errors";
import { rateLimit } from "@/app/lib/rateLimit";

export async function proxy(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

  const { success, reset } = await rateLimit.limit(ip);

  if (success) {
    return NextResponse.next();
  }

  return NextResponse.json(
    { error: API_ERRORS.RATE_LIMITED.message },
    {
      status: API_ERRORS.RATE_LIMITED.status,
      headers: {
        "X-RateLimit-Reset": reset.toString(),
      },
    },
  );
}

export const config = {
  matcher: "/api/:path*",
};