'use server';
import fs from 'fs';
import path from 'path';

export const deleteLocal = async (prompt: string) => {
  const uploadedDir = path.join(process.cwd(), 'public/uploads');

  const filePath = path.join(uploadedDir, prompt);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting the file:', err.message);
    } else {
      console.log('File successfully deleted');
    }
  });
};
