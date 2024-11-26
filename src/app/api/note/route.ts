import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import fs from 'fs';
import { NextRequest } from 'next/server';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const { prompt }: { prompt: string } = await request.json();

  // const result = streamText({
  //   model: google('gemini-1.5-flash'),
  //   system:
  //     `you are a professional Teacher` +
  //     `your job is to create a short and concise note on the file.` +
  //     `you will only respond with the note and nothing else.`,
  //   messages: [
  //     {
  //       role: 'user',
  //       content: [
  //         { type: 'text', text: 'What is the file about?' },
  //         {
  //           type: 'file',
  //           mimeType: 'application/pdf',
  //           data: fs.readFileSync(`./public/uploads/${prompt}`),
  //         },
  //       ],
  //     },
  //   ],
  // });

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system:
      `you are a professional Teacher` +
      `your job is to create a short and concise note on the topic that is minimum of 200 words. like a clever student does for himself` +
      `you will only respond with the note and nothing else.` +
      `you response will be in a Markdown format.`,
    prompt: prompt,
  });

  return result.toDataStreamResponse();
}
