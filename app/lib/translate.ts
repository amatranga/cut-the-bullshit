import {
  CORPORATE_JARGON,
  CORPORATE_JARGON_WEIGHTS,
} from "./jargon";
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

  const score = calculateBullshitScore(buzzwords);

  return {
    original: text,
    translation: getMockTranslation(text, mode),
    score,
    mode,
    buzzwords,
  };
}

function getMockTranslation(
  text: string,
  mode: TranslationMode
) {
  const translations = TRANSLATIONS_BY_MODE[mode];
  const index = getDeterministicIndex(text, translations.length);

  return translations[index];
}

function getDeterministicIndex(text: string, length: number) {
  const hash = text
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return hash % length;
}

function calculateBullshitScore(buzzwords: string[]) {
  const baseScore = 10;

  const weightedScore = buzzwords.reduce((total, word) => {
    const weight =
      CORPORATE_JARGON_WEIGHTS[
        word as keyof typeof CORPORATE_JARGON_WEIGHTS
      ] ?? 0;

    return total + weight;
  }, baseScore);

  return Math.min(100, Math.max(10, weightedScore));
}

const TRANSLATIONS_BY_MODE: Record<TranslationMode, string[]> = {
  direct: [
    "Nobody agrees on ownership yet.",
    "The decision is unresolved.",
    "This needs clearer requirements.",
    "The team does not have an actionable plan yet.",
  ],
  cynical: [
    "Nobody agrees yet, so this is going to become a meeting.",
    "This probably means more work for the people not in the room.",
    "Leadership wants this to sound intentional before anyone knows what it means.",
    "Someone is trying to avoid saying the quiet part out loud.",
  ],
  executive: [
    "Cross-functional alignment remains unresolved across stakeholder groups.",
    "Decision ownership requires further clarification before execution can proceed.",
    "The organization should establish clearer accountability and success criteria.",
    "Strategic direction exists, but operational details remain underdefined.",
  ],
  "slack-goblin": [
    "bro this meeting could've been a slack message 💀",
    "they really said a lot of words and zero decisions",
    "bestie, nobody knows who owns this",
    "corporate said ✨vibes-based planning✨",
  ],
};