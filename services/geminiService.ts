import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Removes text overlays from an image using Gemini.
 */
export const removeTextFromImage = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: "Remove all text overlays, logos, and watermarks from this image. Keep the Ethiopian food, coffee items, and background exactly as they are. Preserve the colors and details. Return only the cleaned image.",
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image returned from Gemini.");
  } catch (error) {
    console.error("Error cleaning image:", error);
    throw error;
  }
};

/**
 * Generates a new Ethiopian food and coffee background using Gemini.
 */
export const generateEthiopianFoodImage = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: "A rich, vibrant, high-resolution photograph of a traditional Ethiopian cultural dining setting. In the center, a large colorful Beyaynetu platter (Injera with Doro Wat, lentils, greens). Crucially, include a traditional Ethiopian Coffee Ceremony setup on the side: a black clay Jebena (coffee pot), small Cini cups, and popcorn scattered on the grass/mats. Warm, golden hour lighting, steam rising from the coffee, rustic wooden or woven background. No text.",
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};