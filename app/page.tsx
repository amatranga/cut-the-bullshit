"use client";

import { useState, useEffect } from "react";
import { TranslatorInput } from "@/app/components/TranslatorInput";
import { TranslationCard } from "@/app/components/TranslationCard";
import { BullshitMeter } from "@/app/components/BullshitMeter";
import { ExecutiveDashboard } from "@/app/components/ExecutiveDashboard";
import { EmptyState } from "@/app/components/EmptyState";
import { Header } from "@/app/components/Header";
import { ModeToggle } from "@/app/components/ModeToggle";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { TranslationHistory } from "@/app/components/TranslationHistory";
import {
  TranslationMode,
  AppMode,
  TranslationResult,
  TranslationHistoryItem,
} from "@/app/lib/types";

export default function Home() {
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appMode, setAppMode] = useState<AppMode>("decode");
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [translationMode, setTranslationMode] = useState<TranslationMode>("cynical");

  useEffect(() => {
    const storedHistory = localStorage.getItem("ctb-translation-history");
    if (!storedHistory) return;

    try {
      setHistory(JSON.parse(storedHistory));
    } catch {
      localStorage.removeItem("ctb-translation-history");
    }
  }, []);

  const handleTranslate = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = appMode === "rewrite" ? "/api/rewrite" : "/api/translate";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, translationMode }),
      });

      if (!response.ok) {
        throw new Error("Translation request failed.");
      }

      const translationResult = await response.json();

      setResult(translationResult);

      const historyItem: TranslationHistoryItem = {
        ...translationResult,
        id: crypto.randomUUID(),
        appMode,
        createdAt: Date.now(),
      };

      setHistory(prevHistory => {
        const nextHistory = [historyItem, ...prevHistory].slice(0, 10);
        
        localStorage.setItem(
          "ctb-translation-history",
          JSON.stringify(nextHistory),
        );

        return nextHistory;
      });
    } catch {
      setError("The executive ambiguity engine failed to align on outcomes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: TranslationHistoryItem) => {
    console.log(item);
    setResult(item);
    setAppMode(item.appMode);
    setInputText(item.original);
    setTranslationMode(item.mode);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto max-w-[1400px] space-y-6 px-2">
        <Header />

        <ExecutiveDashboard result={result} />

        {error && <ErrorMessage message={error} />}

        <ModeToggle appMode={appMode} onModeChange={setAppMode} />

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_520px]">
          <TranslatorInput
            onTranslate={handleTranslate}
            isLoading={isLoading}
            appMode={appMode}
            text={inputText}
            onTextChange={setInputText}
            translationMode={translationMode}
            onTranslationModeChange={setTranslationMode}
          />
          <aside className="space-y-6 self-start">
            {result ? (
              <>
                <BullshitMeter score={result.score} appMode={appMode} />
                <TranslationCard result={result} appMode={appMode} />
              </>
            ) : (
              <EmptyState appMode={appMode} />
            )}
            <TranslationHistory
              hist={history}
              onSelect={handleSelectHistoryItem}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}