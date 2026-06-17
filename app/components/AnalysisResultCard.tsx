"use client";

import { useRef } from "react";
import { AnalysisResult } from "@/app/lib/types";
import { useCardActions } from "@/app/lib/useCardActions";
import { ResultCardShell } from "./ResultCardShell";
import { CardActionButtons } from "./CardActionButtons";

type AnalysisResultCardProps = {
  analysis: AnalysisResult;
};

const AnalysisResultCard = ({ analysis }: AnalysisResultCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const getShareText = () => (`
    Cut the Bullshit™

    Mode: Analysis

    Summary:
      ${analysis.summary}

    Actual Meaning:
      ${analysis.actualMeaning.map(item => `- ${item} \n`)}

    Risks:
      ${analysis.risks.map(risk => `- ${risk} \n`)}

    Likely Outcome:
      ${analysis.likelyOutcome}
    `.trim()
  );

  const { copied, shared, handleCopy, handleShare } = useCardActions({
    cardRef,
    getShareText,
    trackingMetadata: { appMode: "analyze" },
  });

  return (
    <>
      <ResultCardShell title="Cut the Bullshit Analysis" contentRef={cardRef}>
        <div className="space-y-4">
          <section>
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">
              Executive Summary
            </p>

            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
              <p className="text-2xl font-bold leading-tight text-white">
                {analysis.summary}
              </p>
            </div>
          </section>

          <section>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
              Likely Outcome
            </p>
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm leading-relaxed font-medium">
              {analysis.likelyOutcome}
            </div>
          </section>

          <section>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
              Actual Meaning
            </p>
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm leading-relaxed font-medium">
              <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-100">
                {analysis.actualMeaning.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
              Risks
            </p>
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm leading-relaxed font-medium">
              <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-100">
                {analysis.risks.map((risk) => (
                  <li key={risk}>{risk}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      <CardActionButtons
        copied={copied}
        shared={shared}
        onCopy={handleCopy}
        onShare={handleShare}
      />
      </ResultCardShell>
    </>
  );
}

export { AnalysisResultCard };
