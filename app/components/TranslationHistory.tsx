"use client";

import { useState } from "react";
import type { TranslationHistoryItem } from "@/app/lib/types";

type TranslationHistoryProps = {
  hist: TranslationHistoryItem[];
  onSelect: (item: TranslationHistoryItem) => void;
};

export const TranslationHistory = ({
  hist,
  onSelect,
}: TranslationHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (hist.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
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
        <div className="mt-4 space-y-3">
          {hist.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-left transition hover:border-cyan-500/50"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-medium text-slate-100">
                  {item.original}
                </p>

                <span className="shrink-0 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300">
                  {item.appMode === "rewrite" ? "Rewrite" : "Decode"}
                </span>
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                {item.translation}
              </p>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}