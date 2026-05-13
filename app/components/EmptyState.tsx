import { AppMode } from "@/app/lib/types";

type EmptyStateProps = {
  appMode: AppMode
}

export const EmptyState = ({ appMode }: EmptyStateProps) => {
  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
        {appMode === "decode" ? "Linguistic Analysis Engine" : "Executive Abstraction Engine"}
      </p>

      <h2 className="mt-2 text-2xl font-semibold">
        Awaiting Executive Input
      </h2>

      <p className="mt-3 text-slate-400">
        Submit a corporate statement to begin strategic ambiguity detection.
      </p>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-500">
        No bullshit detected yet. System standing by for stakeholder alignment.
      </div>
    </aside>
  );
}