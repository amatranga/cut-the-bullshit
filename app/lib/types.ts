type TranslationMode = 
  | "direct"
  | "cynical"
  | "executive"
  | "slack-goblin";

type AnalysisDashboard = {
  ownershipClarity: "Low" | "Medium" | "High";
  decisionStatus: "Avoided" | "Pending" | "Clear";
  timelineRisk: "Low" | "Medium" | "High";
  meetingRisk: "Low" | "Medium" | "High";
}

type ActionItem = {
  task: string;
  owner: string | null;
  dueDate: string | null;
  status: "explicit" | "implied";
}

type AnalysisResult = {
  summary: string;
  actualMeaning: string[];
  risks: string[];
  likelyOutcome: string;
  dashboard: AnalysisDashboard;
  actionItems: ActionItem[];
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
