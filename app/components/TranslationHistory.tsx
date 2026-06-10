"use client";

import { useState } from "react";
import type { TranslationHistoryItem } from "@/app/lib/types";
import { trackEvent } from "@/app/lib/analytics";

type TranslationHistoryProps = {
  hist: TranslationHistoryItem[];
  onSelect: (item: TranslationHistoryItem) => void;
};

const TranslationHistory = ({
  hist,
  onSelect,
}: TranslationHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    trackEvent("toggle_history", { isOpen });
    setIsOpen(prev => !prev);
  }

  if (hist.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl transition hover:border-slate-700 hover:bg-slate-900/90">
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Recent Corporate Incidents
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Translation History
          </h2>
        </div>

        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
          {hist.length}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 max-h-[320px] space-y-2 overflow-y-auto pr-1">
          {hist.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-left transition hover:border-cyan-500/50 active:scale-[0.98]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-cyan-300">
                  {item.appMode === "rewrite" ? "Rewrite" : "Decode"}
                </span>

                <span className="text-[10px] text-slate-600">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="mt-2 line-clamp-1 text-sm font-medium text-slate-100">
                {item.original}
              </p>

              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
                {item.translation}
              </p>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export { TranslationHistory };