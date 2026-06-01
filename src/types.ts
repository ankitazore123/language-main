/**
 * AncientLingua AI - Global Type Definitions
 */

export enum HistoricalPeriod {
  ANCIENT = 'Ancient',
  CLASSICAL = 'Classical',
  MEDIEVAL = 'Medieval',
  OLD = 'Old',
  PROTO = 'Proto',
  RECONSTRUCTED = 'Reconstructed'
}

export interface LinguisticReference {
  sourceName: string;
  url?: string;
  snippet?: string;
  reliability: number; // 0 to 1
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  language: string;
  period: HistoricalPeriod;
  era: string; // e.g., "1000 BCE", "700 CE"
  grammarExplainer: string;
  pronunciation: {
    ipa: string;
    description: string;
  };
  evolutionPath: {
    era: string;
    form: string;
    changeDescription: string;
  }[];
  accuracyScore: number;
  references: LinguisticReference[];
}

export interface LanguageModelInfo {
  id: string;
  name: string;
  modernEquivalent: string;
  estimatedDateRange: string;
  family: string;
  description: string;
}

export interface Lesson {
  id: string;
  languageId: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Scholar';
  content: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}
