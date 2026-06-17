"use client";

import { useState, RefObject } from "react";
import { toBlob } from "html-to-image";
import { trackEvent } from "@/app/lib/analytics";

type UseCardActionsOptions = {
  cardRef: RefObject<HTMLDivElement | null>;
  getShareText: () => string;
  trackingMetadata: Record<string, unknown>;
};

const useCardActions = ({
  cardRef,
  getShareText,
  trackingMetadata,
}: UseCardActionsOptions) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    trackEvent("copy", trackingMetadata);

    if (!cardRef.current) return;

    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#020617",
      });

      if (!blob) throw new Error("Failed to generate screenshot");

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);

      setCopied(true);
    } catch {
      trackEvent("copy_failed", {});
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleShare = async () => {
    trackEvent("share", trackingMetadata);

    const shareText = getShareText();

    if (!navigator.share) {
      await handleCopy();
      return;
    }

    try {
      await navigator.share({
        title: "Cut the Bullshit",
        text: shareText,
        url: "https://cut-the-bullshit.vercel.app/",
      });

      setShared(true);

      setTimeout(() => {
        setShared(false);
      }, 2000);
    } catch {
      setShared(false);
    }
  };

  return { copied, shared, handleCopy, handleShare };
};

export { useCardActions };
