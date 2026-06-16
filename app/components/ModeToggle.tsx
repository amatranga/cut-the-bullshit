import { APP_MODES, AppMode } from "@/app/lib/types";

type ModeToggleProps = {
  appMode: AppMode;
  onModeChange: (mode: AppMode) => void;
};

const MODE_LABELS: Record<AppMode, string> = {
  decode: "Decode Bullshit",
  rewrite: "Executive Rewrite",
  analyze: "Analysis",
};

const ModeToggle = ({ appMode, onModeChange }: ModeToggleProps) => {
  return (
    <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900/70 p-1">
      {APP_MODES.map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => onModeChange(mode)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition active:scale-[0.98] ${
            appMode === mode
              ? "bg-cyan-500 text-slate-950"
              : "text-slate-400 hover:text-slate-100"
          }`}
        >
          {MODE_LABELS[mode]}
        </button>
      ))}
    </div>
  );
}

export { ModeToggle };