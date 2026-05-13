"use client";

import { useState, useEffect } from "react";
import TranslatorInput from "@/app/components/TranslatorInput";
import TranslationCard from "@/app/components/TranslationCard";
import BullshitMeter from "@/app/components/BullshitMeter";
import ExecutiveDashboard from "@/app/components/ExecutiveDashboard";
import EmptyState from "@/app/components/EmptyState";
import { Header } from "@/app/components/Header";
import { ModeToggle } from "@/app/components/ModeToggle";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { TranslationMode, AppMode, TranslationResult } from "@/app/lib/types";

export default function Home() {
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appMode, setAppMode] = useState<AppMode>("decode");

  useEffect(() => {
    setResult(null);
  }, [appMode]);

  const handleTranslate = async (text: string, mode: TranslationMode) => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = appMode === "rewrite" ? "/api/rewrite" : "/api/translate";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, mode }),
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
        <Header />

        <ExecutiveDashboard result={result} />

        {error && <ErrorMessage message={error} />}

        <ModeToggle appMode={appMode} onModeChange={setAppMode} />

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_520px]">
          <TranslatorInput onTranslate={handleTranslate} isLoading={isLoading} appMode={appMode} />

          <aside className="space-y-6 self-start border-l border-slate-800/60 pl-6">
            {result ? (
              <>
                <BullshitMeter score={result?.score ?? 0} appMode={appMode} />
                <TranslationCard result={result} appMode={appMode} />
              </>
            ) : (
              <EmptyState appMode={appMode} />
            )
            }
          </aside>
        </div>
      </div>
    </main>
  );
}