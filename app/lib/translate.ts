import { CORPORATE_JARGON } from "./jargon";

export type TranslationResult = {
  original: string;
  translation: string;
  score: number;
  mode: string;
  buzzwords: string[];
};

export function translateCorporateBullshit(text: string): TranslationResult {
  const lowerText = text.toLowerCase();

  const buzzwords = CORPORATE_JARGON.filter(word =>
    lowerText.includes(word.toLowerCase())
  );

  const score = Math.min(100, Math.max(10, buzzwords.length * 18 + 15));

  return {
    original: text,
    translation: getMockTranslation(text, buzzwords),
    score,
    mode: "Cynical",
    buzzwords,
  };
}

function getMockTranslation(text: string, buzzwords: string[]) {
  if (buzzwords.length === 0) {
    return "This is surprisingly readable. Legal has been notified.";
  }

  if (
    buzzwords.includes("alignment") ||
    buzzwords.includes("stakeholder") ||
    buzzwords.includes("stakeholders")
  ) {
    return "Nobody agrees yet, so this is going to become a meeting.";
  }

  if (
    buzzwords.includes("optimize") ||
    buzzwords.includes("optimization") ||
    buzzwords.includes("efficiency") ||
    buzzwords.includes("streamline")
  ) {
    return "Someone wants this done faster, probably with fewer people.";
  }

  if (
    buzzwords.includes("strategic") ||
    buzzwords.includes("initiative") ||
    buzzwords.includes("transformation")
  ) {
    return "Leadership wants this to sound important before they know what it means.";
  }

  return "This probably means more work, less clarity, and a follow-up meeting.";
}