const trackEvent = (
  event: string,
  metadata: Record<string, unknown> = {},
) => {
  void fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event, metadata }),
    keepalive: true,
  }).catch(() => {
    // Tracking should never block UI interactions.
  });
};

export { trackEvent };
