import { GoogleGenAI, Type } from "@google/genai";

// The FAQ generation has been moved to static content on the homepage
// to allow for multi-language support via the translation context.
// This file is kept for potential future Gemini API integrations.

// Assume process.env.API_KEY is available
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface ValidationResult {
    faceDetected: boolean;
    cardDetected: boolean;
    isGoodQuality: boolean;
    feedback: string;
}

/**
 * Analyzes a selfie-with-ID image using the Gemini API.
 * @param {string} base64Image - The base64-encoded JPEG image string.
 * @returns {Promise<ValidationResult>} A promise that resolves with the validation result.
 */
export const validateSelfieWithId = async (base64Image: string): Promise<ValidationResult> => {
    try {
        const imagePart = {
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
            },
        };
        
        const textPart = {
            text: `Analyze this image for an ID verification process. Check for these criteria:
            1. A single, clear, forward-facing human face is visible inside the designated area.
            2. The face is well-lit and not obscured by shadows, hair, or hands.
            3. A rectangular card, resembling an ID, is held steadily below the chin area.
            4. The card is mostly in view and not significantly cropped.
            
            Based on this, determine if the image is of good quality for verification.
            Provide specific, user-friendly feedback if the quality is poor.
            Respond ONLY with a JSON object matching this schema.`
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        faceDetected: { type: Type.BOOLEAN, description: "Is a human face clearly detected?" },
                        cardDetected: { type: Type.BOOLEAN, description: "Is a card-like object detected?" },
                        isGoodQuality: { type: Type.BOOLEAN, description: "Is the overall image quality sufficient for verification based on the criteria?" },
                        feedback: { type: Type.STRING, description: "Provide brief, helpful feedback for the user to improve their photo if isGoodQuality is false (e.g., 'Please ensure your face is fully in the oval.' or 'Hold your ID card steadier.'). If good quality, say 'Photo looks great!'." }
                    }
                }
            }
        });
        
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        return result;

    } catch (error) {
        console.error("Gemini API validation error:", error);
        // Return a default error state if the API fails
        return {
            faceDetected: false,
            cardDetected: false,
            isGoodQuality: false,
            feedback: "Sorry, we couldn't analyze the photo. Please try again."
        };
    }
};
