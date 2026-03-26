import {onCall, HttpsError} from "firebase-functions/v2/https";
import {GoogleGenAI} from "@google/genai";

export const askGemini = onCall(
  {
    secrets: ["GEMINI_API_KEY"],
  },
  async (request) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      throw new HttpsError("internal", "API key missing");
    }

    const {prompt} = request.data;

    if (!prompt || typeof prompt !== "string") {
      throw new HttpsError("invalid-argument", "Prompt is required");
    }

    if (prompt.length > 1000) {
      throw new HttpsError("invalid-argument", "Prompt too long");
    }

    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Дай развернутый, но понятный ответ (5-8 предложений).
              Объясни подробно, но без лишней воды: ${prompt}`,
              },
            ],
          },
        ],
        config: {
          maxOutputTokens: 2048,
          temperature: 0.7,
          thinkingConfig: {
            thinkingBudget: 128,
          },
        },
      });

      const text =
      response.candidates
        ?.flatMap((c) => c.content?.parts || [])
        ?.map((p) => p.text)
        ?.filter(Boolean)
        ?.join("")
        ?.trim() || "";

      if (!text) {
        throw new HttpsError("internal", "Empty response from AI");
      }

      const safeText = text.trim();

      return {
        answer: safeText,
      };
    } catch (err: unknown) {
      console.error(err);
      throw new HttpsError("internal", "AI request failed");
    }
  });
