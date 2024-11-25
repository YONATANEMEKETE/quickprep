import { fileManager, genAi } from './gemini';

export const generateDocument = async (document: string) => {
  const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const uploadResponse = await fileManager.uploadFile(
    'public/Integration.pdf',
    {
      mimeType: 'application/pdf',
      displayName: 'Integration.pdf',
    }
  );

  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    { text: 'Can you summarize this document as a bulleted list?' },
  ]);

  console.log(result.response.text());
};
