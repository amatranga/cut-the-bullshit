"use client";

import { useState } from "react";
import TranslatorInput from "./components/TranslatorInput";
import TranslationCard from "./components/TranslationCard";
import BullshitMeter from "./components/BullshitMeter";
import ExecutiveDashboard from "./components/ExecutiveDashboard";

const mockResult = {
  original: "We need to leverage cross-functional synergies to maximize stakeholder alignment.",
  translation: "We need more meetings because nobody knows who owns this.",
  score: 87,
  mode: "Cynical",
  buzzwords: ["leverage", "cross-functional", "synergies", "stakeholder alignment"],
};

export default function Home() {
  const [result, setResult] = useState<typeof mockResult | null>(null);

  const handleTranslate = async (text: string) => {
    setResult({
      ...mockResult,
      original: text,
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto max-w-[1400px] space-y-6 px-2">
        <header>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Enterprise Clarity Platform
          </p>
          <h1 className="text-4xl font-bold">Cut the Bullshit</h1>
          <p className="text-slate-400">
            Translate corporate abstraction into actual human meaning.
          </p>
        </header>

        <ExecutiveDashboard result={result} />

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_520px]">
          <TranslatorInput onTranslate={handleTranslate} />

          <aside className="space-y-6 self-start border-l border-slate-800/60 pl-6">
            <BullshitMeter score={result?.score ?? 0} />
            {result && <TranslationCard result={result} />}
          </aside>
        </div>
      </div>
    </main>
  );
}