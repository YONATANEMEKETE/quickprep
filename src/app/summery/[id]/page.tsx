import { getFile } from '@/lib/getFile';

export default async function Document({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cid = (await params).id;
  // const data = await getFile(cid);

  // generateDocument(data);

  return (
    <div className="min-h-[70vh] relative grid place-content-center">
      <p>{cid}</p>
      {/* <a href={data} target="_blank" download={data}>
        View | Download
      </a> */}
    </div>
  );
}
