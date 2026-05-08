export type TranslationMode =
  | "direct"
  | "cynical"
  | "executive"
  | "gen-z";

export type TranslationResult = {
  original: string;
  translation: string;
  score: number;
  mode: TranslationMode;
  buzzwords: string[];
};