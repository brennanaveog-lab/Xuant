
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { TopicEvaluationCard, Source } from "../types";

const MODEL_NAME = 'gemini-3-flash-preview';

export async function fetchComplianceTopics(days: number = 7, count: number = 6): Promise<TopicEvaluationCard[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Task: Act as a senior global data privacy and digital compliance legal expert.
    Identify the most important regulatory actions, enforcement updates, platform policy changes, or court developments related to data privacy, AI, and digital compliance from the LAST ${days} DAYS.
    
    CRITICAL CONSTRAINTS:
    1. EXCLUDE all news or developments within Mainland China. Focus strictly on Global/Overseas markets (EU/GDPR, USA/CCPA, SE Asia, Middle East, etc.).
    2. Identify EXACTLY ${count} high-value topics. Do not return more or fewer than ${count}.
    3. Generate "Topic Evaluation Cards" in Chinese, structured for a professional legal WeChat account.
    4. Each card must include: Editorial Title, Trigger Event, Target Audience, Impacted Industries, 3-5 Writing Angles, a concise "Blind Spot", 3-5 Action Items, Novelty Signal, and a Score (0-10) with explanation.
    5. Use the "Google Search" tool to find the most recent events from authoritative sources (regulators like EDPB, CNIL, ICO, FTC, PDPC, etc.).
    6. Ensure you separate sources into "Primary" (official) and "Secondary" (expert commentary).

    Return the data in a valid JSON array format. 
    Each object in the array should strictly match this TypeScript interface:
    {
      "title": string,
      "triggeringEvent": string,
      "targetAudience": string,
      "impactedIndustries": string,
      "writingAngles": string[],
      "blindSpot": string,
      "actionPackage": string[],
      "noveltySignal": string,
      "score": number,
      "scoreExplanation": string,
      "primarySources": { "uri": string, "title": string }[],
      "secondarySources": { "uri": string, "title": string }[]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    const jsonStr = response.text?.trim() || "[]";
    const rawResults = JSON.parse(jsonStr);

    // Ensure source formatting and structure
    return rawResults.map((item: any) => ({
      ...item,
      primarySources: item.primarySources || [],
      secondarySources: item.secondarySources || [],
    }));
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch or process compliance topics. Please try again.");
  }
}
