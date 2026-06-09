import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/app/lib/redis"

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
  prefix: "ctb:ratelimit",
});

export { rateLimit };