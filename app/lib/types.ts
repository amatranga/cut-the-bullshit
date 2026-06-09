type TranslationMode =
  | "direct"
  | "cynical"
  | "executive"
  | "slack-goblin";

type TranslationResult = {
  original: string;
  translation: string;
  score: number;
  mode: TranslationMode;
  buzzwords: string[];
  fallbackUsed?: boolean;
};

type AppMode = "decode" | "rewrite"

type TranslationHistoryItem = TranslationResult & {
  id: string;
  appMode: AppMode;
  createdAt: number;
};

export type {
  TranslationMode,
  TranslationResult,
  AppMode,
  TranslationHistoryItem,
};
