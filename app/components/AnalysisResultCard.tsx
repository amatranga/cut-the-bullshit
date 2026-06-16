"use client";

import { useState, useRef } from "react";
import { toBlob } from "html-to-image";
import { AnalysisResult } from "@/app/lib/types";
import { trackEvent } from "@/app/lib/analytics";

type AnalysisResultCardProps = {
  analysis: AnalysisResult;
};

const AnalysisResultCard = ({ analysis }: AnalysisResultCardProps) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
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

  const handleCopy = async () => {
    trackEvent("copy", {
      appMode: "analyze",
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
      appMode: "analyze",
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
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl transition hover:border-slate-700 hover:bg-slate-900/90">
      <div ref={cardRef}>
        <div className="mb-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Executive Translation Output
            </p>
          </div>

          <h2 className="text-2xl font-semibold">
            Cut the Bullshit Analysis
          </h2>

        </div>

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
    </section>
  );
}

export { AnalysisResultCard };
