type TranslationResult = {
  original: string;
  translation: string;
  score: number;
  mode: string;
  buzzwords: string[];
};

type TranslationCardProps = {
  result: TranslationResult;
};

export default function TranslationCard({
  result,
}: TranslationCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-5 shadow-2xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Executive Translation Output
          </p>

          <h2 className="text-2xl font-semibold mt-2">
            Corporate Intent Analysis
          </h2>
        </div>

        <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
          {result.mode} Mode
        </div>
      </div>

      <div className="space-y-4">
        <section>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
            Original Statement
          </p>

          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm text-slate-300 italic">
            "{result.original}"
          </div>
        </section>

        <section>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
            Actual Meaning
          </p>

          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-lg leading-relaxed font-medium text-red-100">
              {result.translation}
            </p>
          </div>
        </section>

        <section>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
            Detected Buzzwords
          </p>

          <div className="flex flex-wrap gap-2">
            {result.buzzwords.map(word => (
              <span
                key={word}
                className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-200"
              >
                {word}
              </span>
            ))}
          </div>
        </section>

        {/* <section className="grid grid-cols-3 gap-4 pt-2">
          <MetricCard
            label="Bullshit Density"
            value={`${result.score}%`}
          />

          <MetricCard
            label="Strategic Clarity"
            value="Low"
          />

          <MetricCard
            label="Actionability"
            value="Unclear"
          />
        </section> */}
      </div>
    </div>
  );
}

// type MetricCardProps = {
//   label: string;
//   value: string;
// };

// function MetricCard({ label, value }: MetricCardProps) {
//   return (
//     <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
//       <p className="text-xs uppercase tracking-wider text-slate-500">
//         {label}
//       </p>

//       <p className="mt-2 text-2xl font-bold text-white">
//         {value}
//       </p>
//     </div>
//   );
// }