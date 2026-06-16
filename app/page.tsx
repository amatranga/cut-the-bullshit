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
import { TranslationLoadingCard } from "@/app/components/TranslationLoadingCard";
import { AnalysisResultCard } from "@/app/components/AnalysisResultCard";
import {
  TranslationMode,
  AppMode,
  TranslationResult,
  TranslationHistoryItem,
  AnalysisResult,
} from "@/app/lib/types";
import { trackEvent } from "@/app/lib/analytics";

export default function Home() {
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appMode, setAppMode] = useState<AppMode>("decode");
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [translationMode, setTranslationMode] = useState<TranslationMode>("cynical");

  const defaultErrorMessage = "The executive ambiguity engine failed to align on outcomes.";

  useEffect(() => {
    const storedHistory = localStorage.getItem("ctb-translation-history");
    if (!storedHistory) return;

    try {
      setHistory(JSON.parse(storedHistory));
    } catch {
      localStorage.removeItem("ctb-translation-history");
    }
  }, []);

  useEffect(() => {
    if (analysis) {
      console.log(analysis);
    }
  }, [analysis]);

  const handleTranslate = async (text: string) => {
    const event = appMode === "analyze" ? "analyze" : "translate";
    const metadata: Record<string, unknown> = { appMode };

    if (event !== "analyze") {
      metadata.translationMode = translationMode;
    }

    trackEvent(event, metadata);

    setIsLoading(true);
    setError(null);

    try {
      const endpointMap: Record<AppMode, string> = {
        analyze: "/api/analyze",
        rewrite: "/api/rewrite",
        decode: "/api/translate",
      };

      const endpoint = endpointMap[appMode];
      const requestBody = appMode === "analyze" ? { text } : { text, translationMode };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        throw new Error(
          errorBody?.error ?? defaultErrorMessage
        );
      }

      const translationResult = await response.json();

      console.log(translationResult, ' || translationResult');
      
      if (appMode !== "analyze") {
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
      }

      if (appMode === "analyze") {
        setAnalysis(translationResult.analysis);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : defaultErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: TranslationHistoryItem) => {
    trackEvent("select_history_item", {});
    
    setResult(item);
    setAppMode(item.appMode);
    setInputText(item.original);

    if (item.mode) {
      setTranslationMode(item.mode);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-[1400px] space-y-4 px-2 sm:space-y-6">
        <Header />

        <ExecutiveDashboard result={result} />

        {error && <ErrorMessage message={error} />}

        <ModeToggle appMode={appMode} onModeChange={setAppMode} />

        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-6">
          <TranslatorInput
            onTranslate={handleTranslate}
            isLoading={isLoading}
            appMode={appMode}
            text={inputText}
            onTextChange={setInputText}
            translationMode={translationMode || "cynical"}
            onTranslationModeChange={setTranslationMode}
          />

          <aside className="space-y-4 self-start sm:space-y-6 lg:order-none">
            <div className="flex flex-col gap-4 sm:gap-6">
              {isLoading && <TranslationLoadingCard appMode={appMode} />}
              
              {result && (appMode === "decode" || appMode === "rewrite") && (
                <>
                  <div className="order-2 lg:order-1">
                    <BullshitMeter score={result.score ?? 100} appMode={appMode} />
                  </div>
                  <div className="order-1 lg:order-2">
                    <TranslationCard result={result} appMode={appMode} />
                  </div>
                </>
              )}

              {appMode === "analyze" && analysis && (
                <div className="order-1">
                  <AnalysisResultCard analysis={analysis} />
                </div>
              )}

              {!isLoading && !result && !analysis && <EmptyState appMode={appMode} />}
                
              <div className="order-3">
                <TranslationHistory
                  hist={history}
                  onSelect={handleSelectHistoryItem}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}