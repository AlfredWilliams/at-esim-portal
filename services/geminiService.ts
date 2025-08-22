
import { GoogleGenAI, Type } from "@google/genai";
import { FaqItem } from '../types';

const faqSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: {
                type: Type.STRING,
                description: "The frequently asked question."
            },
            answer: {
                type: Type.STRING,
                description: "The answer to the question."
            },
        },
        required: ["question", "answer"]
    }
};

const MOCK_FAQS: FaqItem[] = [
    { question: "What is an eSIM?", answer: "An eSIM is a digital SIM that allows you to activate a cellular plan from your carrier without having to use a physical nano-SIM." },
    { question: "How do I activate my eSIM?", answer: "Activation is simple. After payment, you will receive a QR code. Scan it with your phone's camera in the cellular settings to install the eSIM profile." },
    { question: "Is my device compatible?", answer: "Most new smartphones from Apple, Samsung, and Google support eSIM. Use our compatibility checker on the homepage to verify your specific model." },
    { question: "Can I use my physical SIM and an eSIM at the same time?", answer: "Yes, if your phone supports Dual SIM with an eSIM, you can use both a physical SIM and an eSIM simultaneously, for example, one for personal and one for business." },
];

export const generateFaqs = async (): Promise<FaqItem[]> => {
    if (!process.env.API_KEY) {
        console.warn("API_KEY environment variable not set. The app will use mock data for FAQs.");
        return MOCK_FAQS;
    }
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate 5 frequently asked questions and their answers for a new eSIM service by a telecom company. The tone should be helpful and easy to understand for non-technical users.",
            config: {
                responseMimeType: "application/json",
                responseSchema: faqSchema,
            },
        });
        
        const text = response.text.trim();
        const faqs: FaqItem[] = JSON.parse(text);
        return faqs;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        console.error("Error generating FAQs with Gemini API:", error);

        if (errorMessage.includes("PERMISSION_DENIED") || errorMessage.includes("API key not valid")) {
            console.warn(
                "Gemini API permission denied. This could be due to an invalid or missing API key, or billing may not be enabled for the associated project. Please check your environment variables and Google Cloud project settings."
            );
        } else if (errorMessage.includes("xhr error")) {
            console.warn(
                "Gemini API request failed due to a network error. This is common for client-side requests and can be caused by: \n1. Incorrect API key restrictions (ensure your key allows the website's HTTP referrer). \n2. A misconfigured Google Cloud project (e.g., billing not enabled). \n3. Network connectivity issues. \nThe app will fall back to mock data."
            );
        }


        // Fallback to mock data on error, indicating a failure to the user.
        const fallbackFaqs = [...MOCK_FAQS];
        fallbackFaqs[0] = { 
            ...fallbackFaqs[0], 
            answer: `${fallbackFaqs[0].answer} (Note: Could not fetch live data from the server.)`
        };
        return fallbackFaqs;
    }
};