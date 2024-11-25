import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

const apiKey = process.env.API_KEY as string;

export const genAi = new GoogleGenerativeAI(apiKey);
export const fileManager = new GoogleAIFileManager(apiKey);
export const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
