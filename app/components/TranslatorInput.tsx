"use client"

import { useState } from "react";

type TranslatorInputProps = {
  onTranslate: (text: string) => void | Promise<void>;
  isLoading?: boolean;
};

export default function TranslatorInput({
  onTranslate,
  isLoading,
}: TranslatorInputProps) {
  const [text, setText] = useState("");

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
          Submit Statement for Analysis
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Paste a Slack message, leadership email, meeting note, or recruiter
          sentence that requires executive decontamination.
        </p>
      </div>

      <textarea
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder="Example: We need to leverage cross-functional synergies to drive alignment across key stakeholders..."
        className="h-[360px] w-full resize-none overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Powered by proprietary executive ambiguity detection.
        </p>

        <button
          type="submit"
          disabled={!text.trim()}
          className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
        >
          {isLoading ? "Aligning Stakeholders..." : "Translate Bullshit"}
        </button>
      </div>
    </form>
  );
}