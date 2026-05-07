import { CORPORATE_JARGON } from "./jargon";
import { TranslationMode } from "./types";

export type TranslationResult = {
  original: string;
  translation: string;
  score: number;
  mode: TranslationMode;
  buzzwords: string[];
};

export function translateCorporateBullshit(text: string, mode: TranslationMode = 'cynical'): TranslationResult {
  const lowerText = text.toLowerCase();

  const buzzwords = CORPORATE_JARGON.filter(word =>
    lowerText.includes(word.toLowerCase())
  );

  const score = Math.min(100, Math.max(10, buzzwords.length * 18 + 15));

  return {
    original: text,
    translation: getMockTranslation(text, buzzwords, mode),
    score,
    mode,
    buzzwords,
  };
}

function getMockTranslation(text: string, buzzwords: string[], mode: TranslationMode) {
  switch (mode) {
    case "direct":
      return "Nobody agrees on ownership yet.";

    case "executive":
      return "Cross-functional alignment remains unresolved across stakeholder groups.";

    case "gen-z":
      return "bro this meeting could've been a slack message 💀";

    case "cynical":
    default:
      return "Nobody agrees yet, so this is going to become a meeting.";
  }
}