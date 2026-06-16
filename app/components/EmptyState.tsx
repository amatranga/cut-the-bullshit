import { AppMode, PlaceholderTextRecord } from "@/app/lib/types";

type EmptyStateProps = {
  appMode: AppMode
}

const modePlaceholderTextMap: Record<AppMode, PlaceholderTextRecord> = {
  analyze: {
    superHeader: "Document Analysis",
    header: "Awaiting Corporate Communication",
    subheader: "Submit an email, meeting summary, Slack conversation, or announcement to identify the real message.",
    example: "No corporate communication detected. System standing by for executive analysis.",
  },
  decode: {
    superHeader: "Corporate Communication Intake",
    header: "Awaiting Executive Input",
    subheader: "Submit a corporate statement to begin strategic ambiguity detection.",
    example: "No corporate communication detected. System standing by for stakeholder alignment.",
  },
  rewrite: {
    superHeader: "Executive Abstraction Engine",
    header: "Awaiting Plain Language Input",
    subheader: "Enter plain English to generate enterprise-grade strategic abstraction.",
    example: "No plain language detected. System standing by for executive enhancement.",
  },
};;

const EmptyState = ({ appMode }: EmptyStateProps) => {
  const { superHeader, header, subheader, example } = modePlaceholderTextMap[appMode];
  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl transition hover:border-slate-700 hover:bg-slate-900/90">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
        {superHeader}
      </p>

      <h2 className="mt-2 text-2xl font-semibold">
        {header}
      </h2>

      <p className="mt-3 text-slate-400">
        {subheader}
      </p>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-500">
        {example}
      </div>
    </aside>
  );
}

export { EmptyState };