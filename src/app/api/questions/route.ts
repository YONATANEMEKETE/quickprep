import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import fs from 'fs';
import { NextRequest } from 'next/server';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const { prompt }: { prompt: string } = await request.json();

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: `Act as a teacher preparing an exam. Analyze the content of this PDF file and generate a set of exam-type questions based on the material. Ensure the questions cover the key topics, concepts, and details in a variety of formats, including: Multiple Choice Questions (MCQs)  Include four options with one correct answer. Short Answer Questions  Require concise responses. Essay Questions  Encourage critical thinking and in-depth explanations. True/False Questions  Include a brief explanation for the correct answer. Organize the questions by sections or chapters if applicable, and ensure they are clear, concise, and directly related to the material in the PDF. Provide the correct answers for each question at the end.`,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Act as a teacher preparing an exam. Analyze the content of this PDF file and generate a set of exam-type questions based on the material. Ensure the questions cover the key topics, concepts, and details in a variety of formats, including: Multiple Choice Questions (MCQs)  Include four options with one correct answer. Short Answer Questions  Require concise responses. Essay Questions  Encourage critical thinking and in-depth explanations. True/False Questions  Include a brief explanation for the correct answer. Organize the questions by sections or chapters if applicable, and ensure they are clear, concise, and directly related to the material in the PDF. Provide the correct answers for each question at the end.`,
          },
          {
            type: 'file',
            mimeType: 'application/pdf',
            data: fs.readFileSync(`./public/uploads/${prompt}`),
          },
        ],
      },
    ],
  });

  return result.toDataStreamResponse();
}
