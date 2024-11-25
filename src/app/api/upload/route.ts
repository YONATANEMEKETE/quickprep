import { NextResponse } from 'next/server';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

// Helper to convert Fetch API Request to a Node.js-like IncomingMessage
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

  const uploadDir = path.join(process.cwd(), 'public/uploads');

  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Convert Fetch Request to a Node.js-like IncomingMessage
  const req = await toNodeIncomingMessage(request);

  return new Promise<Response>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        resolve(
          NextResponse.json({ error: 'File upload error' }, { status: 500 })
        );
        return;
      }

      const file = files.file?.[0] as File; // Ensure correct type for file
      const newFilePath = path.join(
        uploadDir,
        file.originalFilename || 'uploaded-file'
      );

      // Move file to target directory
      fs.rename(file.filepath, newFilePath, (err) => {
        if (err) {
          console.error(err);
          resolve(
            NextResponse.json({ error: 'File move error' }, { status: 500 })
          );
          return;
        }

        resolve(
          NextResponse.json({
            message: 'File uploaded successfully',
            filePath: `/uploads/${file.originalFilename}`,
          })
        );
      });
    });
  });
}
