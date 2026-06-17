"use client";

import { useRef } from "react";
import { AppMode, TranslationMode, TranslationResult } from "@/app/lib/types";
import { useCardActions } from "@/app/lib/useCardActions";
import { ResultCardShell } from "./ResultCardShell";
import { CardActionButtons } from "./CardActionButtons";

type TranslationCardProps = {
  result: TranslationResult;
  appMode: AppMode
};

const TranslationCard = ({
  result,
  appMode,
}: TranslationCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const formatModeLabel = (mode: TranslationMode | undefined) => {
    const modeMap: Record<TranslationMode, string> = {
      direct: "Direct Mode",
      executive: "Executive Decoder",
      "slack-goblin": "Slack Goblin Mode",
      cynical: "Cynical Mode",
    };
    
    return mode ? modeMap[mode] : modeMap.cynical;
  }

  const getShareText = () => (`
    Cut the Bullshit™

    Mode: ${formatModeLabel(result.mode)}

    Original:
      "${result.original}"

    Translation:
      "${result.translation}"

    Detected Buzzwords:
      ${result.buzzwords?.length
        ? result.buzzwords.join(", ")
        : "None" }

    Bullshit Density: ${result.score}%
    `.trim()
  );

  const { copied, shared, handleCopy, handleShare } = useCardActions({
    cardRef,
    getShareText,
    trackingMetadata: { appMode, translationMode: result.mode },
  });

  return (
      <ResultCardShell
        title="Corporate Intent Analysis"
        contentRef={cardRef}
        className="backdrop-blur"
        badge={appMode === "decode" ? (
          <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
            {formatModeLabel(result.mode)}
          </div>
        ) : undefined}
      >
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

            {appMode === "decode" && (
              <section>
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                  Detected Buzzwords
                </p>

                <div className="flex flex-wrap gap-2">
                  {result.buzzwords?.map(word => (
                    <span
                      key={word}
                      className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-200"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        <CardActionButtons
          copied={copied}
          shared={shared}
          onCopy={handleCopy}
          onShare={handleShare}
        />
      </ResultCardShell>
  );
}

export { TranslationCard };