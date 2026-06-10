import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";
import { API_ERRORS } from "@/app/lib/errors";

type TrackRequestBody = {
  event?: string;
  metadata?: Record<string, unknown>;
};

const EVENTS_LIST_KEY = "analytics:events";
const EVENT_COUNTER_PREFIX = "analytics:event";
const APP_MODE_KEY = "analytics:appMode";
const TRANSLATION_MODE_KEY = "analytics:translationMode";
const env = process.env.ENVIRONMENT_VAR

const safeKeyPart = (value: unknown) => (
  typeof value === "string"
  ? value.replace(/[^a-zA-z0-9_-]/g, "_").toLowerCase()
  : undefined
);

const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as TrackRequestBody;
    const event = safeKeyPart(body?.event);
    const isProd = env === "production";

    if (!isProd) {
      return NextResponse.json({ ok: true });
    }

    if (!event) {
      return NextResponse.json(
        { error: API_ERRORS.INVALID_EVENT.message },
        { status: API_ERRORS.INVALID_EVENT.status },
      );
    }

    const metadata =
      body?.metadata &&
      typeof body.metadata === "object" &&
      !Array.isArray(body.metadata)
        ? body.metadata
        : {};

    const payload = JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
      ...metadata,
    });

    const pipeline = redis
      .pipeline()
      .lpush(EVENTS_LIST_KEY, payload)
      .ltrim(EVENTS_LIST_KEY, 0, 9999)
      .incr(`${EVENT_COUNTER_PREFIX}:${event}`);

    const appMode = safeKeyPart(metadata.appMode);
    const translationMode = safeKeyPart(metadata.translationMode);

    if (event === "translate") {
      if (appMode) {
        pipeline.incr(`${APP_MODE_KEY}:${appMode}`);
      }

      if (translationMode) {
        pipeline.incr(`${TRANSLATION_MODE_KEY}:${translationMode}`);
      }
    }

    if (event === "share") {
      pipeline
      .incr(`${APP_MODE_KEY}:${appMode}:share`)
        .incr(`${TRANSLATION_MODE_KEY}:${translationMode}:share`);
    }

    if (event === "copy") {
      pipeline
        .incr(`${APP_MODE_KEY}:${appMode}:copy`)
        .incr(`${TRANSLATION_MODE_KEY}:${translationMode}:copy`);
    }

    await pipeline.exec();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: API_ERRORS.ANALYTICS_FAILED.message },
      { status: API_ERRORS.ANALYTICS_FAILED.status },
    );
  }
}

export { POST };
