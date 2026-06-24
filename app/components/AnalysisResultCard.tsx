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

    Action Items:
      ${analysis.actionItems.map(actionItem => `- ${actionItem} \n`)}
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
          <section>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
              Action Items
            </p>
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm leading-relaxed font-medium">
              {analysis.actionItems.length > 0 ? (
                <ul className="space-y-3">
                  {analysis.actionItems.map((item) => (
                      <li key={item.task} className="space-y-1">
                        <p className="text-zinc-100">{item.task}</p>

                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-400">
                          {item.owner ? (
                            <span>👤 {item.owner}</span>
                          ) : (
                            <span>⚠ Owner missing</span>
                          )}

                          {item.dueDate && (
                            <span>📅 {item.dueDate}</span>
                          )}

                          {item.status === "implied" && (
                            <span>💡 Inferred</span>
                          )}
                        </div>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-slate-400">No concrete action items detected.</p>
              )}
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
