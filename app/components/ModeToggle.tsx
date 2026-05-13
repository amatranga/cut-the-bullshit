import { AppMode } from "@/app/lib/types";

type ModeToggleProps = {
  appMode: AppMode;
  onModeChange: (mode: AppMode) => void;
};

export function ModeToggle({ appMode, onModeChange }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900/70 p-1">
      <button
        type="button"
        onClick={() => onModeChange("decode")}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
          appMode === "decode"
            ? "bg-cyan-500 text-slate-950"
            : "text-slate-400 hover:text-slate-100"
        }`}
      >
        Decode Bullshit
      </button>

      <button
        type="button"
        onClick={() => onModeChange("rewrite")}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
          appMode === "rewrite"
            ? "bg-cyan-500 text-slate-950"
            : "text-slate-400 hover:text-slate-100"
        }`}
      >
        Executive Rewrite
      </button>
    </div>
  );
}
