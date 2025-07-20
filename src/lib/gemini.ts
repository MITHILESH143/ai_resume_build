import { env } from "@/env";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
