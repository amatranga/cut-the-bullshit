import { TranslationResult } from "../lib/types";

type ExecutiveDashboardProps = {
  result: TranslationResult | null;
};

const ExecutiveDashboard = ({
  result,
}: ExecutiveDashboardProps) => {
  const score = result?.score ?? 0;
  const buzzwordCount = result?.buzzwords.length ?? 0;

  return (
    <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <DashboardCard
        label="Alignment Velocity"
        value={result ? `${Math.min(score + 11, 100)}%` : "--"}
        trend="+12.4%"
      />

      <DashboardCard
        label="Synergy Exposure"
        value={result ? "Elevated" : "Pending"}
        trend="Q/Q Risk"
      />

      <DashboardCard
        label="Buzzword Load"
        value={result ? buzzwordCount.toString() : "--"}
        trend="Detected"
      />

      <DashboardCard
        label="Clarity Forecast"
        value={result ? getClarityForecast(score) : "Awaiting Input"}
        trend="AI-derived"
      />
    </section>
  );
}

type DashboardCardProps = {
  label: string;
  value: string;
  trend: string;
};

const DashboardCard = ({
  label,
  value,
  trend,
}: DashboardCardProps) => {
  return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl backdrop-blur sm:p-5 transition hover:border-slate-700 hover:bg-slate-900/90">
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.2em]">
          {label}
        </p>

        <div className="mt-4 flex items-end justify-between gap-4">
          <p className="text-xl font-bold text-slate-100 sm:text-2xl">
            {value}
          </p>

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">
            {trend}
          </span>
        </div>
      </div>
  );
}

const getClarityForecast = (score: number) => {
  if (score < 30) return "Stable";
  if (score < 70) return "Cloudy";
  return "Obfuscated";
}

export { ExecutiveDashboard };