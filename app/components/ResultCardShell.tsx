import { ReactNode, RefObject } from "react";

type ResultCardShellProps = {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
  contentRef?: RefObject<HTMLDivElement | null>;
  className?: string;
};

const baseClass = 'rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl transition hover:border-slate-700 hover:bg-slate-900/90';

const ResultCardShell = ({
  title,
  badge,
  children,
  contentRef,
  className,
}: ResultCardShellProps) => {
  const shellClassName = className
    ? `${baseClass} ${className}`
    : baseClass;

  return (
    <section className={shellClassName}>
      <div ref={contentRef}>
        <div className="mb-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Executive Translation Output
            </p>

            {badge && <div className="flex shrink-0 items-center gap-2">{badge}</div>}
          </div>

          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>

        {children}
      </div>
    </section>
  );
};

export { ResultCardShell };