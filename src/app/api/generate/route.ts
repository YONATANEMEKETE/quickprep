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

  const tempDir = '/temp';

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
      const file = files.file?.[0] as File; // Ensure correct type for file
      const fileName = file.originalFilename || 'untitled-file';
      const tempFilePath = file.filepath; // temp file path in the server
      console.log('file Uploaded to', tempFilePath);

      console.log('file Proccessing Start now!');
      const result = await generateText({
        model: google('gemini-1.5-flash'),
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'what is the file about?' },
              {
                type: 'file',
                mimeType: 'application/pdf',
                data: fs.readFileSync(tempFilePath),
              },
            ],
          },
        ],
      });
      console.log('file Proccessed', result.text);

      fs.unlinkSync(tempFilePath);
      console.log('file Cleaned Up');

      resolve(
        NextResponse.json({
          message: 'File uploaded and Processed successfully',
          text: result.text,
        })
      );
    });
  });
}
