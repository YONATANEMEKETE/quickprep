import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import fs from 'fs';
import { NextRequest } from 'next/server';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const { prompt }: { prompt: string } = await request.json();

  const result = streamText({
    model: google('gemini-1.5-flash'),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'What is the file about?' },
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
