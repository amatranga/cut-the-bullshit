"use client"

import { AppMode, TranslationMode } from "@/app/lib/types";

type TranslatorInputProps = {
  onTranslate: (text: string) => void | Promise<void>;
  isLoading?: boolean;
  appMode: AppMode;
  text: string;
  onTextChange: (text: string) => void;
  translationMode: TranslationMode;
  onTranslationModeChange: (mode: TranslationMode) => void;
};

const translateToOptions = [
  { id: 'cynical', name: 'Cynical' },
  { id: 'direct', name: 'Direct' },
  { id: 'executive', name: 'Executive Decoder' },
  { id: 'slack-goblin', name: 'Slack Goblin' },
]

export const TranslatorInput = ({
  onTranslate,
  isLoading,
  appMode,
  text,
  onTextChange,
  translationMode,
  onTranslationModeChange,
}: TranslatorInputProps) => {

  const isRewriteMode = appMode === "rewrite";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) return;

    await onTranslate(trimmedText);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur"
    >
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          Corporate Communication Intake
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          {isRewriteMode
          ? "Submit Plain Statement for Executive Enhancement"
          : "Submit Statement for Analysis"}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          {isRewriteMode
          ? "Paste a normal human sentence and convert it into enterprise-grade strategic abstraction."
          : "Paste a Slack message, leadership email, meeting note, or recruiter sentence that requires executive decontamination."}
        </p>
      </div>

      <textarea
        value={text}
        onChange={event => onTextChange(event.target.value)}
        placeholder={
          isRewriteMode
            ? "Example: We don't know who owns this yet, but someone needs to decide."
            : "Example: We need to leverage cross-functional synergies to drive alignment across key stakeholders..."
        }
        className="h-[360px] w-full resize-none overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Powered by proprietary executive ambiguity detection.
        </p>

        {!isRewriteMode && (
          <select
            value={translationMode}
            onChange={event => onTranslationModeChange(event.target.value as TranslationMode)}
            className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100"
          >
            {translateToOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>
        )}

        <button
          type="submit"
          disabled={!text.trim()}
          className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
        >
          {isLoading
            ? isRewriteMode
              ? "Generating Executive Theater..."
              : "Aligning Stakeholders..."
          : isRewriteMode
            ? "Generate Bullshit"
            : "Translate Bullshit"}
        </button>
      </div>
    </form>
  );
}