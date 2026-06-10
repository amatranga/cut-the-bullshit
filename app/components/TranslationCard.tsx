"use client";

import { useState, useRef } from "react";
import { toBlob } from "html-to-image";
import { AppMode, TranslationMode, TranslationResult } from "@/app/lib/types";
import { trackEvent } from "@/app/lib/analytics";

type TranslationCardProps = {
  result: TranslationResult;
  appMode: AppMode
};

const TranslationCard = ({
  result,
  appMode,
}: TranslationCardProps) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const formatModeLabel = (mode: TranslationMode) => {
    switch (mode) {
      case "direct":
        return "Direct Mode";

      case "executive":
        return "Executive Decoder";

      case "slack-goblin":
        return "Slack Goblin Mode";

      case "cynical":
      default:
        return "Cynical Mode";
    }
  }

  const getShareText = () => (`
    Cut the Bullshit™

    Mode: ${formatModeLabel(result.mode)}

    Original:
      "${result.original}"

    Translation:
      "${result.translation}"

    Detected Buzzwords:
      ${result.buzzwords.length
        ? result.buzzwords.join(", ")
        : "None" }

    Bullshit Density: ${result.score}%
    `.trim()
  );

  const handleCopy = async () => {
    trackEvent("copy", {
      appMode,
      translationMode: result.mode,
    });

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
    trackEvent("share", {
      appMode,
      translationMode: result.mode,
    });

    const shareText = getShareText();

    if (!navigator.share) {
      await handleCopy();
      return;
    }

    try {
      await navigator.share({
        title: 'Cut the Bullshit',
        text: shareText,
        url: 'https://cut-the-bullshit.vercel.app/',
      });

      setShared(true);

      setTimeout(() => {
        setShared(false);
      }, 2000)
    } catch {
      setShared(false);
    }
  }

  return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-5 shadow-2xl transition hover:border-slate-700 hover:bg-slate-900/90">
        <div ref={cardRef}>
          <div className="mb-6 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                Executive Translation Output
              </p>

              <div className="flex shrink-0 items-center gap-2">
                {appMode === "decode" && (<div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                  {formatModeLabel(result.mode)}
                </div>)}
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              Corporate Intent Analysis
            </h2>
          </div>

          <div className="space-y-4">
            <section>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {appMode === "decode" ? "Original Statement" : "Actual Meaning"}
              </p>

              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm text-slate-300 italic">
                "{result.original}"
              </div>
            </section>

            <section>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {appMode === "decode" ? "Actual Meaning" : "Executive Rewrite"}
              </p>

              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                <p className="text-lg leading-relaxed font-medium text-red-100">
                  {result.translation}
                </p>
              </div>
            </section>

            {appMode === "decode" && (<section>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                Detected Buzzwords
              </p>

              <div className="flex flex-wrap gap-2">
                {result.buzzwords.map(word => (
                  <span
                    key={word}
                    className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-200"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </section>)}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-slate-800 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:bg-slate-700 active:scale-[0.98]"
          >
            {copied ? "Copied Card!" : "Copy Card"}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/20 active:scale-[0.98]"
          >
            {shared ? "Shared!" : "Share Result"}
          </button>
        </div>
      </div>
  );
}

export { TranslationCard };