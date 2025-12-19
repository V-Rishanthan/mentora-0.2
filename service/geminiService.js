import { GoogleGenAI } from "@google/genai";

// 1. Initialize the client
const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
});

/**
 * Updated Service using the default @google/genai SDK
 */
export const getGeminiResponse = async (prompt, modelName = "gemini-3-flash-preview") => {
  try {
    // 2. The new SDK calls generateContent through the models object
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // 3. Return the text directly (the new SDK simplifies the response object)
    return response.text;
  } catch (error) {
    console.error(`Gemini Service Error (${modelName}):`, error);
    throw error;
  }
};