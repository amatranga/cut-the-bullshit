type TranslationMode = 
  | "direct"
  | "cynical"
  | "executive"
  | "slack-goblin";

type AnalysisResult = {
  summary: string;
  actualMeaning: string[];
  risks: string[];
  likelyOutcome: string;
}

type TranslationResult = {
  original: string;
  translation?: string;
  score?: number;
  mode?: TranslationMode;
  buzzwords?: string[];
  fallbackUsed?: boolean;
  analysis?: AnalysisResult;
};

const APP_MODES = ["decode", "rewrite", "analyze"] as const;

type AppMode = (typeof APP_MODES)[number];

type TranslationHistoryItem = TranslationResult & {
  id: string;
  appMode: AppMode;
  createdAt: number;
};

type ButtonText = {
  loading: string;
  default: string;
}

type PlaceholderTextRecord = {
  superHeader?: string;
  header?: string;
  subheader?: string;
  example?: string;
  button?: ButtonText;
}

export type {
  TranslationMode,
  TranslationResult,
  AppMode,
  TranslationHistoryItem,
  AnalysisResult,
  PlaceholderTextRecord,
};

export { APP_MODES };
