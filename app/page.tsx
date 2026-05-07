"use client";

import { useState } from "react";
import TranslatorInput from "@/app/components/TranslatorInput";
import TranslationCard from "@/app/components/TranslationCard";
import BullshitMeter from "@/app/components/BullshitMeter";
import ExecutiveDashboard from "@/app/components/ExecutiveDashboard";
import {
  translateCorporateBullshit,
  type TranslationResult,
} from "@/app/lib/translate";

export default function Home() {
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Translation request failed.");
      }

      const translationResult = await response.json();

      setResult(translationResult);
    } catch {
      setError("The executive ambiguity engine failed to align on outcomes.");
    } finally {
      setIsLoading(false);
    }
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

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_520px]">
          <TranslatorInput onTranslate={handleTranslate} isLoading={isLoading} />

          <aside className="space-y-6 self-start border-l border-slate-800/60 pl-6">
            <BullshitMeter score={result?.score ?? 0} />
            {result && <TranslationCard result={result} />}
          </aside>
        </div>
      </div>
    </main>
  );
}