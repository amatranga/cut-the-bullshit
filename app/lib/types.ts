export type TranslationMode =
  | "direct"
  | "cynical"
  | "executive"
  | "slack-goblin";

export type TranslationResult = {
  original: string;
  translation: string;
  score: number;
  mode: TranslationMode;
  buzzwords: string[];
  fallbackUsed?: boolean;
};

export type AppMode = "decode" | "rewrite"