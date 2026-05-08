type BullshitMeterProps = {
  score: number;
};

export default function BullshitMeter({
  score,
}: BullshitMeterProps) {
  const getStatus = () => {
    if (score < 30) {
      return {
        label: "Readable",
        color: "bg-green-500",
        text: "text-green-300",
      };
    }

    if (score < 70) {
      return {
        label: "Corporate",
        color: "bg-yellow-500",
        text: "text-yellow-300",
      };
    }

    return {
      label: "Critical Bullshit",
      color: "bg-red-500",
      text: "text-red-300",
    };
  };

  const status = getStatus();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-6 shadow-2xl">
      <div className="mb-6 space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          Linguistic Analysis Engine
        </p>

        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">
            Bullshit Density Meter
          </h2>

          <div
            className={`shrink-0 rounded-full px-3 py-1 text-xs border border-white/10 ${status.text} bg-white/5`}
          >
            {status.label}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2 text-sm text-slate-400">
            <span>Executive Abstraction Index</span>
            <span>{score}%</span>
          </div>

          <div className="h-5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ${status.color}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <MiniMetric
            label="Synergy Saturation"
            value={`${Math.min(score + 8, 100)}%`}
          />

          <MiniMetric
            label="Stakeholder Alignment"
            value={score > 60 ? "Pending" : "Nominal"}
          />

          <MiniMetric
            label="Transparency Rating"
            value={score > 75 ? "Low" : "Moderate"}
          />

          <MiniMetric
            label="Meeting Risk"
            value={score > 80 ? "Extreme" : "Manageable"}
          />
        </div>
      </div>
    </div>
  );
}

type MiniMetricProps = {
  label: string;
  value: string;
};

function MiniMetric({
  label,
  value,
}: MiniMetricProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <p className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-slate-100">
        {value}
      </p>
    </div>
  );
}