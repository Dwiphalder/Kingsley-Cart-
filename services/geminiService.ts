import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

// Initialize the API client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateStylistResponse = async (
  history: ChatMessage[], 
  newMessage: string, 
  base64Image?: string
): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // System instruction to define the persona
    const systemInstruction = `You are "Kingsley", a high-end, sophisticated AI fashion stylist for the brand Kingsley Style. 
    Your tone is elegant, helpful, and knowledgeable about fashion trends, color theory, and fabrics.
    You help users choose outfits, understand dress codes, and match accessories.
    If the user shows an image, analyze it for style, fit, and occasion, and offer specific recommendations from a modern luxury perspective.
    Keep responses concise but polite.`;

    const model = 'gemini-2.5-flash';

    // Construct the message parts
    const parts: any[] = [];

    // If there is an image, add it first
    if (base64Image) {
      // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
      const base64Data = base64Image.split(',')[1] || base64Image;
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg', // Assuming jpeg/png for simplicity, ideally detect from header
          data: base64Data
        }
      });
    }

    // Add the text prompt
    parts.push({ text: newMessage });

    // We are using a stateless generateContent approach here for simplicity with images,
    // but context can be built by appending previous history to the prompt if needed.
    // For this demo, we'll just send the current interaction with a strong system instruction context.
    // To support full chat history with images, we'd need to format the history as Content objects.
    
    // Constructing a simplified history context string for text-only context if no image
    // (If handling full multi-turn chat with images, we would construct full Content objects)
    let contextPrompt = newMessage;
    if (history.length > 0) {
        const historyText = history.slice(-4).map(h => `${h.role === 'user' ? 'Client' : 'Kingsley'}: ${h.text}`).join('\n');
        contextPrompt = `Previous conversation:\n${historyText}\n\nCurrent Client Request: ${newMessage}`;
    }

    // Update parts with context if strict history is needed, but for visual tasks, the image + prompt is usually sufficient.
    const finalParts = base64Image ? parts : [{ text: contextPrompt }];

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: { parts: finalParts },
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I am currently unable to curate a response. Please try again.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am experiencing a momentary lapse in connection. Please try again shortly.";
  }
};
