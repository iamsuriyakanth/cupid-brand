import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInput, DatingProfileResult } from "../types";

// Define the response schema for structured JSON output
const datingProfileSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    brandIdentity: {
      type: Type.OBJECT,
      properties: {
        archetype: { type: Type.STRING, description: "e.g., The Intellectual Adventurer" },
        tagline: { type: Type.STRING, description: "A catchy 3-5 word slogan for their profile" },
        emotionalVibe: { type: Type.STRING, description: "The feeling users get when seeing the profile" },
        writingStyle: { type: Type.STRING, description: "Guidance on how to write future messages" },
        colorPaletteSuggestions: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Colors to wear or look for in backgrounds"
        }
      },
      required: ["archetype", "tagline", "emotionalVibe", "writingStyle", "colorPaletteSuggestions"]
    },
    bios: {
      type: Type.OBJECT,
      properties: {
        short: { type: Type.STRING, description: "One-liner" },
        medium: { type: Type.STRING, description: "2-3 sentences" },
        long: { type: Type.STRING, description: "Full bio with personality" },
        tinder: { type: Type.STRING, description: "Tinder specific version" },
        bumble: { type: Type.STRING, description: "Bumble specific version" },
        hinge: { type: Type.STRING, description: "Hinge specific version" },
        okcupid: { type: Type.STRING, description: "OKCupid specific version" }
      },
      required: ["short", "medium", "long", "tinder", "bumble", "hinge", "okcupid"]
    },
    photoAdvice: {
      type: Type.OBJECT,
      properties: {
        analysis: { type: Type.STRING, description: "General critique of uploaded photos" },
        keep: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Descriptions of photos to keep" },
        discard: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Descriptions of photos to remove" },
        newIdeas: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific ideas for new photos (poses, lighting)" }
      },
      required: ["analysis", "keep", "discard", "newIdeas"]
    },
    optimization: {
      type: Type.OBJECT,
      properties: {
        prompts: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "answer"]
          }
        },
        openers: { type: Type.ARRAY, items: { type: Type.STRING } },
        donts: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["prompts", "openers", "donts"]
    }
  },
  required: ["brandIdentity", "bios", "photoAdvice", "optimization"]
};

export const generateDatingProfile = async (userInput: UserInput): Promise<DatingProfileResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey });

  // Prepare prompt
  const promptText = `
    You are a world-class "AI Romantic Brand Builder".
    Your goal is to create a consistent, attractive, authentic dating profile brand.
    
    User Context:
    Name: ${userInput.name}
    Age: ${userInput.age}
    Gender: ${userInput.gender}
    Profession: ${userInput.profession}
    Hobbies/Interests: ${userInput.hobbies}
    Desired Vibe: ${userInput.vibe}
    Target Partner: ${userInput.targetPartner}
    Tone Preference: ${userInput.tone}

    Task:
    1. Rewrite the bio in multiple versions tailored to the tone.
    2. Create a brand identity (archetype, colors, style).
    3. Analyze the provided images (if any) and give specific direction on what to keep, delete, and shoot new.
    4. Optimize the profile with prompts and openers.
    
    Be specific, witty, and incredibly helpful. The output must be strictly JSON matching the schema.
  `;

  const parts: any[] = [{ text: promptText }];

  // Add images if they exist
  userInput.images.forEach((base64Data) => {
    // Strip prefix if present (e.g., data:image/jpeg;base64,)
    const cleanBase64 = base64Data.split(',')[1] || base64Data;
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg', // Assuming jpeg for simplicity, or detect from header
        data: cleanBase64
      }
    });
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: datingProfileSchema,
        temperature: 0.7, // A bit of creativity
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DatingProfileResult;
    } else {
      throw new Error("Empty response from AI");
    }
  } catch (error) {
    console.error("Error generating profile:", error);
    throw error;
  }
};
