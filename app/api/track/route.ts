import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";
import { API_ERRORS } from "@/app/lib/errors";

type TrackRequestBody = {
  event?: string;
  metadata?: Record<string, unknown>;
};

const POST = async (request: Request) => {
  const keyName = "analytics:events";

  try {
    const body = (await request.json()) as TrackRequestBody;
    const event = body?.event;

    if (!event || typeof event !== "string") {
      return NextResponse.json(
        { error: API_ERRORS.INVALID_EVENT.message },
        { status: API_ERRORS.INVALID_EVENT.status },
      );
    }

    const metadata =
      body?.metadata && typeof body.metadata === "object" ? body.metadata : {};

    const countKey = `${keyName}:${event}`;

    await redis
      .pipeline()
      .lpush(
        keyName,
        JSON.stringify({
          event,
          timestamp: new Date(),
          ...metadata,
        }),
      )
      .ltrim(keyName, 0, 9999)
      .incr(countKey)
      .exec();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: API_ERRORS.ANALYTICS_FAILED.message },
      { status: API_ERRORS.ANALYTICS_FAILED.status },
    );
  }
}

export { POST };
