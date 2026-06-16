import { AnalysisResult } from "./types";

const analyzeText = async (input: string): Promise<AnalysisResult> => {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Analysis failed");
  }

  return data.analysis as AnalysisResult;
}

export { analyzeText };
