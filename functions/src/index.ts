import {onCall, HttpsError} from "firebase-functions/v2/https";
import {GoogleGenAI} from "@google/genai";

export const askGemini = onCall(async (request) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    throw new HttpsError("internal", "API key missing");
  }

  const {prompt} = request.data;

  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return {
      answer: response.text,
    };
  } catch (err: any) {
    console.error(err);
    throw new HttpsError("internal", err.message);
  }
});
