import { getFile } from '@/lib/getFile';

export default async function Document({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cid = (await params).id;
  const data = await getFile(cid);

  console.log(data);

  return (
    <div>
      <p>{cid}</p>
      <a href={data}>View</a>
    </div>
  );
}
