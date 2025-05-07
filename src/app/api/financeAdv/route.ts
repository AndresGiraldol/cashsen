import { NextResponse } from "next/server";
import { generateFinancialAdvicePromt } from "./financeAdvPromt";
import {GoogleGenAI} from '@google/genai';
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const extractJsonFromResponse = (str: string) => {
  const match = str.match(/```json\s*([\s\S]*?)\s*```/);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (e) {
      throw new Error("Error parsing JSON from Gemini: " + e);
    }
  } else {
    throw new Error("No se encontró un bloque JSON válido: ");
  }
  return null;
};

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: 3, // máximo 5 peticiones
  duration: 3600, // en 60 minutos por IP
});

export async function POST(request: Request) {
  try {

    const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

    await rateLimiter.consume(ip); 
    const data = await request.json();
    

    const prompt = generateFinancialAdvicePromt(data);
    const modelResponse = await genAI.models.generateContent(
      {
         model: "gemini-2.0-flash", 
         contents: prompt,
      }
    );

    if (!modelResponse || !modelResponse.text) {
      return NextResponse.json(
        { error: "No response from the model" },
        { status: 500 }
      );
    }

    const text = extractJsonFromResponse(modelResponse.text);

     console.log({
      input: data,
      modelResponse: modelResponse.text,
      notes: "Generación de plan financiero (vía Gemini)",
    })
    return NextResponse.json(text);
  } catch (error) {
    if (error instanceof RateLimiterRes) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
        { status: 429 }
      );
    }
    console.error("Error generating financial advice:", error);
    return NextResponse.json(
      { error: "Error generating financial advice" },
      { status: 500 }
    );
  }
}
