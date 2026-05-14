import { AppMode } from "@/app/lib/types";

type TranslationLoadingCardProps = {
  appMode: AppMode;
};

const TranslationLoadingCard = ({
  appMode,
}: TranslationLoadingCardProps) => {
  const title =
    appMode === "rewrite"
      ? "Generating Executive Theater"
      : "Analyzing Corporate Subtext";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl transition hover:border-slate-700 hover:bg-slate-900/90">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
        Executive Translation Output
      </p>

      <h2 className="mt-3 text-2xl font-semibold">
        {title}
      </h2>

      <div className="mt-6 space-y-4">
        <div className="h-11 animate-pulse rounded-xl bg-slate-800/70" />
        <div className="h-24 animate-pulse rounded-xl bg-red-500/10" />

        <div className="flex gap-2">
          <div className="h-7 w-20 animate-pulse rounded-full bg-amber-500/10" />
          <div className="h-7 w-28 animate-pulse rounded-full bg-amber-500/10" />
          <div className="h-7 w-24 animate-pulse rounded-full bg-amber-500/10" />
        </div>
      </div>
    </div>
  );
}

export { TranslationLoadingCard };