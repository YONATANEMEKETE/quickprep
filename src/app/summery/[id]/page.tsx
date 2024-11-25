import { generateDocument } from '@/lib/documentProcess';
import { genAi } from '@/lib/gemini';
import { getFile } from '@/lib/getFile';

export default async function Document({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cid = (await params).id;
  const data = await getFile(cid);
  // await generateDocument(cid);

  return (
    <div className="min-h-[70vh] relative grid place-content-center">
      <p>{cid}</p>
      <a href={data} target="_blank" download>
        View | Download
      </a>
    </div>
  );
}
