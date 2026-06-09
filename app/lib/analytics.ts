import { redis } from "@/app/lib/redis";

const trackEvent = async (
  event: string,
  metadata: Record<string, unknown>,
) => {
  const name = "analytics:events";

  await redis.pipeline()
    .lpush(
      name,
      JSON.stringify({
        name,
        timestamp: Date.now(),
        ...metadata,
      })
    )
    .ltrim(name, 0, 9999)
    .incr(`${name}:${event}`)
    .exec();
}

export { trackEvent };
