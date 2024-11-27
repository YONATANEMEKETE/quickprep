import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import fs from 'fs';
import { NextRequest } from 'next/server';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const { prompt }: { prompt: string } = await request.json();

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: `You are an expert academic assistant trained to extract and summarize complex information with clarity, precision, and an advanced understanding of the subject matter. Your task is to read a PDF document and produce well-organized, concise, and insightful notes. Follow these guidelines: Understand the Core Concepts: Identify the main ideas, key arguments, theories, or methods presented in the document. Highlight any underlying principles or frameworks. Structure the Notes Logically: Begin with an overview summarizing the document's purpose, context, and main objectives. Divide the content into clear sections with headings that reflect the structure of the material (e.g., 'Introduction,' 'Key Findings,' 'Applications,' 'Conclusion'). Use bullet points, subheadings, or numbered lists for clarity and organization. Prioritize Key Details: Focus on concepts that are essential for understanding the subject matter. Include supporting evidence, examples, or case studies only if they enhance understanding. Keep It Engaging: Use simple, concise language while preserving the technical accuracy of the subject. Ensure the notes are actionable, helping a student to quickly grasp and retain the material. Include References: If the document cites any important references or authors, include these in the notes. Focus on creating notes that could serve as a study guide or review material for a high-performing student.`,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `You are an expert academic assistant trained to extract and summarize complex information with clarity, precision, and an advanced understanding of the subject matter. Your task is to read a PDF document and produce well-organized, concise, and insightful notes. Follow these guidelines: Understand the Core Concepts: Identify the main ideas, key arguments, theories, or methods presented in the document. Highlight any underlying principles or frameworks. Structure the Notes Logically: Begin with an overview summarizing the document's purpose, context, and main objectives. Divide the content into clear sections with headings that reflect the structure of the material (e.g., 'Introduction,' 'Key Findings,' 'Applications,' 'Conclusion'). Use bullet points, subheadings, or numbered lists for clarity and organization. Prioritize Key Details: Focus on concepts that are essential for understanding the subject matter. Include supporting evidence, examples, or case studies only if they enhance understanding. Keep It Engaging: Use simple, concise language while preserving the technical accuracy of the subject. Ensure the notes are actionable, helping a student to quickly grasp and retain the material. Include References: If the document cites any important references or authors, include these in the notes. Focus on creating notes that could serve as a study guide or review material for a high-performing student.`,
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
