import { fileManager, genAi } from './gemini';

export const generateDocument = async (document: string) => {
  const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const uploadResponse = await fileManager.uploadFile(`${document}`, {
    mimeType: 'application/pdf',
    displayName: 'Logic Design',
  });

  console.log(
    `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
  );
};
