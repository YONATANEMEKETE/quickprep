import { NextResponse } from 'next/server';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

async function toNodeIncomingMessage(
  request: Request
): Promise<IncomingMessage> {
  const body = await request.arrayBuffer();
  const readable = new Readable();

  readable.push(Buffer.from(body));
  readable.push(null); // Signals the end of the stream

  const headers: Record<string, string | string[]> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // Mimic Node.js IncomingMessage
  const req = readable as unknown as IncomingMessage;
  req.headers = headers;
  req.method = request.method ?? 'GET';
  req.url = request.url;

  return req;
}

export async function POST(request: Request): Promise<Response> {
  const form = formidable({
    keepExtensions: true, // Retain file extensions
    multiples: false, // Only allow one file at a time
  });

  const req = await toNodeIncomingMessage(request);

  return new Promise<Response>((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        resolve(
          NextResponse.json({ error: 'File upload error' }, { status: 500 })
        );
        return;
      }
      const uploadedFile = files.file?.[0] as File; // Ensure correct type for file
      const fileName =
        uploadedFile?.originalFilename
          ?.toLowerCase()
          .trim()
          .replace(/[^a-zA-Z0-9.]/g, '')
          .replace(/^-+|-+$/g, '') || 'uploaded-file';

      const isProd = process.env.NODE_ENV === 'production';
      const tempDir = isProd ? '/tmp' : path.join(process.cwd(), 'tmp');

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      const tempPath = path.join(tempDir, fileName);

      try {
        fs.renameSync(uploadedFile.filepath, tempPath);

        // generate note
        console.log('file Proccessing Start now!');
        const result = await generateText({
          model: google('gemini-1.5-flash'),
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `You are an expert academic assistant trained to extract and summarize complex information with clarity, precision, and an advanced understanding of the subject matter. Your task is to read a PDF document and produce well-organized, concise, and insightful notes. Follow these guidelines: Understand the Core Concepts: Identify the main ideas, key arguments, theories, or methods presented in the document. Highlight any underlying principles or frameworks. Structure the Notes Logically: Begin with an overview summarizing the document's purpose, context, and main objectives. Divide the content into clear sections with headings that reflect the structure of the material (e.g., 'Introduction,' 'Key Findings,' 'Applications,' 'Conclusion'). Use bullet points, subheadings, or numbered lists for clarity and organization. Prioritize Key Details: Focus on concepts that are essential for understanding the subject matter. Include supporting evidence, examples, or case studies only if they enhance understanding. Keep It Engaging: Use simple, concise language while preserving the technical accuracy of the subject. Ensure the notes are actionable, helping a student to quickly grasp and retain the material. Include References: If the document cites any important references or authors, include these in the notes. Focus on creating notes that could serve as a study guide or review material for a high-performing student.
                  please use markdown format to make it look well organized.`,
                },
                {
                  type: 'file',
                  mimeType: 'application/pdf',
                  data: fs.readFileSync(tempPath),
                },
              ],
            },
          ],
        });

        resolve(
          NextResponse.json({
            message: 'File processed successfully',
            text: result.text,
          })
        );
      } catch (error) {
        console.error('Error processing file:', error);
        resolve(
          NextResponse.json(
            { error: 'File processing failed' },
            { status: 500 }
          )
        );
      } finally {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    });
  });
}
