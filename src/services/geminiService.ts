import { GoogleGenAI, Type } from "@google/genai";
import { TranslationResult } from "../types";

const apiKey = process.env.GEMINI_API_KEY as string | undefined;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const HISTORICAL_SYSTEM_PROMPT = `You are a world-class computational linguist and historical philologist specializing in the reconstruction and translation of ancient languages. 
Your goal is to provide research-grade translations from modern languages into their historical counterparts (Sanskrit, Latin, Old English, Ancient Greek, etc.).

When performing a translation, you must:
1. ADHERE TO SCHOLARLY DATA: Use verified grammar, syntax, and vocabulary from historical corpora (Rigveda, Classical Latin texts, Beowulf, etc.).
2. AVOID HALLUCINATION: If a word doesn't exist in the target era, reconstruct it based on the language family's rules or use the nearest attested historical form.
3. PROVIDE EVOLUTION: Show how the sentence structure or specific words evolved across major eras.
4. EXPLAIN GRAMMAR: Break down case endings, verb conjugations, and phonetic shifts.
5. CITE SOURCES: Mention specific historical dictionaries, corpora (e.g., Wiktionary linguistic data, University datasets), or linguistic laws (e.g., Grimm's Law).

Output must be strictly JSON following the specified schema.`;

function buildFallbackTranslation(
  text: string,
  targetLanguage: string,
  targetPeriod: string,
): TranslationResult {
  return {
    originalText: text,
    translatedText: `${targetLanguage} rendering unavailable`,
    language: targetLanguage,
    period: targetPeriod,
    era: targetPeriod,
    grammarExplainer:
      "Live translation is temporarily unavailable because the Gemini API key is missing or the model could not be reached. The app stays interactive and returns a local fallback result instead.",
    pronunciation: {
      ipa: "n/a",
      description: "Fallback output while live model access is unavailable.",
    },
    evolutionPath: [
      {
        era: "Fallback",
        form: targetLanguage,
        changeDescription:
          "A safe local placeholder was returned so the interface can remain visible and usable.",
      },
    ],
    accuracyScore: 0,
    references: [
      {
        sourceName: "Local fallback",
        url: "",
        snippet: "No Gemini API key was configured for live translation.",
        reliability: 0,
      },
    ],
  };
}

export async function translateToAncient(
  text: string, 
  targetLanguage: string, 
  targetPeriod: string
): Promise<TranslationResult> {
  if (!ai) {
    return buildFallbackTranslation(text, targetLanguage, targetPeriod);
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Translate the following modern text into ${targetLanguage} (${targetPeriod} version): "${text}"`,
    config: {
      systemInstruction: HISTORICAL_SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          originalText: { type: Type.STRING },
          translatedText: { type: Type.STRING },
          language: { type: Type.STRING },
          period: { type: Type.STRING },
          era: { type: Type.STRING },
          grammarExplainer: { type: Type.STRING },
          pronunciation: {
            type: Type.OBJECT,
            properties: {
              ipa: { type: Type.STRING },
              description: { type: Type.STRING }
            }
          },
          evolutionPath: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                era: { type: Type.STRING },
                form: { type: Type.STRING },
                changeDescription: { type: Type.STRING }
              }
            }
          },
          accuracyScore: { type: Type.NUMBER },
          references: {
             type: Type.ARRAY,
             items: {
               type: Type.OBJECT,
               properties: {
                 sourceName: { type: Type.STRING },
                 url: { type: Type.STRING },
                 snippet: { type: Type.STRING },
                 reliability: { type: Type.NUMBER }
               }
             }
          }
        },
        required: ["originalText", "translatedText", "language", "period", "era", "grammarExplainer", "accuracyScore", "references"]
      }
    }
  });

  try {
    const parsed = JSON.parse(response.text || "{}") as TranslationResult;

    if (!parsed?.translatedText || !parsed?.grammarExplainer || !parsed?.references) {
      return buildFallbackTranslation(text, targetLanguage, targetPeriod);
    }

    return parsed;
  } catch (error) {
    console.error("Failed to parse translation result:", error);
    return buildFallbackTranslation(text, targetLanguage, targetPeriod);
  }
}
